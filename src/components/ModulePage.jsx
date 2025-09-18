import React, { useState } from 'react'; // Remove useEffect
import '../css/ModulePage.css';

const ModulePage = ({ levelData, onComplete, onBack }) => {
  // Remove these lines:
  // const [progress, setProgress] = useState(0);
  // const entire useEffect for progress

  const [showNotes, setShowNotes] = useState(false);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);

  // Add a simple completion handler
  const handleVideoComplete = () => {
    setIsVideoCompleted(true);
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="module-page">
      {/* Updated Header without progress circle */}
      <div className="module-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Path
        </button>
        <div className="module-title">
          <span className="module-icon">{levelData.icon}</span>
          <h1>{levelData.title}</h1>
        </div>
        {/* Remove the entire progress-circle div */}
      </div>

      {/* Rest of your content stays the same */}
      <div className="module-content">
        <div className="content-grid">
          <div className="video-section">
            <div className="video-container">
              <iframe
                src={levelData.videoUrl}
                title={levelData.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="disaster-video"
                onLoad={handleVideoComplete} // Simple completion trigger
              ></iframe>
            </div>
            
            <div className="video-controls">
              <div className="fun-facts">
                <h3>🎯 Fun Facts!</h3>
                <div className="facts-carousel">
                  <div className="fact-card">
                    <span className="fact-emoji">🌍</span>
                    <p>Natural disasters affect millions of people worldwide every year!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="notes-section">
            <button 
              className={`notes-toggle ${showNotes ? 'active' : ''}`}
              onClick={() => setShowNotes(!showNotes)}
            >
              📝 Interactive Notes
            </button>
            
            {showNotes && (
              <div className="notes-content">
                <h3>Key Learning Points:</h3>
                <div className="note-items">
                  <div className="note-item">
                    <input type="checkbox" id="note1" />
                    <label htmlFor="note1">Understanding disaster types</label>
                  </div>
                  <div className="note-item">
                    <input type="checkbox" id="note2" />
                    <label htmlFor="note2">Preparation strategies</label>
                  </div>
                  <div className="note-item">
                    <input type="checkbox" id="note3" />
                    <label htmlFor="note3">Emergency response steps</label>
                  </div>
                </div>
                
                <textarea 
                  placeholder="Add your own notes here... 📝"
                  className="personal-notes"
                  rows="4"
                />
              </div>
            )}
          </div>
        </div>

        {/* Add a simple completion button that appears after a short delay */}
        <div className="completion-section">
          <div className="completion-celebration">
            <div className="celebration-animation">🎉</div>
            <h2>Great Job! 🌟</h2>
            <p>You've completed this learning module!</p>
            <button className="complete-btn" onClick={handleComplete}>
              Continue Your Journey →
            </button>
          </div>
        </div>
      </div>

      <div className="floating-mascot">
        <div className="mascot-bubble">
          🦸‍♀️ Great job learning about disasters! You're becoming a safety expert!
        </div>
      </div>
    </div>
  );
};

export default ModulePage;
