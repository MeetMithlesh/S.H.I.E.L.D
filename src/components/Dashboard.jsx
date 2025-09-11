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
    setTimeout(() => setShowConfetti(false), 2000);
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
          <div className="home-icon">🏠</div>
          <h1>Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="achievement-badges">
            <div className="badge-item crown">
              <span className="badge-icon">👑</span>
              <span className="badge-count">{userData.achievements.crown}</span>
            </div>
            <div className="badge-item streak">
              <span className="badge-icon">🔥</span>
              <span className="badge-count">{userData.achievements.streak}</span>
            </div>
            <div className="badge-item trophy">
              <span className="badge-icon">🏆</span>
              <span className="badge-count">{userData.achievements.trophy}</span>
            </div>
            <div className="badge-item coins">
              <span className="badge-icon">🪙</span>
              <span className="badge-count">{userData.achievements.coins}</span>
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

        
      

{/* Learning Roadmap - Improved Central Feature */}
<div className="roadmap-card" onClick={handleLearningRoadmap}>
  <div className="card-header">
    <h2>LEARNING ROADMAP</h2>
  </div>
  <div className="roadmap-content">
    <div className="roadmap-scene">
      {/* Sky with floating clouds */}
      <div className="sky">
        <div className="cloud cloud1">☁️</div>
        <div className="cloud cloud2">☁️</div>
        <div className="cloud cloud3">☁️</div>
      </div>
      
      {/* Main learning path with nodes */}
      <div className="learning-path-container">
        {/* Path SVG */}
        <svg className="path-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
          <path
            d="M80 250 Q150 200 200 150 Q250 100 320 100"
            stroke="#FFA500"
            strokeWidth="8"
            fill="none"
            className="animated-learning-path"
          />
        </svg>

        {/* Level Nodes */}
        <div className="level-node completed" style={{bottom: '50px', left: '80px'}}>
          <div className="node-wrapper">
            <div className="node-circle">
              <span className="node-number">1</span>
              <div className="completion-check">✓</div>
            </div>
          </div>
        </div>

        <div className="level-node completed" style={{bottom: '120px', left: '180px'}}>
          <div className="node-wrapper">
            <div className="node-circle">
              <span className="node-number">2</span>
              <div className="completion-check">✓</div>
            </div>
          </div>
        </div>

        <div className="level-node current" style={{bottom: '180px', left: '280px'}}>
          <div className="node-wrapper">
            <div className="node-circle current-glow">
              <span className="node-number">3</span>
              <div className="current-pulse"></div>
            </div>
          </div>
        </div>

        <div className="level-node locked" style={{bottom: '180px', right: '50px'}}>
          <div className="node-wrapper">
            <div className="node-circle">
              <span className="node-number">4</span>
              <div className="lock-icon">🔒</div>
            </div>
          </div>
        </div>
      </div>

      {/* Disaster Zone Labels with Modern Design */}
      <div className="disaster-zones">
        <div className="zone-card floods-zone">
          <div className="zone-icon">🏠</div>
          <span className="zone-text">FLOODS</span>
        </div>
        
        <div className="zone-card fires-zone">
          <div className="zone-icon">🔥</div>
          <span className="zone-text">FIRES</span>
        </div>
        
        <div className="zone-card heatwaves-zone">
          <div className="zone-icon">🌡️</div>
          <span className="zone-text">HEATWAVES</span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-elements">
        <div className="tree tree1">🌳</div>
        <div className="tree tree2">🌲</div>
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
