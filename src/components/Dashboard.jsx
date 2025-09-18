import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(5);
  const [xpPoints, setXpPoints] = useState(2300);
  const [dailyStreak, setDailyStreak] = useState(3);
  const [completedQuests, setCompletedQuests] = useState(7);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAchievement, setShowAchievement] = useState(null);

  // Marvel-inspired badges system
  const [marvelBadges, setMarvelBadges] = useState([
    {
      id: 1,
      name: "Safety Shield",
      icon: "🛡️",
      description: "Complete first safety module",
      style: "captain-america",
      colors: ["#154D71", "#FF6B6B", "#FFFFFF"],
      earned: true
    },
    {
      id: 2,
      name: "Fire Guardian",
      icon: "🔥",
      description: "Master fire safety protocols",
      style: "iron-man",
      colors: ["#FFD93D", "#FF6B6B", "#154D71"],
      earned: true
    },
    {
      id: 3,
      name: "Storm Defender", 
      icon: "⚡",
      description: "Complete weather safety training",
      style: "thor",
      colors: ["#4ECDC4", "#154D71", "#FFD93D"],
      earned: true
    },
    {
      id: 4,
      name: "Rescue Hero",
      icon: "🚑",
      description: "Master emergency response",
      style: "spider-man",
      colors: ["#FF6B6B", "#154D71", "#FFFFFF"],
      earned: false
    },
    {
      id: 5,
      name: "Earth Protector",
      icon: "🌍",
      description: "Complete earthquake safety",
      style: "hulk",
      colors: ["#4ECDC4", "#95E1D3", "#154D71"],
      earned: false
    },
    {
      id: 6,
      name: "Flood Warrior",
      icon: "🌊",
      description: "Master flood preparedness",
      style: "aquaman",
      colors: ["#4ECDC4", "#154D71", "#FFD93D"],
      earned: false
    }
  ]);

  // Sample user data
  const userData = {
    name: "Safety Hero",
    avatar: "🦸‍♀️",
    achievements: {
      crown: 15,
      streak: 8,
      trophy: 12,
      coins: 450
    }
  };

  // Today's quest data
  const todaysQuest = {
    title: "Pack your flood emergency kit",
    description: "Learn what items to include in your emergency kit",
    icon: "🎒",
    progress: 0,
    reward: "50 XP"
  };

  // Leaderboard data
  const leaderboard = [
    { name: "Alice", avatar: "👧", score: 2800, rank: 1 },
    { name: "Bob", avatar: "👦", score: 2650, rank: 2 },
    { name: "Carol", avatar: "👧", score: 2400, rank: 3 },
    { name: "You", avatar: "🦸‍♀️", score: 2300, rank: 4 }
  ];

  // Mini games data
  const miniGames = [
    {
      id: 1,
      title: "Quiz Arena",
      subtitle: "Test your knowledge",
      icon: "🧠",
      color: "#4ECDC4",
      players: "2.4k playing"
    },
    {
      id: 2,
      title: "Escape the Danger",
      subtitle: "Find the safe route",
      icon: "🏃‍♂️",
      color: "#FF6B6B",
      players: "1.8k playing"
    }
  ];

  const handleLearningRoadmap = () => {
    setShowConfetti(true);
    setTimeout(() => {
      navigate('/learning-path');
      setShowConfetti(false);
    }, 1000);
  };

  const handleQuestStart = () => {
  setShowConfetti(true);
  setTimeout(() => {
    setShowConfetti(false);
    navigate('/disaster-prep-game'); 
  }, 1000);
};

  // Badge unlock function
  const unlockBadge = (badgeId) => {
    setMarvelBadges(prevBadges => 
      prevBadges.map(badge => 
        badge.id === badgeId 
          ? { ...badge, earned: true }
          : badge
      )
    );
    
    setShowAchievement(badgeId);
    setTimeout(() => setShowAchievement(null), 3000);
  };

  // Marvel Badge Component
  const MarvelBadge = ({ badge, size = 'medium' }) => {
    const sizeClasses = {
      small: 'badge-small',
      medium: 'badge-medium', 
      large: 'badge-large'
    };

    return (
      <div 
        className={`marvel-badge ${badge.style} ${sizeClasses[size]} ${badge.earned ? 'earned' : 'locked'}`}
        onClick={() => !badge.earned && unlockBadge(badge.id)}
      >
        <div className="badge-outer-ring">
          <div className="badge-inner-ring">
            <div className="badge-center">
              <div className="badge-icon">{badge.earned ? badge.icon : '🔒'}</div>
              {badge.earned && <div className="badge-sparkle">✨</div>}
            </div>
            <div className="badge-text">
              <div className="badge-name">{badge.name}</div>
            </div>
          </div>
        </div>
        {badge.earned && <div className="badge-glow"></div>}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({length: 50}).map((_, i) => (
            <div key={i} className={`confetti confetti-${i % 5}`}></div>
          ))}
        </div>
      )}

      {/* Achievement Notification */}
      {showAchievement && (
        <div className="achievement-notification">
          <div className="achievement-content">
            <div className="achievement-icon">🏆</div>
            <div className="achievement-text">
              <h3>New Hero Badge Unlocked!</h3>
              <p>{marvelBadges.find(b => b.id === showAchievement)?.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="dashboard-header">
        <div className="header-left">
  
  <img src="OVER-removebg-preview.png" alt="Your Logo" className="logo-image" />
</div>

        <div className="header-right">
          <div className="achievement-badges">
            
            <div className="badge-item streak">
              <span className="badge-icon">🔥</span>
              <span className="badge-count">{userData.achievements.streak}</span>
            </div>
            <div className="badge-item trophy">
              <span className="badge-icon">🏆</span>
              <span className="badge-count">{userData.achievements.trophy}</span>
            </div>
            
          </div>
          <div className="user-profile">
            <div className="user-avatar">{userData.avatar}</div>
            <div className="user-info">
              <div className="user-level">LEVEL {currentLevel}</div>
              <div className="user-xp">{xpPoints.toLocaleString()} XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Today's Quest */}
        <div className="quest-card">
          <div className="card-header">
            <h2>TODAY'S QUEST</h2>
          </div>
          <div className="quest-content">
            <div className="quest-icon">{todaysQuest.icon}</div>
            <div className="quest-details">
              <h3>{todaysQuest.title}</h3>
              <p>{todaysQuest.description}</p>
            </div>
          </div>
          <button className="start-button" onClick={handleQuestStart}>
            START
          </button>
        </div>


{/* Learning Roadmap - Using Image Background */}
<div className="roadmap-card" onClick={handleLearningRoadmap}>
  <div className="card-header">
    <h2>LEARNING ROADMAP</h2>
  </div>
  <div className="roadmap-content">
    <div className="roadmap-image-container">
      {/* Background image */}
      <img 
        src="Screenshot 2025-09-10 230153.png" 
        alt="Learning Roadmap" 
        className="roadmap-background-image"
      />
      
      {/* Interactive overlay nodes */}
      <div className="interactive-nodes-overlay">
        {/* Level 1 - Completed */}
        <div className="interactive-node completed" style={{bottom: '35%', left: '22%'}}>
          <div className="node-indicator completed-indicator">
            <span>✓</span>
          </div>
        </div>

        {/* Level 2 - Completed */}
        <div className="interactive-node completed" style={{bottom: '55%', left: '35%'}}>
          <div className="node-indicator completed-indicator">
            <span>✓</span>
          </div>
        </div>

        {/* Level 3 - Current */}
        <div className="interactive-node current" style={{bottom: '70%', left: '60%'}}>
          <div className="node-indicator current-indicator">
            <span>3</span>
          </div>
        </div>

        {/* Level 4 - Locked */}
        <div className="interactive-node locked" style={{bottom: '50%', right: '25%'}}>
          <div className="node-indicator locked-indicator">
            <span>🔒</span>
          </div>
        </div>
      </div>
      
      {/* Hover overlay for interactivity */}
      <div className="roadmap-hover-overlay">
        <div className="hover-text">Click to explore your learning journey!</div>
      </div>
    </div>
  </div>
</div>

      
        {/* Daily Streak */}
        <div className="streak-card">
          <div className="card-header">
            <h2>DAILY STREAK</h2>
          </div>
          <div className="streak-content">
            <div className="streak-flame">🔥</div>
            <div className="streak-number">{dailyStreak}</div>
            <div className="streak-label">DAYS</div>
          </div>
        </div>

        {/* Mini Games */}
        <div className="minigames-card">
          <div className="card-header">
            <h2>MINI-GAMES</h2>
          </div>
          <div className="minigames-content">
            {miniGames.map(game => (
              <div key={game.id} className="mini-game" style={{backgroundColor: game.color}}>
                <div className="game-icon">{game.icon}</div>
                <div className="game-info">
                  <h4>{game.title}</h4>
                  <p>{game.subtitle}</p>
                  <span className="player-count">{game.players}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marvel Hero Badges */}
        <div className="badges-card">
          <div className="card-header">
            <h2>🦸‍♀️ HERO BADGES</h2>
          </div>
          <div className="badges-content">
            {marvelBadges.map(badge => (
              <MarvelBadge 
                key={badge.id} 
                badge={badge} 
                size="medium"
              />
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="leaderboard-card">
          <div className="card-header">
            <h2>LEADERBOARD</h2>
          </div>
          <div className="leaderboard-content">
            {leaderboard.slice(0, 3).map(player => (
              <div key={player.rank} className={`leaderboard-item ${player.name === 'You' ? 'current-user' : ''}`}>
                <div className="player-rank">{player.rank}</div>
                <div className="player-avatar">{player.avatar}</div>
                <div className="player-info">
                  <div className="player-name">{player.name}</div>
                  <div className="player-score">{player.score.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fab-container">
        <div className="fab" onClick={handleLearningRoadmap}>
          <span>🚀</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
