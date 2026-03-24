import React, { useRef, useState } from "react";
import "./App.css";
import DomainSelect from "./DomainSelect";

function App() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [statusText, setStatusText] = useState("System Ready");
  const [isRecording, setIsRecording] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [transcript, setTranscript] = useState(""); // ✅ NEW

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  /* --------------------------------------------------
   🎯 CREATE QUESTIONS
  -------------------------------------------------- */
  const generateQuestions = (prefix) => {
    const arr = [];
    for (let i = 1; i <= 40; i++) {
      arr.push(`/audio/${prefix}${i}.mp3`);
    }
    return arr;
  };

  const domainQuestions = {
    fullstack: generateQuestions("Development"),
    python: generateQuestions("Python"),
    datascience: generateQuestions("DataScience"),
    ml: generateQuestions("ML"),
    digital: generateQuestions("Marketing"),
    deeplearning: generateQuestions("DeepLearning"),
    corejava: generateQuestions("CoreJava"),
    analytics: generateQuestions("DataAnalytics"),
    cyber: generateQuestions("CyberSecurity"),
    aiml: generateQuestions("AI"),
  };

  /* --------------------------------------------------
   🔀 RANDOM 10 QUESTIONS
  -------------------------------------------------- */
  const getRandomQuestions = (questions, count = 10) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const handleDomainSelect = (domain) => {
    const selectedSet = getRandomQuestions(domainQuestions[domain], 10);

    setSelectedDomain(domain);
    setShuffledQuestions(selectedSet);
    setQuestionIndex(0);
    setStatusText("Interview Started");
  };

  const totalQuestions = shuffledQuestions.length;

  const progressPercent =
    totalQuestions > 0
      ? Math.min((questionIndex / totalQuestions) * 100, 100)
      : 0;

  /* --------------------------------------------------
     ▶ PLAY QUESTION
  -------------------------------------------------- */
  const playQuestion = () => {
    if (questionIndex >= totalQuestions) {
      setStatusText("🎉 Interview Completed");
      return;
    }

    const audio = new Audio(shuffledQuestions[questionIndex]);

    setStatusText(`Playing Question ${questionIndex + 1}`);
    audio.play();

    audio.onended = () => {
      startRecording();
    };
  };

  /* --------------------------------------------------
     🎤 START RECORDING
  -------------------------------------------------- */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = handleAnswerSubmit;

      mediaRecorder.start();
      setIsRecording(true);
      setStatusText("Recording Answer...");
    } catch (err) {
      setStatusText("Microphone Access Denied");
    }
  };

  /* --------------------------------------------------
     ⏹ STOP RECORDING
  -------------------------------------------------- */
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStatusText("Processing Answer...");
    }
  };

  /* --------------------------------------------------
     📡 SEND AUDIO TO BACKEND (IMPORTANT 🔥)
  -------------------------------------------------- */
  const handleAnswerSubmit = async () => {
  const blob = new Blob(chunksRef.current, { type: "audio/webm" });

  // ✅ Prevent empty/silent recording
  if (blob.size < 2000) {
    setTranscript("⚠️ Please speak something!");
    return;
  }

  const formData = new FormData();
  formData.append("audio", blob, "answer.webm");

  console.log("🔥 Sending audio to backend...");

  try {
    const res = await fetch("http://127.0.0.1:5000/speech-to-text", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.text) {
      console.log("User said:", data.text);
      setTranscript(data.text); // ✅ SHOW TEXT
    } else {
      setTranscript("⚠️ No response from server");
    }
  } catch (error) {
    console.error(error);
    setTranscript("❌ Error converting speech");
  }

  // Next question
  if (questionIndex + 1 < totalQuestions) {
    setQuestionIndex((prev) => prev + 1);
    setStatusText("Answer Saved. Next Question Ready.");
  } else {
    setQuestionIndex(totalQuestions);
    setStatusText("🎉 Interview Completed Successfully!");
  }
};
  /* --------------------------------------------------
     UI
  -------------------------------------------------- */
  return (
    <div className="app-container">
      <h1 className="app-title">AI Interview Voice Interface</h1>

      {!selectedDomain ? (
        <DomainSelect onDomainSelect={handleDomainSelect} />
      ) : (
        <>
          <h2 className="status-text">{statusText}</h2>

          <h3>
            {questionIndex < totalQuestions
              ? `Question ${questionIndex + 1} of ${totalQuestions}`
              : "Interview Completed"}
          </h3>

          <p>
            Completed: {Math.min(questionIndex, totalQuestions)} | Remaining:{" "}
            {Math.max(totalQuestions - questionIndex, 0)}
          </p>

          {/* ✅ SHOW TRANSCRIPT */}
          <div style={{ margin: "10px", fontWeight: "bold" }}>
            🧠 Your Answer : {transcript}
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="button-group">
            <button className="btn play-btn" onClick={playQuestion}>
              ▶ Play Question
            </button>

            <button
              className="btn stop-btn"
              onClick={stopRecording}
              disabled={!isRecording}
            >
              ⏹ Stop Recording
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;