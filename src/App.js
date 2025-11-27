import React, { useState } from "react";
import "./App.css";
import logo from "../src/giphy.gif";
import FinalScore from "./FinalScore.jsx";

const questions = [
  { text: "What sound does a cat make?", answers: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"], correct: 1 },
  { text: "Which number is even?", answers: ["3", "5", "8"], correct: 2 },
  { text: "Capital of France?", answers: ["Berlin", "Paris", "London"], correct: 1 },
  { text: "Capital of France?", answers: ["Berlin", "Paris", "London"], correct: 1 },
];

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = questions[currentQ];

  function selectAnswer(index) { setSelected(index); }

  function next() {
    if (selected === currentQuestion.correct) setScore(prev => prev + 1);
    setSelected(null);
    if (currentQ + 1 < questions.length) setCurrentQ(prev => prev + 1);
    else setShowScore(true);
  }

  function prev() {
    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1);
      setSelected(null);
    }
  }

  function restart() {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowScore(false);
  }

  const percentScore = Math.round((score / questions.length) * 100);

  return (
    <div className="background">
      {!showScore ? (
        <div className="middle-layer">
          <div className="quiz-card">

            {currentQ === 0 && (
              <>
                <div className="paw-box">Best of Luck!</div>
                <img src={logo} alt="Paw" className="paw-img" />
              </>
            )}

            <h1 className="title">Test Your <span>Knowledge</span></h1>
            <p className="subtitle">Answer all questions to see your results</p>

            <div className="header-line">
              <div className="progress-container">
                {questions.map((_, idx) => (
                  <div key={idx} className={`progress-segment ${idx === currentQ ? "active" : ""}`} />
                ))}
              </div>
            </div>

            <div className="question-box">
              <span className="q-number">{currentQ + 1}.</span> {currentQuestion.text}
            </div>

            <div className="answers-list">
              {currentQuestion.answers.map((ans, i) => (
                <div
                  key={i}
                  className={`answer ${selected === i ? "selected" : ""}`}
                  onClick={() => selectAnswer(i)}
                >
                  {ans}
                </div>
              ))}
            </div>

            <div className="nav-container">
              <button className="nav-btn" disabled={currentQ === 0} onClick={prev}>←</button>
              <button className="nav-btn" disabled={selected === null} onClick={next}>
                {currentQ === questions.length - 1 ? "✓" : "→"}
              </button>
            </div>

          </div>
        </div>
      ) : (
        <FinalScore score={percentScore} onRestart={restart} />
      )}
    </div>
  );
}