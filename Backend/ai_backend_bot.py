import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google.cloud import aiplatform, speech, texttospeech
import uuid, base64
from werkzeug.utils import secure_filename
import io

# Load environment variables
dotenv_path = os.getenv('DOTENV_PATH', None)
if dotenv_path:
    load_dotenv(dotenv_path)
else:
    load_dotenv()

# Initialize Flask and CORS
app = Flask(__name__)
CORS(app, origins=os.getenv("FRONTEND_ORIGIN"))

# Initialize Google Cloud clients
speech_client = speech.SpeechClient()
tts_client    = texttospeech.TextToSpeechClient()
aiplatform.init(
    project=os.getenv("PROJECT_ID"),
    location=os.getenv("LOCATION")
)
# Load Gemini (Vertex AI Text Generation) model
model = aiplatform.TextGenerationModel.from_pretrained("text-bison@001")

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

@app.route("/chat", methods=["POST"])
def chat():
    """
    Handles both text and audio inputs.

    For JSON payload:
      {
        "message": "<user message>",
        "systemPrompt": "<system instruction>"
      }

    For multipart/form-data (voice):
      - form field "audio": file blob
      - form field "systemPrompt": text
    """
    # Determine if audio or text
    if request.content_type.startswith('multipart/form-data') and 'audio' in request.files:
        # Voice path: transcribe first
        system_prompt = request.form.get('systemPrompt', '').strip()
        audio_file = request.files['audio']
        if not system_prompt:
            return jsonify({"error": "Missing 'systemPrompt' in form"}), 400
        transcript = transcribe_audio(audio_file)
        user_message = transcript.strip()
    else:
        # Text path: expect JSON
        data = request.get_json() or {}
        system_prompt = data.get('systemPrompt', '').strip()
        user_message  = data.get('message', '').strip()

    # Validate
    if not system_prompt:
        return jsonify({"error": "Missing 'systemPrompt' parameter"}), 400
    if not user_message:
        return jsonify({"error": "Missing 'message' or valid audio input"}), 400

    # Build Gemini prompt
    prompt = f"{system_prompt}User: {user_message}\nBot:"

    # Call the text generation model
    response = model.predict(
        prompt,
        temperature=0.2,
        max_output_tokens=512,
    )
    reply = response.text.strip()

    return jsonify({"reply": reply})

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
