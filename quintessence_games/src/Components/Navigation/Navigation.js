import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Navigation.css';
import navigationCopy from '../../Copy/navigation';

const Navigation = ({ isSoundEnabled, onSoundToggle }) => {
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-container');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const isCurrentlyInHero = heroRect.bottom > (window.innerHeight / 2) && heroRect.top < (window.innerHeight / 2);
        setIsInHero(isCurrentlyInHero);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    // Map 'join' to 'jobs' section
    const targetId = sectionId === 'join' ? 'jobs' : sectionId;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <nav className="navigation-container" role="navigation" aria-label="Main navigation">
      <motion.div 
        className="nav-content"
        initial={{ x: -240 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.button 
          className="top-button"
          onClick={scrollToTop}
          aria-label="Quintessence Games - Return to top"
          animate={{ 
            width: isInHero ? 'fit-content' : 0
          }}
          transition={{ 
            duration: 0.5, 
            ease: "easeInOut" 
          }}
        >
          <div className="nav-welcome">
            Welcome to QGstudios
          </div>
        </motion.button>

        {/* Logo */}
        <motion.button 
          className="top-button"
          onClick={scrollToTop}
          aria-label="Quintessence Games - Return to top"
          animate={{ 
            width: isInHero ? 0 : 'fit-content'
          }}
          transition={{ 
            duration: 0.5, 
            ease: "easeInOut" 
          }}
        >
          <div className="logo-qg">
            QG
          </div>
        </motion.button>

        {/* Bottom Section */}
        <div className="nav-bottom">
          {/* Sound Toggle */}
          <motion.button
            className="sound-toggle"
            onClick={onSoundToggle}
            aria-label={`Toggle sound ${isSoundEnabled ? 'off' : 'on'}`}
            aria-pressed={isSoundEnabled}
          >
            <span className="sound-icon" aria-hidden="true">
              {isSoundEnabled ? '🔊' : '🔇'}
            </span>
            <span className="sound-text">
              {isSoundEnabled ? navigationCopy.soundToggle.on : navigationCopy.soundToggle.off}
            </span>
          </motion.button>
          
          {/* Navigation Links */}
          <div className="nav-links">
            {Object.entries(navigationCopy.links).map(([key, label]) => (
              <motion.button
                key={key}
                className="nav-link"
                onClick={() => scrollToSection(key)}
                aria-label={`Navigate to ${label} section`}
              >
                {label}
              </motion.button>
            ))}
          </div>

          {/* Contact Button */}
          <motion.button
            className="contact-button"
            onClick={() => scrollToSection('contact')}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            aria-label={navigationCopy.contactButton.ariaLabel}
          >
            {navigationCopy.contactButton.label}
          </motion.button>
        </div>
      </motion.div>
    </nav>
  );
};

Navigation.propTypes = {
  isSoundEnabled: PropTypes.bool.isRequired,
  onSoundToggle: PropTypes.func.isRequired
};

export default Navigation;
