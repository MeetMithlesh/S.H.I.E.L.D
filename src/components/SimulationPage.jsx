import React, { useState, useEffect } from 'react';
import '../css/SimulationPage.css';

const SimulationPage = ({ levelData, onComplete, onBack }) => {
  const [simulationStep, setSimulationStep] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [isSimulationComplete, setIsSimulationComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [currentScenario, setCurrentScenario] = useState('preparation');

  const scenarios = {
    earthquake: {
      title: "🏠 Earthquake Simulation",
      steps: [
        {
          id: 1,
          scenario: "preparation",
          title: "Preparation Phase",
          description: "You're at home when you feel the ground starting to shake slightly. What do you do first?",
          choices: [
            { text: "Drop, Cover, and Hold On", points: 10, correct: true },
            { text: "Run outside immediately", points: 0, correct: false },
            { text: "Stand in a doorway", points: 5, correct: false },
            { text: "Turn off the gas", points: 0, correct: false }
          ]
        },
        {
          id: 2,
          scenario: "during",
          title: "During the Earthquake",
          description: "The shaking is getting stronger! You're under a sturdy table. What's your next move?",
          choices: [
            { text: "Stay under the table and hold on", points: 10, correct: true },
            { text: "Try to move to another room", points: 0, correct: false },
            { text: "Look around for falling objects", points: 5, correct: false },
            { text: "Call for help", points: 0, correct: false }
          ]
        },
        {
          id: 3,
          scenario: "after",
          title: "After the Earthquake",
          description: "The shaking has stopped. What should you do first?",
          choices: [
            { text: "Check for injuries and hazards", points: 10, correct: true },
            { text: "Immediately leave the building", points: 5, correct: false },
            { text: "Turn on the TV for news", points: 0, correct: false },
            { text: "Call everyone you know", points: 0, correct: false }
          ]
        }
      ]
    },
    fire: {
      title: "🔥 Fire Drill Simulation",
      steps: [
        {
          id: 1,
          scenario: "detection",
          title: "Fire Detected",
          description: "You smell smoke and hear the fire alarm. What's your first action?",
          choices: [
            { text: "Alert others and call 911", points: 10, correct: true },
            { text: "Look for the source of smoke", points: 0, correct: false },
            { text: "Get your belongings first", points: 0, correct: false },
            { text: "Open windows for ventilation", points: 0, correct: false }
          ]
        },
        {
          id: 2,
          scenario: "evacuation",
          title: "Evacuation Route",
          description: "You need to evacuate. The main exit has smoke. What do you do?",
          choices: [
            { text: "Use the alternative exit route", points: 10, correct: true },
            { text: "Try to go through the smoke", points: 0, correct: false },
            { text: "Wait for help in your room", points: 0, correct: false },
            { text: "Break a window", points: 5, correct: false }
          ]
        },
        {
          id: 3,
          scenario: "safety",
          title: "Safe Assembly",
          description: "You've reached the assembly point. What's next?",
          choices: [
            { text: "Stay at assembly point and account for everyone", points: 10, correct: true },
            { text: "Go back to help others", points: 0, correct: false },
            { text: "Leave the area", points: 0, correct: false },
            { text: "Take photos for social media", points: 0, correct: false }
          ]
        }
      ]
    }
  };

  const currentScenarioData = scenarios[levelData.scenario] || scenarios.earthquake;

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !isSimulationComplete) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isSimulationComplete]);

  const handleChoice = (choice) => {
    const newChoices = [...userChoices, choice];
    setUserChoices(newChoices);
    
    if (choice.correct) {
      setScore(score + choice.points);
    }

    if (simulationStep < currentScenarioData.steps.length - 1) {
      setTimeout(() => {
        setSimulationStep(simulationStep + 1);
      }, 1500);
    } else {
      setTimeout(() => {
        setIsSimulationComplete(true);
      }, 1500);
    }
  };

  const getScoreMessage = () => {
    const maxScore = currentScenarioData.steps.reduce((total, step) => 
      total + Math.max(...step.choices.map(choice => choice.points)), 0);
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 90) return { emoji: "🏆", message: "Perfect! You're a disaster response expert!" };
    if (percentage >= 70) return { emoji: "⭐", message: "Excellent! You handled that really well!" };
    if (percentage >= 50) return { emoji: "👍", message: "Good job! You're learning great safety skills!" };
    return { emoji: "💪", message: "Keep practicing! Every expert was once a beginner!" };
  };

  const getStepIcon = (scenario) => {
    const icons = {
      preparation: "🛡️",
      during: "⚡",
      after: "✅",
      detection: "🚨",
      evacuation: "🚪",
      safety: "✅"
    };
    return icons[scenario] || "📋";
  };

  return (
    <div className="simulation-page">
      {/* Header */}
      <div className="simulation-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Path
        </button>
        <div className="simulation-title">
          <h1>{currentScenarioData.title}</h1>
        </div>
        <div className="simulation-stats">
          <div className="timer-display">
            🕐 {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </div>
          <div className="score-display">
            ⭐ {score}
          </div>
        </div>
      </div>

      {!isSimulationComplete ? (
        <div className="simulation-content">
          {/* Progress Indicator */}
          <div className="progress-indicator">
            {currentScenarioData.steps.map((step, index) => (
              <div 
                key={step.id}
                className={`progress-dot ${index <= simulationStep ? 'completed' : ''} ${index === simulationStep ? 'current' : ''}`}
              >
                <span className="step-icon">{getStepIcon(step.scenario)}</span>
                <span className="step-label">{step.title}</span>
              </div>
            ))}
          </div>

          {/* Scenario Display */}
          <div className="scenario-section">
            <div className="scenario-card">
              <div className="scenario-visual">
                <div className="scenario-animation">
                  {getStepIcon(currentScenarioData.steps[simulationStep].scenario)}
                </div>
              </div>
              
              <div className="scenario-content">
                <h2>{currentScenarioData.steps[simulationStep].title}</h2>
                <p className="scenario-description">
                  {currentScenarioData.steps[simulationStep].description}
                </p>
              </div>
            </div>

            {/* Choices */}
            <div className="choices-section">
              <h3>What would you do?</h3>
              <div className="choices-grid">
                {currentScenarioData.steps[simulationStep].choices.map((choice, index) => (
                  <button
                    key={index}
                    className="choice-btn"
                    onClick={() => handleChoice(choice)}
                  >
                    <span className="choice-number">{index + 1}</span>
                    <span className="choice-text">{choice.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Tips */}
          <div className="tips-section">
            <div className="tip-card">
              <span className="tip-emoji">💡</span>
              <p><strong>Remember:</strong> In real emergencies, stay calm and think before you act!</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="simulation-results">
          <div className="results-celebration">
            <div className="celebration-animation">
              {getScoreMessage().emoji}
            </div>
            <h2>Simulation Complete!</h2>
            <p className="results-message">{getScoreMessage().message}</p>
            
            <div className="results-stats">
              <div className="stat-card">
                <div className="stat-number">{score}</div>
                <div className="stat-label">Total Points</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{userChoices.filter(choice => choice.correct).length}</div>
                <div className="stat-label">Correct Choices</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{Math.round((timeRemaining / 60) * 100)}%</div>
                <div className="stat-label">Time Remaining</div>
              </div>
            </div>

            <div className="results-review">
              <h3>Your Performance:</h3>
              {currentScenarioData.steps.map((step, index) => (
                <div key={step.id} className="review-item">
                  <span className="review-icon">{getStepIcon(step.scenario)}</span>
                  <div className="review-content">
                    <strong>{step.title}</strong>
                    <span className={`review-result ${userChoices[index]?.correct ? 'correct' : 'incorrect'}`}>
                      {userChoices[index]?.correct ? '✅ Correct' : '❌ Could improve'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="complete-btn" onClick={onComplete}>
              Continue Your Journey! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Floating Helper */}
      <div className="floating-helper">
        <div className="helper-bubble">
          🦸‍♀️ {simulationStep === 0 && "Let's practice what you'd do in a real emergency!"}
          {simulationStep > 0 && simulationStep < currentScenarioData.steps.length - 1 && "Great choice! What's next?"}
          {isSimulationComplete && "Amazing work! You're ready for real emergencies!"}
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;
