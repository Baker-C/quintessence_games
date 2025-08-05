import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Navigation.css';
import navigationCopy from '../../Copy/navigation';

const Navigation = ({ isSoundEnabled, onSoundToggle }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
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
        <button 
          className="logo-button"
          onClick={scrollToTop}
          aria-label="Welcome to Quintessence Games - Return to top"
        >
          <motion.div 
            className="logo-container"
          >
            <div className="logo-welcome">Welcome to</div>
            <div className="logo-qg">QG</div>
          </motion.div>
        </button>


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
