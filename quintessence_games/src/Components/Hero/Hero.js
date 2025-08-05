import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import heroCopy from '../../Copy/hero.js';

const Hero = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [titleLetters, setTitleLetters] = useState([]);
  const [showContinueButton, setShowContinueButton] = useState(false);

  useEffect(() => {
    // Generate random positions for each letter
    const letters = heroCopy.companyName.split('').map((letter, index) => ({
      letter,
      id: index,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setTitleLetters(letters);
    
    // Show title after flickering animation
    setTimeout(() => setShowTitle(true), 1500);
  }, []);

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
      const scrollProgress = scrolledPast / (containerHeight - viewportHeight);
      
      // Show continue button when 75% through the container
      setShowContinueButton(scrollProgress >= 0.75);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-container">
      <motion.div
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      {/* Scattered letters */}
      <div className="scattered-letters" aria-hidden="true">
        {titleLetters.map((letterObj) => (
          <motion.span
            key={letterObj.id}
            className="scattered-letter"
            initial={{
              x: letterObj.x,
              y: letterObj.y,
              opacity: 0
            }}
            animate={{
              x: showTitle ? 0 : letterObj.x,
              y: showTitle ? 0 : letterObj.y,
              opacity: [0, 1, 0, 1, 0, 1],
            }}
            transition={{
              opacity: {
                duration: 0.1,
                repeat: 5,
                times: [0, 0.16, 0.33, 0.5, 0.66, 1]
              },
              x: showTitle ? { duration: 1, delay: 0.5, ease: "easeOut" } : {},
              y: showTitle ? { duration: 1, delay: 0.5, ease: "easeOut" } : {}
            }}
            style={{
              position: showTitle ? 'relative' : 'absolute',
              display: showTitle ? 'inline' : 'block'
            }}
          >
            {letterObj.letter === ' ' ? '\u00A0' : letterObj.letter}
          </motion.span>
        ))}
      </div>

      {/* Final title */}
      {showTitle && (
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <span className="visually-hidden">{heroCopy.companyName}</span>
          <span aria-hidden="true" className="scattered-letters"></span>
        </motion.h1>
      )}

      {/* Visual elements that slide in on scroll */}
      <motion.div
        className="visual-elements"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="visual-element left"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.div
          className="visual-element right"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
        />
      </motion.div>

      {/* Tagline at bottom right */}
      <motion.div
        className="hero-tagline"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <p className="tagline-text">{heroCopy.tagline}</p>
      </motion.div>

      {showContinueButton && (
        <motion.button
          className="continue-button"
          onClick={scrollToNextSection}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
          aria-label="Continue to next section"
        >
          ↓
        </motion.button>
      )}
      </motion.div>
    </div>
  );
};

export default Hero;
