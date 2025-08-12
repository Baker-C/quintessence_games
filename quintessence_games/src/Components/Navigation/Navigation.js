import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Navigation.css';
import navigationCopy from '../../Copy/navigation';

const Navigation = ({ isSoundEnabled, onSoundToggle, isHeroComplete }) => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroContainer = document.querySelector('.hero-container');
      if (!heroContainer) return;
      const heroHeight = heroContainer.offsetHeight;
      const viewportHeight = window.innerHeight;
      const totalScrollableHero = heroHeight - viewportHeight; // portion where sticky hero animates
      if (totalScrollableHero <= 0) {
        setShowLogo(true);
        return;
      }
      const scrolled = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollableHero));
      // Show once we've passed halfway OR fully exited hero
      setShowLogo(progress >= 0.5 || progress >= 1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', handleScroll);
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

  const scrollToNextSection = () => {
    // Always scroll to the next section after hero
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navigation-container" role="navigation" aria-label="Main navigation">
      <motion.div 
        className="nav-content"
      >

        {/* Logo */}
        <motion.button 
          className="top-button"
          onClick={scrollToNextSection}
          aria-label="Quintessence Games - Continue to next section"
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: showLogo ? 'fit-content' : 0,
            opacity: showLogo ? 1 : 0
          }}
          transition={{ 
            duration: 0.5, 
            ease: "easeInOut" 
          }}
          disabled={!showLogo}
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
            initial={{ x: -240, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
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
                initial={{ x: -240, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: (0.5 * (Object.keys(navigationCopy.links).indexOf(key) + 4)) }}
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
            initial={{ x: -240, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 3 }}
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
  onSoundToggle: PropTypes.func.isRequired,
  isHeroComplete: PropTypes.bool.isRequired
};

export default Navigation;
