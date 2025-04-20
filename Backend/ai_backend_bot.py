import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google.cloud import aiplatform, speech, texttospeech
from google.cloud import aiplatform    # still fine
from google.cloud.speech_v1 import SpeechClient
from google.cloud.texttospeech_v1 import TextToSpeechClient
# import uuid, base64
# from werkzeug.utils import secure_filename
# import google.generativeai as genai
import json

from google import genai

import io

# Load environment variables
# dotenv_path = os.getenv('DOTENV_PATH', None)
# if dotenv_path:
#     load_dotenv(dotenv_path)
# else:
#     load_dotenv()

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set in environment")

client = genai.Client(api_key=GEMINI_API_KEY)


# Initialize Flask and CORS
app = Flask(__name__)
CORS(app)

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = 'speechtotext-434102-68275541f3c5copy.json'

KEY_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "hackathon/Backend/speechtotext-434102-68275541f3c5copy.json")


# Initialize Google Cloud clients
print("KEYPATH", KEY_PATH)
speech_client = SpeechClient.from_service_account_file(KEY_PATH)
tts_client    = TextToSpeechClient.from_service_account_file(KEY_PATH)
aiplatform.init(
    project=os.getenv("PROJECT_ID"),
    location=os.getenv("LOCATION")
)
# Load Gemini (Vertex AI Text Generation) model
client = genai.Client(api_key=GEMINI_API_KEY)
#gemini_model = genai.GenerativeModel("gemini-pro")
# Helper: transcribe audio file (IN-MEMORY)
def transcribe_audio(audio_file):
    """
    Accepts a Flask FileStorage (audio file) and returns a transcript string.
    """
    content = audio_file.read()
    audio_cfg = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=48000,
        language_code="en-US",
    )
    response = speech_client.recognize(request={"config": config, "audio": audio_cfg})
    transcript = " ".join(r.alternatives[0].transcript for r in response.results)
    return transcript

def get_system_prompt(agent_id):
    with open("models.json", "r") as f:
        models_data = json.load(f)
    for agent in models_data.get("agents", []):
        if agent.get("id") == agent_id:
            return agent.get("systemPropmt", "").strip()
    return None

@app.route("/chat", methods=["POST"])
def chat():
    """
    Handles both text and audio inputs.

    For JSON payload:
      {
        "message": "<user message>",
        "agentId": "<agent id>"
      }

    For multipart/form-data (voice):
      - form field "audio": file blob
      - form field "agentId": text (agent id)
    """
    # Determine if audio or text
    if request.content_type.startswith('multipart/form-data') and 'audio' in request.files:
        # Voice path: transcribe first
        agent_id_str = request.form.get('agentId', '').strip()
        if not agent_id_str:
            return jsonify({"error": "Missing 'agentId' in form"}), 400
        try:
            agent_id = int(agent_id_str)
        except ValueError:
            return jsonify({"error": "Invalid 'agentId' value"}), 400

        system_prompt = get_system_prompt(agent_id)
        if not system_prompt:
            return jsonify({"error": f"No system prompt found for agent id {agent_id}"}), 400

        audio_file = request.files['audio']
        transcript = transcribe_audio(audio_file)
        user_message = transcript.strip()
    else:
        # Text path: expect JSON
        data = request.get_json() or {}
        agent_id = data.get('agentId')
        if agent_id is None:
            return jsonify({"error": "Missing 'agentId' in JSON payload"}), 400
        try:
            agent_id = int(agent_id)
        except ValueError:
            return jsonify({"error": "Invalid 'agentId' value"}), 400

        system_prompt = get_system_prompt(agent_id)
        if not system_prompt:
            return jsonify({"error": f"No system prompt found for agent id {agent_id}"}), 400
        user_message  = data.get('message', '').strip()

    # Validate
    if not user_message:
        return jsonify({"error": "Missing 'message' or valid audio input"}), 400

    # Build Gemini prompt
    prompt = f"{system_prompt}User: {user_message}\nBot:"

    # Call the text generation model

    response = (client.models.generate_content(model="gemini-2.0-flash",contents=[prompt]))

    # gen_resp = gemini_model.generate_content(prompt)
    # reply = response.text.strip()


    return jsonify({"reply": response.text})

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)
