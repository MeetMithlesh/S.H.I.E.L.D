import React, { useState, useEffect } from 'react';
import '../css/QuizPage.css';

const QuizPage = ({ levelData, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Timer for each question
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(-1); // Time's up
    }
  }, [timeLeft, isAnswered, quizCompleted]);

  const handleAnswer = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === levelData.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < levelData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimeLeft(30);
      } else {
        setQuizCompleted(true);
        setShowResult(true);
      }
    }, 2000);
  };

  const getScoreMessage = () => {
    const percentage = (score / levelData.questions.length) * 100;
    if (percentage >= 80) return { emoji: "🏆", message: "Outstanding! You're a safety superstar!" };
    if (percentage >= 60) return { emoji: "🌟", message: "Great job! You're learning well!" };
    if (percentage >= 40) return { emoji: "📚", message: "Good effort! Keep studying!" };
    return { emoji: "💪", message: "Keep practicing! You'll get there!" };
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="quiz-page">
      {/* Header */}
      <div className="quiz-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Path
        </button>
        <div className="quiz-title">
          <span className="quiz-icon">{levelData.icon}</span>
          <h1>{levelData.title}</h1>
        </div>
        <div className="quiz-stats">
          <div className="question-counter">
            {currentQuestion + 1} / {levelData.questions.length}
          </div>
          <div className="score-display">
            ⭐ {score}
          </div>
        </div>
      </div>

      {!showResult ? (
        <div className="quiz-content">
          {/* Timer */}
          <div className="timer-section">
            <div className="timer-circle">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={timeLeft > 10 ? "#4ECDC4" : "#FF6B6B"}
                  strokeWidth="6"
                  strokeDasharray={`${(timeLeft / 30) * 283} 283`}
                  transform="rotate(-90 50 50)"
                  className="timer-progress"
                />
                <text x="50" y="55" textAnchor="middle" className="timer-text">
                  {timeLeft}
                </text>
              </svg>
            </div>
            <p className="timer-label">Time Left</p>
          </div>

          {/* Question */}
          <div className="question-section">
            <div className="question-card">
              <div className="question-header">
                <span className="question-emoji">🤔</span>
                <h2>Question {currentQuestion + 1}</h2>
              </div>
              <h3 className="question-text">
                {levelData.questions[currentQuestion].question}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="options-grid">
              {levelData.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${
                    selectedAnswer === index ? 'selected' : ''
                  } ${
                    isAnswered && index === levelData.questions[currentQuestion].correct 
                      ? 'correct' 
                      : ''
                  } ${
                    isAnswered && selectedAnswer === index && index !== levelData.questions[currentQuestion].correct 
                      ? 'incorrect' 
                      : ''
                  }`}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                  {isAnswered && index === levelData.questions[currentQuestion].correct && (
                    <span className="correct-icon">✅</span>
                  )}
                  {isAnswered && selectedAnswer === index && index !== levelData.questions[currentQuestion].correct && (
                    <span className="incorrect-icon">❌</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / levelData.questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="results-section">
          <div className="results-card">
            <div className="results-animation">
              {getScoreMessage().emoji}
            </div>
            <h2>Quiz Complete!</h2>
            <div className="score-display-large">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {levelData.questions.length}</span>
            </div>
            <p className="score-message">{getScoreMessage().message}</p>
            
            <div className="results-breakdown">
              <div className="stat-card">
                <div className="stat-number">{Math.round((score / levelData.questions.length) * 100)}%</div>
                <div className="stat-label">Accuracy</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{score}</div>
                <div className="stat-label">Correct</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{levelData.questions.length - score}</div>
                <div className="stat-label">Missed</div>
              </div>
            </div>

            <button className="complete-btn" onClick={handleComplete}>
              Continue Adventure! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Floating Encouragement */}
      <div className="floating-encouragement">
        {!isAnswered && !showResult && (
          <div className="encouragement-bubble">
            🦸‍♀️ Think carefully! You've got this!
          </div>
        )}
        {isAnswered && !showResult && selectedAnswer === levelData.questions[currentQuestion].correct && (
          <div className="encouragement-bubble success">
            🎉 Correct! You're amazing!
          </div>
        )}
        {isAnswered && !showResult && selectedAnswer !== levelData.questions[currentQuestion].correct && (
          <div className="encouragement-bubble">
            💪 Good try! Keep learning!
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
