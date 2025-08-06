import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './InitialOverlay.css';
import initialOverlayCopy from '../../Copy/initialOverlay';

const InitialOverlay = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Disable scrolling when component mounts
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
    };
  }, []);

  const handleCtaClick = () => {
    setIsExiting(true);
  };

  const handleExitComplete = () => {
    if (isExiting) {
      // Re-enable scrolling when exit animation completes
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
      
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <motion.div
      className="initial-hero-overlay"
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ 
        duration: 0.5,
        ease: "easeInOut"
      }}
      onAnimationComplete={handleExitComplete}
      style={{
        pointerEvents: isExiting ? 'none' : 'auto'
      }}
    >
      <div className="initial-hero-content">
        <motion.h1
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={isExiting ? { 
            opacity: [1, 0, 1, 0],
          } : { 
            opacity: 1, 
            y: 0 
          }}
          transition={isExiting ? {
            opacity: { 
              duration: 0.5,
              times: [0, 0.25, 0.75, 1]
            }
          } : {
            duration: 1
          }}
        >
          {initialOverlayCopy.enterText}
        </motion.h1>

        <motion.button
          className="cta-button"
          onClick={handleCtaClick}
          initial={{ opacity: 0, y: 30 }}
          animate={isExiting ? {
            opacity: [1, 0, 1, 0],
          } : {
            opacity: 1, 
            y: 0
          }}
          transition={isExiting ? {
            opacity: { 
              duration: 0.5,
              times: [0, 0.25, 0.75, 1]
            }
          } : {
            duration: 0.8, 
            delay: 1.4
          }}
          aria-label={initialOverlayCopy.ctaButton.ariaLabel}
        >
          {initialOverlayCopy.ctaButton.label}
        </motion.button>
      </div>
    </motion.div>
  );
};

InitialOverlay.propTypes = {
  onComplete: PropTypes.func
};

export default InitialOverlay;
