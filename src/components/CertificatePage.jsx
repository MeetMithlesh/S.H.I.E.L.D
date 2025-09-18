import React, { useState } from 'react';
import '../css/CertificatePage.css';

const CertificatePage = ({ levelData, onComplete, onBack, totalStars }) => {
  const [userName, setUserName] = useState('');
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  const generateCertificate = () => {
    if (userName.trim()) {
      setCertificateGenerated(true);
    }
  };

  return (
    <div className="certificate-page">
      <div className="certificate-header">
        <button className="back-btn" onClick={onBack}>← Back to Path</button>
        <div className="certificate-title">
          <span className="certificate-icon">{levelData.icon}</span>
          <h1>{levelData.title}</h1>
        </div>
      </div>

      <div className="certificate-content">
        {!certificateGenerated ? (
          <div className="certificate-form">
            <h2>🎉 Congratulations! You've completed all levels!</h2>
            <p>Enter your name to generate your Safety Champion certificate:</p>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="name-input"
            />
            <button onClick={generateCertificate} className="generate-btn">
              Generate My Certificate! 🏆
            </button>
          </div>
        ) : (
          <div className="certificate-display">
            <div className="certificate">
              <div className="certificate-border">
                <div className="certificate-header-text">
                  <h1>🏆 SAFETY CHAMPION CERTIFICATE 🏆</h1>
                </div>
                <div className="certificate-body">
                  <p>This certifies that</p>
                  <h2 className="certificate-name">{userName}</h2>
                  <p>has successfully completed the</p>
                  <h3>Disaster Safety Adventure Path</h3>
                  <p>and earned <strong>{totalStars} stars</strong></p>
                  <p>demonstrating excellent knowledge of emergency preparedness and safety procedures.</p>
                  <div className="certificate-date">
                    {new Date().toLocaleDateString()}
                  </div>
                  <div className="certificate-signature">
                    Safety Adventure Academy 🦸‍♀️
                  </div>
                </div>
              </div>
            </div>
            <button className="complete-btn" onClick={onComplete}>
              Celebrate Your Achievement! 🎉
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatePage;
