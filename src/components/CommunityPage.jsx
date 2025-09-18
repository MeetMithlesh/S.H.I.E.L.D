import React, { useState } from 'react';
import '../css/CommunityPage.css';

const CommunityPage = ({ levelData, onComplete, onBack }) => {
  const [sharedTips, setSharedTips] = useState([]);
  const [newTip, setNewTip] = useState('');
  const [helpedFriends, setHelpedFriends] = useState(0);

  const handleShareTip = () => {
    if (newTip.trim()) {
      setSharedTips([...sharedTips, { id: Date.now(), tip: newTip, likes: 0 }]);
      setNewTip('');
      setHelpedFriends(helpedFriends + 1);
    }
  };

  const handleLike = (tipId) => {
    setSharedTips(sharedTips.map(tip => 
      tip.id === tipId ? { ...tip, likes: tip.likes + 1 } : tip
    ));
  };

  return (
    <div className="community-page">
      <div className="community-header">
        <button className="back-btn" onClick={onBack}>← Back to Path</button>
        <div className="community-title">
          <span className="community-icon">{levelData.icon}</span>
          <h1>{levelData.title}</h1>
        </div>
        <div className="help-counter">
          👥 Helped: {helpedFriends}
        </div>
      </div>

      <div className="community-content">
        <div className="share-section">
          <h2>Share a Safety Tip! 💡</h2>
          <textarea
            value={newTip}
            onChange={(e) => setNewTip(e.target.value)}
            placeholder="What safety tip would you share with your friends?"
            className="tip-input"
          />
          <button onClick={handleShareTip} className="share-btn">
            Share Tip 🚀
          </button>
        </div>

        <div className="tips-feed">
          <h3>Community Safety Tips</h3>
          {sharedTips.map(tip => (
            <div key={tip.id} className="tip-card">
              <div className="tip-content">{tip.tip}</div>
              <button onClick={() => handleLike(tip.id)} className="like-btn">
                ❤️ {tip.likes}
              </button>
            </div>
          ))}
        </div>

        {helpedFriends >= 3 && (
          <div className="community-success">
            <h2>🌟 Amazing Community Helper!</h2>
            <p>You've shared valuable safety knowledge! You're helping make your community safer!</p>
            <button className="complete-btn" onClick={onComplete}>
              Continue Helping Others! 👥
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
