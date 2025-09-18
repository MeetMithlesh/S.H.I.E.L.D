import React, { useState } from 'react';
import '../css/ChallengePage.css';

const ChallengePage = ({ levelData, onComplete, onBack }) => {
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const emergencyKitItems = [
    { id: 1, item: "Water (1 gallon per person for 3 days)", essential: true },
    { id: 2, item: "Non-perishable food (3-day supply)", essential: true },
    { id: 3, item: "Battery-powered radio", essential: true },
    { id: 4, item: "Flashlight", essential: true },
    { id: 5, item: "First aid kit", essential: true },
    { id: 6, item: "Extra batteries", essential: true },
    { id: 7, item: "Whistle for signaling help", essential: false },
    { id: 8, item: "Dust mask", essential: false },
    { id: 9, item: "Plastic sheeting and duct tape", essential: false },
    { id: 10, item: "Moist towelettes", essential: false }
  ];

  const handleItemCheck = (itemId) => {
    const newCheckedItems = checkedItems.includes(itemId)
      ? checkedItems.filter(id => id !== itemId)
      : [...checkedItems, itemId];
    
    setCheckedItems(newCheckedItems);
    
    const essentialItems = emergencyKitItems.filter(item => item.essential).map(item => item.id);
    const hasAllEssentials = essentialItems.every(id => newCheckedItems.includes(id));
    
    if (hasAllEssentials && newCheckedItems.length >= 6) {
      setChallengeCompleted(true);
    }
  };

  return (
    <div className="challenge-page">
      <div className="challenge-header">
        <button className="back-btn" onClick={onBack}>← Back to Path</button>
        <div className="challenge-title">
          <span className="challenge-icon">{levelData.icon}</span>
          <h1>{levelData.title}</h1>
        </div>
      </div>

      <div className="challenge-content">
        <div className="challenge-mission">
          <h2>🎯 Your Mission: Build an Emergency Kit!</h2>
          <p>Select the items you would include in a family emergency kit. Check off at least 6 essential items!</p>
        </div>

        <div className="items-grid">
          {emergencyKitItems.map(item => (
            <div
              key={item.id}
              className={`item-card ${checkedItems.includes(item.id) ? 'checked' : ''} ${item.essential ? 'essential' : ''}`}
              onClick={() => handleItemCheck(item.id)}
            >
              <div className="item-checkbox">
                {checkedItems.includes(item.id) ? '✅' : '⬜'}
              </div>
              <div className="item-text">{item.item}</div>
              {item.essential && <div className="essential-badge">Essential</div>}
            </div>
          ))}
        </div>

        {challengeCompleted && (
          <div className="challenge-success">
            <h2>🎉 Challenge Complete!</h2>
            <p>You've successfully built an emergency kit! You're ready to help keep your family safe!</p>
            <button className="complete-btn" onClick={onComplete}>
              Claim Your Hero Badge! 🏆
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengePage;
