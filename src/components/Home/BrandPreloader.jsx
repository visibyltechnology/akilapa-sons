import React, { useEffect, useState } from 'react';
import './BrandPreloader.css';

export default function BrandPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400); // Wait for needle swipe down
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="preloader-overlay">
      <div className="preloader-content">
        <h1 className="preloader-brand">
          Akilapa<span className="logo-accent">&</span>Sons
        </h1>
        <div className="rpm-meter-container">
          <div className="rpm-meter">
            {/* The needle rotates from -90deg (0%) to 90deg (100%) */}
            <div 
              className="rpm-needle"
              style={{ transform: `rotate(${(progress / 100) * 180 - 90}deg)` }}
            ></div>
            <div className="rpm-center-dot"></div>
          </div>
          <div className="progress-text">{Math.min(progress, 100)}%</div>
        </div>
      </div>
    </div>
  );
}
