import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google.cloud import aiplatform, speech, texttospeech
from google.cloud import aiplatform    # still fine
from google.cloud.speech_v1 import SpeechClient
from google.cloud.texttospeech_v1 import TextToSpeechClient
import io
from PyPDF2 import PdfReader
# import uuid, base64
# from werkzeug.utils import secure_filename
# import google.generativeai as genai
import json

from google import genai
from google.genai import types 

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
speech_client = SpeechClient.from_service_account_file(KEY_PATH)
tts_client    = TextToSpeechClient.from_service_account_file(KEY_PATH)

ALLOWED_TEXT_DOCS = {"txt", "pdf","wav","mp3"}

def extract_text_from_files(files):
    """
    `files` is the list you already got from request.files.getlist("files").
    Returns one big string with the contents of every .txt/.pdf concatenated.
    """
    text_chunks = []

    for f in files:
        # f is a Werkzeug FileStorage object
        filename = f.filename or ""
        suffix   = filename.rsplit(".", 1)[-1].lower()


        if suffix not in ALLOWED_TEXT_DOCS:
            continue   # skip non‑pdf/txt

        if suffix == "txt":
            # read the raw bytes, decode to str (assume UTF‑8 or fall back)
            raw = f.read()               # <─ grabs the in‑memory bytes
            f.seek(0)                    # reset pointer in case you re‑use it
            text_chunks.append(raw.decode("utf-8", errors="ignore"))

        if suffix == "pdf":
            # PyPDF2 can take the file‑object directly
            reader = PdfReader(f)
            pages_text = [
                page.extract_text() or "" for page in reader.pages
            ]
            text_chunks.append("\n".join(pages_text))
            f.seek(0)                    # same reason as above
        if suffix == "wav":
            audio_bytes = f.read()
            # print("this is myfile", myfile)
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[
                    "Transcribe this audio clip exactly",
                    types.Part.from_bytes(data=audio_bytes, mime_type="audio/wav"),
                        ],
                    )
            
        if suffix == "mp3":
            audio_bytes = f.read()
            # print("this is myfile", myfile)
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[
                    "Transcribe this audio clip exactly",
                    types.Part.from_bytes(data=audio_bytes, mime_type="audio/mp3"),
                        ],
                    )

            text_chunks.append(response.text.strip())
        
        if suffix == "mp4":

            print(response.text)

            

    return "\n".join(text_chunks)


def get_system_prompt(agent_id: str) -> str:

    with open("models.json", "r", encoding="utf‑8") as f:
        data = json.load(f)
    
    agent_id = agent_id.strip('"')
    id = int(agent_id)
    return data['agents'][id]['systemPrompt']



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



# @app.route("/chat", methods=["POST"])
# def 


@app.route("/chat", methods=["POST"])
def chat():
    # multipart/form-data: text + optional files
    if not request.content_type.startswith("multipart/form-data"):
        return jsonify(error="Unsupported content type"), 415

    agent = request.form.get("agentId", "").strip()
    text  = request.form.get("message", "").strip()
    files = request.files.getlist("files")

    system = get_system_prompt(agent)
    prompt = f"{system}. Your job is to reply to the users message to the best of your ability, staying true to your character. Here are any relevant text files to their prompt: {extract_text_from_files(files)}\nUser:{text}\nBot:"

    print("\n\n\n\n\\n FINAL PROMPT", prompt)

    #handle audio case
    #handle video case

    # Fallback text-only in multipart
    resp = client.models.generate_content(model="gemini-2.0-flash", contents=[prompt])
    return jsonify(reply=resp.text.strip())

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)
