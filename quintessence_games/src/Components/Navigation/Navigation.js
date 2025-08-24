import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Navigation.css';
import navigationCopy from '../../Copy/navigation';

const Navigation = ({ isSoundEnabled, onSoundToggle, isHeroComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/Logo_100.png');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

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

    const updateLogo = () => {
      if (window.innerWidth < 768) {
        setLogoSrc('/Logo_50.png');
        setIsSmallScreen(true);
      } else {
        setLogoSrc('/Logo_100.png');
        setIsSmallScreen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateLogo);

    // Set initial logo and handle scroll on mount
    handleScroll();
    updateLogo();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateLogo);
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
          initial={isSmallScreen ? {} : { width: 0, opacity: 0 }}
          animate={isSmallScreen ? {} : { 
            width: showLogo ? 'fit-content' : 0,
            paddingRight: showLogo ? 'var(--spacing-sm)' : 0,
            opacity: showLogo ? 1 : 0
          }}
          transition={isSmallScreen ? {} : { 
            duration: 0.5, 
            ease: "easeInOut" 
          }}
          disabled={!showLogo}
        >
          <div className="logo-qg">
            <img src={logoSrc} alt="QG" />
          </div>
        </motion.button>

        {/* Bottom Section */}
        <div className="nav-bottom">
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
