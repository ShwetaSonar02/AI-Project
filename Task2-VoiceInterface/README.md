# 🎤 Voice Interface System Integration

## 📌 Project Overview

This project implements a voice-based interview system where users can answer questions using speech. The system converts spoken audio into text using a Speech-to-Text (STT) module and processes it in real time.

---

## 🎯 Objective

* Integrate Speech-to-Text functionality with frontend
* Capture voice input from user
* Convert speech into text using backend
* Display and process answers in interview pipeline

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* MediaRecorder API (for audio capture)

### Backend:

* Python (Flask)
* SpeechRecognition Library
* Pydub + FFmpeg (for audio conversion)

---

## ⚙️ System Workflow

1. User selects interview domain
2. System plays question audio
3. User speaks answer via microphone
4. Audio is recorded in browser (WebM format)
5. Audio is sent to Flask backend
6. Backend converts audio (WebM → WAV)
7. SpeechRecognition converts audio to text
8. Text is sent back to frontend
9. Answer is displayed on UI

---

## 🚀 Features

* 🎤 Real-time voice recording
* 🔊 Audio-based questions
* 🧠 Speech-to-text conversion
* 📊 Interview progress tracking
* 🔁 Automatic question flow

---
## 📁 Project Structure
The project is divided into two main modules: Frontend (React) and Backend (Flask STT API).
```
AI-Project/
│
├── Task1-Frontend/                # React Frontend
│   ├── node_modules/              # Dependencies
│   ├── public/                   # Static files
│   │   ├── audio/                # Question audio files
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/                      # Main source code
│   │   ├── App.js                # Main component
│   │   ├── DomainSelect.js       # Domain selection UI
│   │   ├── index.js              # Entry point
│   │   └── App.css               # Styling
│   │
│   ├── package.json              # Project config
│   └── README.md
│
├── Task2-VoiceInterface/         # Backend (Speech-to-Text)
│   ├── backend/
│   │   ├── stt_server.py         # Flask server (STT API)
│   │   └── requirements.txt      # Python dependencies
│   │
│   ├── venv/                     # Virtual environment
│   └── README.md
│
└── README.md                     # Main project documentation
```

## ▶️ How to Run

### Backend:

```bash
cd Task2-VoiceInterface
venv\Scripts\activate
python backend/stt_server.py
```

### Frontend:

```bash
cd Task1-Frontend
npm install
npm start
```

---

## 🌐 URLs

* Frontend: http://localhost:3000
* Backend: http://127.0.0.1:5000

---

## ⚠️ Notes

* Ensure microphone permissions are enabled
* FFmpeg must be installed for audio conversion
* Internet connection required for Google Speech API

---

## 👩‍💻 Author

Shweta Sonar

---
