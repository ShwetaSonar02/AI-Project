# 🎤 Voice Interface System Integration

## 📌 Project Overview

This project implements an **AI-based voice interview system** where users answer questions using speech. The system captures audio from the browser, converts it into text using a Speech-to-Text (STT) engine, and displays the response in real time.

It simulates a **real interview environment** with automated question flow and voice-based interaction.

---

## 🎯 Objective

* Integrate **Speech-to-Text (STT)** with frontend
* Capture and process **user voice input**
* Convert speech into text using backend APIs
* Build a **real-time interview pipeline**

---

## 🛠️ Tech Stack

### 💻 Frontend

* React.js
* MediaRecorder API (Audio Capture)

### ⚙️ Backend

* Python (Flask)
* SpeechRecognition Library
* Pydub
* FFmpeg

---

## ⚙️ System Workflow

1. User selects interview domain
2. System plays question audio
3. User records answer via microphone
4. Audio is captured in **WebM format**
5. Audio is sent to Flask backend
6. Backend converts **WebM → WAV**
7. SpeechRecognition processes audio
8. Text is returned to frontend
9. Answer is displayed on UI

---

## 🚀 Features

* 🎤 Real-time voice recording
* 🔊 Pre-recorded interview questions
* 🧠 Speech-to-text conversion
* 📊 Progress tracking system
* 🔁 Automated question flow
* ⚠️ Error handling (silence, low audio, API issues)

---

## 📁 Project Structure

```
AI-Project/
│
├── Task1-Frontend/                # React Frontend
│   ├── node_modules/
│   ├── public/
│   │   ├── audio/                # Question audio files
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── App.js                # Main logic (recording + flow)
│   │   ├── DomainSelect.js       # Domain selection UI
│   │   ├── index.js
│   │   └── App.css
│   │
│   ├── package.json
│   └── README.md
│
├── Task2-VoiceInterface/         # Backend (Speech-to-Text)
│   ├── backend/
│   │   ├── stt_server.py         # Flask API
│   │   └── requirements.txt
│   │
│   ├── venv/                     # Virtual Environment (ignored in Git)
│   └── README.md
│
└── README.md                     # Main Documentation
```

---

## ▶️ How to Run

### 🔹 Backend Setup

```bash
cd Task2-VoiceInterface
venv\Scripts\activate
pip install -r backend/requirements.txt
python backend/stt_server.py
```

---

### 🔹 Frontend Setup

```bash
cd Task1-Frontend
npm install
npm start
```

---

## 🌐 Application URLs

* Frontend → http://localhost:3000
* Backend → http://127.0.0.1:5000

---

## ⚠️ Important Notes

* 🎙️ Allow microphone permissions in browser
* ⚙️ Install FFmpeg for audio conversion
* 🌐 Internet required for Google Speech API
* 🚫 Do NOT upload `venv/` or `node_modules/` to GitHub

---

## 🧠 Key Learnings

* Integration of frontend and backend systems
* Handling real-time audio processing
* Error handling in speech recognition
* Working with browser APIs (MediaRecorder)
* Building an interactive user experience

---

## 👩‍💻 Author

**Shweta Sonar**
MCA Student | Full Stack Java Developer

---

## ⭐ Future Improvements

* Add AI-based answer evaluation
* Store responses in database
* Add authentication system
* Improve UI/UX with animations
* Support multiple languages

---
