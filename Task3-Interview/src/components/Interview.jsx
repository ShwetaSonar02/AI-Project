import React, { useState } from "react";
import questions from "../data/questions";
import { levels } from "../utils/difficulty";
import "./Interview.css";

function Interview() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[levels[0]][0]
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [asked, setAsked] = useState({
  easy: [questions[levels[0]][0].id],  // ✅ add first question
  medium: [],
  hard: []
});
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isFinished, setIsFinished] = useState(false);

const [questionCount, setQuestionCount] = useState(1);
const MAX_QUESTIONS = 5;

  // ✅ Check Answer (simple logic for now)
  const checkAnswer = () => {
  const correctAnswer = currentQuestion.answer.toLowerCase();
  const user = userAnswer.toLowerCase();

  let match = 0;
  const words = correctAnswer.split(" ");

  words.forEach((word) => {
    if (user.includes(word)) {
      match++;
    }
  });

  const score = match / words.length;

  return score >= 0.5; // 50% match = correct
};

  // ✅ Update Difficulty
const updateDifficulty = (isCorrect) => {
  if (isCorrect) {
    setScore((prev) => prev + 1);
  }
};

  // ✅ Get Next Question
  const getNextQuestion = (levelIndex) => {
  const level = levels[levelIndex];

  // get already asked for this level
  const askedForLevel = asked[level];

  // filter unasked questions
  const availableQuestions = questions[level].filter(
    (q) => !askedForLevel.includes(q.id)
  );
 if (availableQuestions.length === 0) {
    alert("All questions completed for this level!");

    // reset only this level
    setAsked((prev) => ({
      ...prev,
      [level]: []
    }));

    return questions[level][0]; // fallback question
  }

  // pick random
  const next =
    availableQuestions[
      Math.floor(Math.random() * availableQuestions.length)
    ];

  // save asked
  setAsked((prev) => ({
    ...prev,
    [level]: [...prev[level], next.id]
  }));

  return next;
};

  // ✅ On Submit
  const handleSubmit = () => {
  const isCorrect = checkAnswer();

  // ✅ show feedback
  setFeedback(isCorrect ? "✅ Correct" : "❌ Wrong");

  // ✅ update score FIRST
  updateDifficulty(isCorrect);

  // 🟢 If LAST question → finish AFTER scoring
  if (questionCount === MAX_QUESTIONS) {
    setIsFinished(true);
    return;
  }

  // 🟢 STEP A: Structured progression
  let newLevelIndex = levelIndex;

  if (questionCount === 1) newLevelIndex = 0;
  else if (questionCount === 2) newLevelIndex = isCorrect ? 1 : 0;
  else if (questionCount === 3) newLevelIndex = 1;
  else if (questionCount === 4) newLevelIndex = isCorrect ? 2 : 1;
  else if (questionCount >= 5) newLevelIndex = 2;

  // 🟢 STEP B: Adaptive logic
  if (!isCorrect) {
    newLevelIndex = Math.max(newLevelIndex - 1, 0);
  }

  // 🟢 STEP C: Avoid staying too long in easy
  if (questionCount >= 3 && newLevelIndex === 0) {
    newLevelIndex = 1;
  }

  // ✅ Apply difficulty
  setLevelIndex(newLevelIndex);

  // ✅ Next question
  const nextQ = getNextQuestion(newLevelIndex);

  setCurrentQuestion(nextQ);
  setUserAnswer("");

  // ✅ increment count
  setQuestionCount((prev) => prev + 1);
};
 if (isFinished) {
    return (
      <div className="container">
        <div className="card">
          <h2>🎉 Interview Completed</h2>
          <h3>Your Score: {score} / {MAX_QUESTIONS}</h3>

          <button
            className="button"
            onClick={() => window.location.reload()}
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

 return (
  <div className="container">
    <div className="card">

      {/* Header */}
      <div className="header">
        <h2>AI Interview</h2>
        <span className="badge">{levels[levelIndex].toUpperCase()}</span>
      </div>

      {/* Progress */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${((questionCount - 1) / MAX_QUESTIONS) * 100}%` }}
        ></div>
      </div>

      {/* Stats */}
      <div className="stats">
        <p>Score: <b>{score}</b></p>
        <p>{questionCount} / {MAX_QUESTIONS}</p>
      </div>

      {/* Question */}
      <div className="question-box">
        <p>{currentQuestion.question}</p>
      </div>

      {/* Feedback */}
      {feedback && (
        <p className={`feedback ${feedback.includes("Correct") ? "correct" : "wrong"}`}>
          {feedback}
        </p>
      )}

      {/* Input */}
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer..."
        className="input"
      />

      {/* Button */}
      <button onClick={handleSubmit} className="button">
        Submit Answer
      </button>

    </div>
  </div>
);
}

export default Interview;