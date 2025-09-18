import React, { useState, useEffect } from 'react';
import '../css/LearningPath.css';
import ModulePage from './ModulePage';
import QuizPage from './QuizPage';
import SimulationPage from './SimulationPage';
import ChallengePage from './ChallengePage';
import CommunityPage from './CommunityPage';
import CertificatePage from './CertificatePage';

const LearningPath = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [userStars, setUserStars] = useState(0);
  const [activeComponent, setActiveComponent] = useState(null);
  const [isMainPath, setIsMainPath] = useState(true);

  // Path data with YouTube video URLs and quiz data
  const pathData = [
    { 
      id: 1, 
      type: 'module', 
      title: 'What is a Disaster?', 
      icon: '📚', 
      description: 'Learn about different types of disasters',
      videoUrl: 'https://www.youtube.com/embed/BLEPakj1YTY',
      content: 'Understanding natural and man-made disasters'
    },
    { 
      id: 2, 
      type: 'quiz', 
      title: 'Safety Quiz', 
      icon: '🧠', 
      description: 'Test your disaster knowledge',
      questions: [
        {
          question: "What should you do first during an earthquake?",
          options: ["Run outside", "Drop, Cover, Hold", "Stand in doorway", "Call 911"],
          correct: 1
        },
        {
          question: "How many days of emergency supplies should you have?",
          options: ["1 day", "3 days", "1 week", "1 month"],
          correct: 1
        }
      ]
    },
    { 
      id: 3, 
      type: 'module', 
      title: 'Earthquake Safety', 
      icon: '🏠', 
      description: 'How to stay safe during earthquakes',
      videoUrl: 'https://www.youtube.com/embed/BLEPakj1YTY',
      content: 'Earthquake preparedness and response techniques'
    },
    { 
      id: 4, 
      type: 'simulation', 
      title: 'Virtual Earthquake Drill', 
      icon: '🚨', 
      description: 'Practice earthquake response',
      scenario: 'earthquake'
    },
    { 
      id: 5, 
      type: 'quiz', 
      title: 'Emergency Quiz', 
      icon: '⚡', 
      description: 'Quick emergency response test',
      questions: [
        {
          question: "What's the emergency number in most countries?",
          options: ["911", "999", "112", "All of the above"],
          correct: 3
        }
      ]
    },
    { 
      id: 6, 
      type: 'module', 
      title: 'Flood Safety', 
      icon: '🌊', 
      description: 'Learn flood preparedness',
      videoUrl: 'https://www.youtube.com/embed/BLEPakj1YTY',
      content: 'Flood safety and evacuation procedures'
    },
    { 
      id: 7, 
      type: 'simulation', 
      title: 'Fire Drill Practice', 
      icon: '🔥', 
      description: 'Virtual fire safety drill',
      scenario: 'fire'
    },
    { 
      id: 8, 
      type: 'challenge', 
      title: 'Hero Challenge', 
      icon: '🏆', 
      description: 'Become a safety hero!',
      challengeType: 'emergency_kit'
    },
    { 
      id: 9, 
      type: 'community', 
      title: 'Help Friends', 
      icon: '👥', 
      description: 'Share safety knowledge'
    },
    { 
      id: 10, 
      type: 'certificate', 
      title: 'Safety Champion', 
      icon: '🎖️', 
      description: 'Earn your certificate!'
    }
  ];

  // Calculate node positions for zigzag pattern
  const getNodePosition = (index) => {
    const isEven = index % 2 === 0;
    const verticalSpacing = 180;
    const top = 100 + (index * verticalSpacing);
    const left = isEven ? '25%' : '75%';
    
    return { top: `${top}px`, left };
  };

  // Handle level completion
  const handleLevelClick = (levelId) => {
    if (unlockedLevels.includes(levelId)) {
      const levelData = pathData.find(level => level.id === levelId);
      setCurrentLevel(levelId);
      setActiveComponent(levelData.type);
      setIsMainPath(false);
    }
  };

  // Handle returning to main path
  const returnToPath = () => {
    setIsMainPath(true);
    setActiveComponent(null);
  };

  // Handle level completion from components
  const handleLevelComplete = (levelId) => {
    if (!completedLevels.includes(levelId)) {
      setCompletedLevels([...completedLevels, levelId]);
      setUserStars(userStars + 1);
      
      // Unlock next level
      if (levelId < pathData.length && !unlockedLevels.includes(levelId + 1)) {
        setUnlockedLevels([...unlockedLevels, levelId + 1]);
      }
    }
    returnToPath();
  };

  // Get level type specific styling
  const getLevelTypeClass = (type) => {
    const typeClasses = {
      module: 'level-module',
      quiz: 'level-quiz',
      simulation: 'level-simulation',
      challenge: 'level-challenge',
      community: 'level-community',
      certificate: 'level-certificate'
    };
    return typeClasses[type] || 'level-default';
  };

  // Render specific component based on activeComponent
  const renderActiveComponent = () => {
    const currentLevelData = pathData.find(level => level.id === currentLevel);
    
    switch (activeComponent) {
      case 'module':
        return (
          <ModulePage
            levelData={currentLevelData}
            onComplete={() => handleLevelComplete(currentLevel)}
            onBack={returnToPath}
          />
        );
      case 'quiz':
        return (
          <QuizPage
            levelData={currentLevelData}
            onComplete={() => handleLevelComplete(currentLevel)}
            onBack={returnToPath}
          />
        );
      case 'simulation':
        return (
          <SimulationPage
            levelData={currentLevelData}
            onComplete={() => handleLevelComplete(currentLevel)}
            onBack={returnToPath}
          />
        );
      case 'challenge':
        return (
          <ChallengePage
            levelData={currentLevelData}
            onComplete={() => handleLevelComplete(currentLevel)}
            onBack={returnToPath}
          />
        );
      case 'community':
        return (
          <CommunityPage
            levelData={currentLevelData}
            onComplete={() => handleLevelComplete(currentLevel)}
            onBack={returnToPath}
          />
        );
      case 'certificate':
        return (
          <CertificatePage
            levelData={currentLevelData}
            onComplete={() => handleLevelComplete(currentLevel)}
            onBack={returnToPath}
            totalStars={userStars}
          />
        );
      default:
        return null;
    }
  };

  if (!isMainPath) {
    return renderActiveComponent();
  }

  return (
    <div className="learning-path-container">
      {/* Sticky Header */}
      <div className="path-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🌟 Safety Adventure Path</h1>
            <div className="fun-mascot">
              🦸‍♀️ <span>Let's learn to be safety heroes!</span>
            </div>
          </div>
          <div className="progress-info">
            <div className="level-badge">
              Level {currentLevel}
            </div>
            <div className="stars-count">
              ⭐ {userStars}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(completedLevels.length / pathData.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Path Area */}
      <div className="path-scroll-area">
        <div className="pathway-wrapper">
          {/* Animated Path Line SVG */}
          <svg className="path-line" viewBox="0 0 100 2000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#154D71" />
                <stop offset="25%" stopColor="#4ECDC4" />
                <stop offset="50%" stopColor="#FFD93D" />
                <stop offset="75%" stopColor="#FF6B6B" />
                <stop offset="100%" stopColor="#154D71" />
              </linearGradient>
            </defs>
            <path
              d="M25 100 Q50 200 75 300 Q50 400 25 500 Q50 600 75 700 Q50 800 25 900 Q50 1000 75 1100 Q50 1200 25 1300 Q50 1400 75 1500 Q50 1600 25 1700 Q50 1800 75 1900"
              stroke="url(#pathGradient)"
              strokeWidth="6"
              fill="none"
              className="animated-path"
            />
          </svg>

          {/* Path Nodes */}
          {pathData.map((level, index) => {
            const position = getNodePosition(index);
            const isUnlocked = unlockedLevels.includes(level.id);
            const isCompleted = completedLevels.includes(level.id);
            const isCurrent = currentLevel === level.id;

            return (
              <div
                key={level.id}
                className={`path-node ${getLevelTypeClass(level.type)} ${
                  isUnlocked ? 'unlocked' : 'locked'
                } ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                style={{
                  position: 'absolute',
                  top: position.top,
                  left: position.left,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => handleLevelClick(level.id)}
              >
                {/* Node Circle */}
                <div className="node-circle">
                  <div className="node-icon">{level.icon}</div>
                  {!isUnlocked && <div className="lock-overlay">🔒</div>}
                  {isCompleted && <div className="completed-badge">✅</div>}
                  {isCurrent && <div className="current-pulse"></div>}
                </div>

                {/* Node Label */}
                <div className="node-label">
                  <h4>{level.title}</h4>
                  <p className="node-description">{level.description}</p>
                  <span className="node-type">{level.type.charAt(0).toUpperCase() + level.type.slice(1)}</span>
                </div>

                {/* Connection Line to Next Node */}
                {index < pathData.length - 1 && (
                  <div className="connection-line"></div>
                )}
              </div>
            );
          })}

          {/* Floating Elements for Fun */}
          <div className="floating-elements">
            <div className="floating-cloud">☁️</div>
            <div className="floating-star">⭐</div>
            <div className="floating-balloon">🎈</div>
          </div>
        </div>
      </div>

      {/* Bottom Encouragement */}
      <div className="bottom-encouragement">
        <div className="encouragement-text">
          {completedLevels.length === 0 && "🚀 Start your safety adventure!"}
          {completedLevels.length > 0 && completedLevels.length < 5 && "💪 Great progress! Keep going!"}
          {completedLevels.length >= 5 && completedLevels.length < 10 && "🌟 You're becoming a safety expert!"}
          {completedLevels.length === 10 && "🎉 Congratulations! You're a Safety Champion!"}
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
