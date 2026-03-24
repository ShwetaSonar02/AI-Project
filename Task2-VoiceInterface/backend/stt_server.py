from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
from pydub import AudioSegment
import tempfile
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Speech-to-Text Server Running"

@app.route("/speech-to-text", methods=["POST"])
def speech_to_text():
    try:
        print("🔥 API HIT")

        if 'audio' not in request.files:
            return jsonify({"error": "No audio file received"})

        audio_file = request.files['audio']
        print("File received:", audio_file.filename)

        # Save WEBM file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_webm:
            audio_file.save(temp_webm.name)
            webm_path = temp_webm.name

        # Convert WEBM → WAV
        wav_path = webm_path.replace(".webm", ".wav")
        sound = AudioSegment.from_file(webm_path, format="webm")
        sound.export(wav_path, format="wav")

        recognizer = sr.Recognizer()
        recognizer.energy_threshold = 300
        recognizer.dynamic_energy_threshold = True

        with sr.AudioFile(wav_path) as source:
            audio = recognizer.record(source)

        # ✅ Improved handling
        try:
            text = recognizer.recognize_google(audio)

            if not text.strip():
                text = "No speech detected. Please speak clearly."

            print("✅ Recognized Text:", text)

        except sr.UnknownValueError:
            text = "No speech detected. Please speak clearly."
            print("⚠️ No speech detected")

        except sr.RequestError:
            text = "Speech service unavailable"
            print("⚠️ API unavailable")

        except Exception as e:
            print("❌ ERROR:", str(e))
            text = "Error processing audio"

        # Cleanup
        os.remove(webm_path)
        os.remove(wav_path)

        return jsonify({"text": text})

    except Exception as e:
        print("❌ SERVER ERROR:", str(e))
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)