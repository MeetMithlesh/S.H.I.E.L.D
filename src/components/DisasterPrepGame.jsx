
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Trophy, Clock, Backpack, Heart } from 'lucide-react';
import '../css/DisasterPrepGame.css';

const DisasterPrepGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [gameState, setGameState] = useState('ready');
  const [selectedItems, setSelectedItems] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [availableItems, setAvailableItems] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showResultsDelayed, setShowResultsDelayed] = useState(false);
  const shuffleIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);

  const essentialItems = [
    { id: 1, name: 'Water (3 gallons)', emoji: '💧', category: 'essential', explanation: '1 gallon per person per day for 3 days - critical for survival' },
    { id: 2, name: 'Non-perishable Food', emoji: '🥫', category: 'essential', explanation: '3-day supply of canned goods, energy bars, and dried foods' },
    { id: 3, name: 'First Aid Kit', emoji: '🏥', category: 'essential', explanation: 'Bandages, antiseptic, pain relievers, and prescription medications' },
    { id: 4, name: 'Flashlight', emoji: '🔦', category: 'essential', explanation: 'LED flashlight with extra batteries for power outages' },
    { id: 5, name: 'Battery Radio', emoji: '📻', category: 'essential', explanation: 'NOAA Weather Radio to receive emergency broadcasts' },
    { id: 6, name: 'Whistle', emoji: '📯', category: 'essential', explanation: 'Signal for help when trapped or need assistance' },
    { id: 7, name: 'Face Masks', emoji: '😷', category: 'essential', explanation: 'N95 masks for dust, smoke, and airborne particles' },
    { id: 8, name: 'Emergency Blanket', emoji: '🛏️', category: 'essential', explanation: 'Thermal blankets to maintain body temperature' },
    { id: 9, name: 'Important Documents', emoji: '📄', category: 'essential', explanation: 'Copies of ID, insurance, bank info in waterproof container' },
    { id: 10, name: 'Cash', emoji: '💵', category: 'essential', explanation: 'Small bills and coins when ATMs and cards don\'t work' },
    { id: 11, name: 'Phone Charger', emoji: '🔌', category: 'essential', explanation: 'Portable battery pack and charging cables' },
    { id: 12, name: 'Medications', emoji: '💊', category: 'essential', explanation: '7-day supply of prescription and over-the-counter meds' }
  ];

  const nonEssentialItems = [
    { id: 13, name: 'Gaming Console', emoji: '🎮', category: 'non-essential', explanation: 'Entertainment but requires electricity and takes valuable space' },
    { id: 14, name: 'Jewelry', emoji: '💍', category: 'non-essential', explanation: 'Valuable but not helpful for immediate survival needs' },
    { id: 15, name: 'Large TV', emoji: '📺', category: 'non-essential', explanation: 'Too bulky, heavy, and requires electricity to function' },
    { id: 16, name: 'Perfume', emoji: '🌸', category: 'non-essential', explanation: 'Luxury item that doesn\'t address survival priorities' },
    { id: 17, name: 'High Heels', emoji: '👠', category: 'non-essential', explanation: 'Impractical footwear for emergency evacuation' },
    { id: 18, name: 'Decorative Items', emoji: '🏺', category: 'non-essential', explanation: 'Takes up valuable space and weight in emergency bag' }
  ];

  // Shuffle cards periodically during gameplay
  useEffect(() => {
    if (gameState === 'playing' && !isProcessing) {
      shuffleIntervalRef.current = setInterval(() => {
        if (availableItems.length > 3) { // Only shuffle if enough items
          setIsShuffling(true);
          setTimeout(() => {
            setAvailableItems(prev => [...prev].sort(() => Math.random() - 0.5));
            setIsShuffling(false);
          }, 800); // Duration of shuffle animation
        }
      }, 5000); 

      return () => {
        if (shuffleIntervalRef.current) {
          clearInterval(shuffleIntervalRef.current);
        }
      };
    }
  }, [gameState, isProcessing, availableItems.length]);

  // Initialize available items when game starts
  useEffect(() => {
    if (gameState === 'playing') {
      const shuffled = [...essentialItems, ...nonEssentialItems].sort(() => Math.random() - 0.5);
      setAvailableItems(shuffled);
    }
  }, [gameState]);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
  }, [timeLeft, gameState]);

  // Clear feedback after timeout
  useEffect(() => {
    if (feedback) {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
      feedbackTimeoutRef.current = setTimeout(() => setFeedback(''), 3000);
    }
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, [feedback]);

  // Check for game completion
  useEffect(() => {
    if (gameState === 'playing') {
      const essentialSelected = selectedItems.filter(i => i.category === 'essential').length;
      if (essentialSelected === essentialItems.length) {
        setScore(prevScore => prevScore + 150);
        setFeedback('🎉 PERFECT! All essential items collected! +150 bonus points!');
        setTimeout(() => {
          endGame();
        }, 2500);
      }
    }
  }, [selectedItems, gameState]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(120);
    setSelectedItems([]);
    setFeedback('');
    setShowExplanation(false);
    setShowResultsDelayed(false);
    setAchievements([]);
    setIsProcessing(false);
    setIsShuffling(false);
  }, []);

  const selectItem = useCallback((item) => {
    if (isProcessing || gameState !== 'playing' || isShuffling) {
      return;
    }

    if (selectedItems.some(selected => selected.id === item.id)) {
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setSelectedItems(prev => {
        if (prev.some(selected => selected.id === item.id)) {
          setIsProcessing(false);
          return prev;
        }

        const newSelectedItems = [...prev, item];

        // Enhanced scoring and feedback
        if (item.category === 'essential') {
          setScore(prevScore => prevScore + 15);
          const encouragement = [
            '✅ Excellent choice!',
            '🎯 Smart thinking!',
            '⭐ Essential item secured!',
            '🔥 Great survival instinct!'
          ];
          const randomEncouragement = encouragement[Math.floor(Math.random() * encouragement.length)];
          setFeedback(`${randomEncouragement} ${item.name} is crucial for emergencies!`);
        } else {
          setScore(prevScore => Math.max(0, prevScore - 8));
          const corrections = [
            '❌ Think survival first!',
            '⚠️ Not a priority right now!',
            '🤔 Focus on essentials!',
            '💡 Remember: survival over comfort!'
          ];
          const randomCorrection = corrections[Math.floor(Math.random() * corrections.length)];
          setFeedback(`${randomCorrection} ${item.name} won't help in emergencies.`);
        }

        setAvailableItems(prevAvailable => 
          prevAvailable.filter(availableItem => availableItem.id !== item.id)
        );

        checkAchievements(newSelectedItems);
        setIsProcessing(false);

        return newSelectedItems;
      });
    }, 150);
  }, [isProcessing, gameState, selectedItems, isShuffling]);

  const removeItem = useCallback((itemToRemove) => {
    if (isProcessing || gameState !== 'playing' || isShuffling) {
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setSelectedItems(prev => {
        const newSelectedItems = prev.filter(item => item.id !== itemToRemove.id);

        if (itemToRemove.category === 'essential') {
          setScore(prevScore => Math.max(0, prevScore - 15));
          setFeedback('⚠️ Removed essential item - reconsider your choice!');
        } else {
          setScore(prevScore => prevScore + 8);
          setFeedback('👍 Good correction - focus on essentials!');
        }

        setAvailableItems(prevAvailable => {
          const updated = [...prevAvailable, itemToRemove];
          return updated.sort(() => Math.random() - 0.5);
        });

        setIsProcessing(false);
        return newSelectedItems;
      });
    }, 150);
  }, [isProcessing, gameState, isShuffling]);

  const checkAchievements = useCallback((items) => {
    const essentialCount = items.filter(i => i.category === 'essential').length;

    if (essentialCount >= 6 && !achievements.includes('halfway')) {
      setAchievements(prev => [...prev, 'halfway']);
      setScore(prevScore => prevScore + 30);
      setFeedback('🏆 Achievement: Halfway Hero! +30 bonus points!');
    }

    if (essentialCount >= 10 && !achievements.includes('almost-there')) {
      setAchievements(prev => [...prev, 'almost-there']);
      setScore(prevScore => prevScore + 50);
      setFeedback('🌟 Achievement: Almost Prepared! +50 bonus points!');
    }

    if (essentialCount === essentialItems.length && !achievements.includes('perfect')) {
      setAchievements(prev => [...prev, 'perfect']);
      setScore(prevScore => prevScore + 100);
      setFeedback('👑 Achievement: Emergency Expert! +100 bonus points!');
    }
  }, [achievements]);

  const endGame = useCallback(() => {
    if (shuffleIntervalRef.current) {
      clearInterval(shuffleIntervalRef.current);
    }
    setGameState('finished');
    setIsProcessing(false);
    setIsShuffling(false);

    // Delay showing results for better UX
    setTimeout(() => {
      setShowResultsDelayed(true);
      setShowExplanation(true);
    }, 500);
  }, []);

  const calculateGrade = useCallback(() => {
    const maxScore = essentialItems.length * 15 + 300; // Including all bonuses
    const percentage = (score / maxScore) * 100;

    if (percentage >= 90) return { grade: 'A+', color: 'grade-a-plus', message: 'Emergency Expert!' };
    if (percentage >= 80) return { grade: 'A', color: 'grade-a', message: 'Well Prepared!' };
    if (percentage >= 70) return { grade: 'B', color: 'grade-b', message: 'Good Progress!' };
    if (percentage >= 60) return { grade: 'C', color: 'grade-c', message: 'Keep Learning!' };
    return { grade: 'D', color: 'grade-d', message: 'Need More Practice!' };
  }, [score]);

  // Calculate completion status
  const essentialSelected = selectedItems.filter(i => i.category === 'essential').length;
  const isGameComplete = essentialSelected === essentialItems.length;
  const completionPercentage = (essentialSelected / essentialItems.length) * 100;

  return (
    <div className={`game-container ${isProcessing ? 'processing' : ''}`}>
      <div className="game-wrapper">
        {/* Header */}
        <div className="header-card">
          <h1 className="game-title">
            <AlertTriangle className="warning-icon" />
            Emergency Kit Challenge
          </h1>
          <p className="game-subtitle">
            Build your emergency survival kit by selecting essential items. 
            {gameState === 'playing' && ' Items shuffle every few seconds!'}
          </p>
          {isProcessing && <p className="processing-text">Processing selection...</p>}
          {gameState === 'playing' && isGameComplete && (
            <p className="completion-text completion-celebration">
              🎉 All essential items collected! Game ending...
            </p>
          )}
        </div>

        {/* Game Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <Trophy className="trophy-icon" />
              <span className="stat-text">Score: <span className="stat-number">{score}</span></span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <Clock className={timeLeft < 30 ? 'clock-icon urgent' : 'clock-icon'} />
              <span className="stat-text">Time: <span className="stat-number">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span></span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <Heart className="heart-icon" />
              <span className="stat-text">Essential: <span className="stat-number">{essentialSelected}/{essentialItems.length}</span></span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {gameState === 'playing' && (
          <div className={`progress-container ${isGameComplete ? 'completion-celebration' : ''}`}>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="progress-text">
              Essential Items Progress: {essentialSelected} / {essentialItems.length}
              {isGameComplete && " 🏆 COMPLETE!"}
            </p>
          </div>
        )}

        {/* Feedback Message */}
        {feedback && (
          <div className="feedback-message">
            <p className="feedback-text">{feedback}</p>
          </div>
        )}

        {gameState === 'ready' && (
          <div className="ready-screen">
            <Backpack className="ready-icon" />
            <h2 className="ready-title">Ready to Build Your Emergency Kit?</h2>
            <p className="ready-description">
              You have 2 minutes to select essential emergency items for your survival kit. 
              Cards will shuffle periodically to keep you alert! 
              Choose wisely - the game ends when you collect all 12 essential items or time runs out.
            </p>
            <button 
              onClick={startGame} 
              className="start-button"
              disabled={isProcessing}
            >
              Start Challenge
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="game-grid">
            {/* Available Items */}
            <div className="available-items">
              {isShuffling && <div className="shuffle-indicator">🔄 Shuffling Cards...</div>}
              <h3 className="section-title">Available Items ({availableItems.length})</h3>
              <p className="instruction-text">Click items to add them to your emergency bag</p>
              <div className={`items-grid ${isShuffling ? 'shuffling' : ''}`}>
                {availableItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    onClick={() => selectItem(item)}
                    className={`clickable-item ${isProcessing || isGameComplete || isShuffling ? 'disabled' : ''}`}
                    style={{ 
                      animationDelay: isShuffling ? `${index * 0.1}s` : '0s'
                    }}
                  >
                    <div className="item-emoji">{item.emoji}</div>
                    <p className="item-name">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Bag */}
            <div className={`emergency-bag ${selectedItems.length > 0 ? 'has-items' : ''}`}>
              <h3 className="section-title bag-title">
                <Backpack className="bag-icon" />
                Your Emergency Bag ({selectedItems.length} items)
              </h3>
              {selectedItems.length === 0 ? (
                <div className="empty-bag">
                  <p className="empty-bag-text">Your bag is empty!</p>
                  <p className="empty-bag-subtext">Click items to add them</p>
                </div>
              ) : (
                <div className="items-grid">
                  {selectedItems.map(item => (
                    <div
                      key={item.id}
                      className={`selected-item ${item.category === 'essential' ? 'essential-item' : 'non-essential-item'} ${isProcessing || isGameComplete || isShuffling ? 'disabled' : ''}`}
                    >
                      <button
                        onClick={() => removeItem(item)}
                        className="remove-button"
                        disabled={isProcessing || isGameComplete || isShuffling}
                      >
                        ×
                      </button>
                      <div className="item-emoji">{item.emoji}</div>
                      <p className="item-name">{item.name}</p>
                      {item.category === 'essential' ? (
                        <CheckCircle className="check-icon" />
                      ) : (
                        <XCircle className="x-icon" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {gameState === 'finished' && showResultsDelayed && (
          <div className="results-screen">
            <div className="results-header">
              <h2 className="game-over-title">Game Complete!</h2>
              <div className={`final-grade ${calculateGrade().color}`}>
                {calculateGrade().grade}
              </div>
              <p className="grade-message">{calculateGrade().message}</p>
              <p className="final-score">Final Score: {score} points</p>
              <p className="completion-status">
                Essential Items Collected: {essentialSelected} / {essentialItems.length}
                {essentialSelected === essentialItems.length && " 🏆"}
              </p>
            </div>

            {showExplanation && (
              <div className="explanation-section">
                <h3 className="explanation-title">Emergency Kit Breakdown:</h3>
                <div className="explanation-grid">
                  {essentialItems.map(item => {
                    const wasSelected = selectedItems.find(s => s.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className={`explanation-item ${wasSelected ? 'correct-item' : 'missed-item'}`}
                      >
                        <span className="item-emoji">{item.emoji}</span>
                        <div className="item-details">
                          <p className="item-title">
                            {item.name}
                            {wasSelected ? (
                              <CheckCircle className="check-icon-small" />
                            ) : (
                              <XCircle className="x-icon-small" />
                            )}
                          </p>
                          <p className="item-explanation">{item.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="play-again-section">
              <button 
                onClick={startGame} 
                className="play-again-button"
                disabled={isProcessing}
              >
                <RefreshCw className="refresh-icon" />
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisasterPrepGame;
