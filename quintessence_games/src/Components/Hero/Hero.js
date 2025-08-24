import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Hero.css';
import heroCopy from '../../Copy/hero.js';

const generateTitleLetters = () => {
  const wordOneLetters = heroCopy.titleWordOne.split('').map((letter, index) => ({
    word: 1,
    letter,
    id: `w1-${index}`,
    offsetY: Math.random() > 0.5 
      ? 5 + Math.random() * 27.5
      : -5 - Math.random() * 27.5,
    offsetX: (Math.random() - 0.5) * 180
  }));

  const wordTwoLetters = heroCopy.titleWordTwo.split('').map((letter, index) => ({
    word: 2,
    letter,
    id: `w2-${index}`,
    offsetY: Math.random() > 0.5 
      ? 5 + Math.random() * 27.5
      : -5 - Math.random() * 27.5,
    offsetX: (Math.random() - 0.5) * 180
  }));

  return [...wordOneLetters, ...wordTwoLetters];
};

const Hero = ({ overlayComplete, onHeroComplete }) => {
  const [convergenceProgress, setConvergenceProgress] = useState(0); // 0 to 1 over 5s
  const [hasConverged, setHasConverged] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const titleLettersRef = useRef(generateTitleLetters());
  const hasCalledHeroComplete = useRef(false);
  const heroCompleteCallbackRef = useRef(onHeroComplete);
  const animationStartedRef = useRef(false);
  useEffect(() => { heroCompleteCallbackRef.current = onHeroComplete; }, [onHeroComplete]);

  // Timer-based convergence progress (0 → 1 over 5s) starts only after content is shown
  useEffect(() => {
    if (!showContent) return; // wait for overlay/content
    if (hasConverged) return; // do not restart after finish
    if (animationStartedRef.current) return; // already scheduled

    let start = null;
    let frame;
    const duration = 5000;
    const delay = 2500;
    animationStartedRef.current = true; // optimistic set; may be reset in cleanup under StrictMode
    console.log('[Hero] Scheduling convergence animation');
    const delayTimeout = setTimeout(() => {
      // Ease in-out function (cubic)
      const easeInOut = (t) => t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const linearProgress = Math.min(1, elapsed / duration);
        const progress = easeInOut(linearProgress);
        setConvergenceProgress(progress);
        if (linearProgress < 1) {
          frame = requestAnimationFrame(step);
        } else {
          setConvergenceProgress(1);
          setHasConverged(true);
          if (heroCompleteCallbackRef.current && !hasCalledHeroComplete.current) {
            heroCompleteCallbackRef.current();
            hasCalledHeroComplete.current = true;
          }
        }
      };
      frame = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
      cancelAnimationFrame(frame);
      // In StrictMode mount cycle, allow second effect pass to reschedule
      if (!hasConverged) {
        animationStartedRef.current = false;
      }
    };
  }, [showContent, hasConverged]);

  // Trigger animations when overlay is complete
  useEffect(() => {
    if (overlayComplete) {
      setTimeout(() => {
        setShowContent(true);
      }, 600);
    }
    console.log(`Overlay complete: ${overlayComplete}`);
  }, [overlayComplete]);

  // Show continue arrow button after convergence
  useEffect(() => {
    if (hasConverged) {
      setShowContinueButton(true);
    }
  }, [hasConverged]);

  const handleContinueClick = () => {
    // Always scroll to the information section
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
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
            transform: `translate(-50%, -50%) scale(${0.1 + convergenceProgress * 0.9})`, // Start at 10% scale, grow to 100% at end
          }}
        />
        <div className="title-container">
          <div className="title-letters-wrapper word-one">
          {titleLettersRef.current.filter(l => l.word === 1).map((letterObj) => {
            const opacity = 0.4 + (convergenceProgress * 0.6);
            const atRest = hasConverged || convergenceProgress >= 1;
            const transform = atRest
              ? 'translate(0,0)'
              : `translate(${letterObj.offsetX * (1 - convergenceProgress)}px, ${letterObj.offsetY * (1 - convergenceProgress)}vh)`;
            return (
              <motion.span
                key={letterObj.id}
                className={`title-letter ${hasConverged ? 'glitch' : ''}`}
                style={{ transform, opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeInOut', delay: Math.random() * 2 }}
              >
                {hasConverged ? (
                  Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className="line">
                      {letterObj.letter === ' ' ? '\u00A0' : letterObj.letter}
                    </span>
                  ))
                ) : (
                  letterObj.letter === ' ' ? '\u00A0' : letterObj.letter
                )}
              </motion.span>
            );
          })}
          </div>
          <div className="title-letters-wrapper word-two">
          {titleLettersRef.current.filter(l => l.word === 2).map((letterObj) => {
            const opacity = 0.4 + (convergenceProgress * 0.6);
            const atRest = hasConverged || convergenceProgress >= 1;
            const transform = atRest
              ? 'translate(0,0)'
              : `translate(${letterObj.offsetX * (1 - convergenceProgress)}px, ${letterObj.offsetY * (1 - convergenceProgress)}vh)`;
            return (
              <motion.span
                key={letterObj.id}
                className={`title-letter ${hasConverged ? 'glitch' : ''}`}
                style={{ transform, opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeInOut', delay: Math.random() * 2 }}
              >
                {hasConverged ? (
                  Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className="line">
                      {letterObj.letter === ' ' ? '\u00A0' : letterObj.letter}
                    </span>
                  ))
                ) : (
                  letterObj.letter === ' ' ? '\u00A0' : letterObj.letter
                )}
              </motion.span>
            );
          })}
          </div>
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
          aria-label="Continue to information section"
        >
          ↓
        </motion.button>
      )}
      </motion.div>}
    </div>
  );
};

Hero.propTypes = {
  overlayComplete: PropTypes.bool,
  onHeroComplete: PropTypes.func
};

export default Hero;
