import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Hero.css';
import heroCopy from '../../Copy/hero.js';

const Hero = ({ overlayComplete }) => {
  const [titleLetters, setTitleLetters] = useState([]);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isAtThreeQuarters, setIsAtThreeQuarters] = useState(false);


  useEffect(() => {
    // Generate random offsets for each letter
    const letters = heroCopy.companyName.split('').map((letter, index) => ({
      letter,
      id: index,
      offsetY: Math.random() > 0.5 
        ? 5 + Math.random() * 27.5  // Random value between 5vh and 32.5vh (positive)
        : -5 - Math.random() * 27.5, // Random value between -5vh and -32.5vh (negative)
      offsetX: (Math.random() - 0.5) * 180 // Random value between -90px and 90px
    }));
    setTitleLetters(letters);
  }, []);

  // Trigger welcome animation when overlay is complete
  useEffect(() => {
    if (overlayComplete) {
      setTimeout(() => {
        setShowContent(true);
        setShowContinueButton(true); // Show button when content shows
        console.log('Content and button should now be visible');
      }, 600);
    }
    console.log(`Overlay complete: ${overlayComplete}`);
  }, [overlayComplete]);

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero container element
      const heroContainer = document.querySelector('.hero-container');
      if (!heroContainer) return;

      // Calculate scroll progress through the hero container
      const containerRect = heroContainer.getBoundingClientRect();
      const containerHeight = heroContainer.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the container has been scrolled past
      const scrolledPast = Math.max(0, -containerRect.top);
      const progress = Math.min(1, scrolledPast / (containerHeight - viewportHeight));
      setScrollProgress(progress);
      
      // Update three-quarters state
      setIsAtThreeQuarters(progress >= 0.75);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContinueClick = () => {
    if (isAtThreeQuarters) {
      // If already at 3/4, scroll to the information section
      const nextSection = document.getElementById('about');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not at 3/4, scroll to 3/4 of hero section
      scrollToHeroThreeQuarters();
    }
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHeroThreeQuarters = () => {
    const heroSection = document.querySelector('.hero-container');
    if (heroSection) {
      const heroHeight = heroSection.offsetHeight;
      const viewportHeight = window.innerHeight;
      // Calculate 3/4ths through the hero section
      const threeQuartersPosition = (heroHeight - viewportHeight) * 0.75;
      window.scrollTo({ 
        top: threeQuartersPosition, 
        behavior: 'smooth' 
      });
    }
  };


  return (
    <div className="hero-container">
      {showContent && <motion.div
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >

      {/* Welcome */}
      <motion.button 
        className="welcome-button"
        onClick={scrollToHeroThreeQuarters}
        aria-label="Quintessence Games - Return to top"
        initial={{ opacity: 0, width: "0%" }}
        animate={{ opacity: 1, width: "fit-content" }}
        transition={{ 
          duration: 2,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="welcome-text">
          Welcome to QGstudios
        </div>
      </motion.button>

      {/* Scroll-based title animation */}
      <div className="hero-title-container">
        {/* Growing square background */}
        <motion.div
          className="growing-square"
          style={{
            transform: `translate(-50%, -50%) scale(${0.1 + (scrollProgress / 0.75) * 0.9})`, // Start at 10% scale, grow to 100% at 75% scroll
          }}
        />
        
        <div className="title-letters-wrapper">
          {titleLetters.map((letterObj) => {
            // Calculate progress that reaches full convergence at 75% scroll
            const convergenceProgress = Math.min(1, scrollProgress / 0.75);
            const hasConverged = convergenceProgress >= 1;
            
            // Calculate opacity: starts at 40% (0.4) and reaches 100% (1.0) as user scrolls
            const opacity = 0.4 + (scrollProgress * 0.6);
            
            return (
              <motion.span
                key={letterObj.id}
                className={`title-letter ${hasConverged ? 'glitch' : ''}`}
                style={{
                  transform: `translate(${letterObj.offsetX * (1 - convergenceProgress)}px, ${letterObj.offsetY * (1 - convergenceProgress)}vh)`, // Letters converge at 75% scroll progress
                  opacity: opacity
                }}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ 
                  duration: 1,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              >
                {hasConverged ? (
                  // Create multiple lines for glitch effect when converged
                  Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className="line">
                      {letterObj.letter === ' ' ? '\u00A0' : letterObj.letter}
                    </span>
                  ))
                ) : (
                  // Normal letter display during convergence
                  letterObj.letter === ' ' ? '\u00A0' : letterObj.letter
                )}
              </motion.span>
            );
          })}
        </div>
      </div>

      {/* Tagline at bottom right */}
      <motion.div
        className="hero-tagline"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 2, 
          delay: .7
        }}
      >
        <p className="tagline-text">{heroCopy.tagline}</p>
      </motion.div>

      {showContinueButton && (
        <motion.button
          className={`continue-button bobbing`}
          onClick={handleContinueClick}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 3.5 }}
          whileHover={{ y: -5 }}
          aria-label={isAtThreeQuarters ? "Continue to information section" : "Scroll down in hero section"}
        >
          ↓
        </motion.button>
      )}
      </motion.div>}
    </div>
  );
};

Hero.propTypes = {
  overlayComplete: PropTypes.bool
};

export default Hero;
