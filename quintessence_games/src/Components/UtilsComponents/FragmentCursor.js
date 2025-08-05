import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './FragmentCursor.css';

const FragmentCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const attachListeners = () => {
      // Use CSS selector to find interactive elements
      const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    const detachListeners = () => {
      const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Add event listeners to existing elements
    document.addEventListener('mousemove', updateMousePosition);
    
    // Initial attachment
    setTimeout(attachListeners, 100);
    
    // Watch for new elements being added to the DOM
    const observer = new MutationObserver(() => {
      detachListeners();
      attachListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      detachListeners();
      observer.disconnect();
    };
  }, []);

  // Generate cursor fragments
  const fragments = Array.from({ length: 4 }, (_, index) => {
    const angle = (index * 90) * (Math.PI / 180);
    const distance = isHovering ? 3 : 8;
    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;

    return (
      <motion.div
        key={index}
        style={{
          position: 'fixed',
          left: mousePosition.x + offsetX,
          top: mousePosition.y + offsetY,
        }}
        animate={{
          x: isHovering ? offsetX : offsetX * 2,
          y: isHovering ? offsetY : offsetY * 2,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <motion.div
          className={`cursor-fragment ${isHovering ? 'shaking' : ''}`}
          animate={{
            scale: isHovering ? 1.4 : 1.6,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        />
      </motion.div>
    );
  });

  return (
    <div className="fragment-cursor-container" aria-hidden="true">
      {fragments}
    </div>
  );
};

export default FragmentCursor;
