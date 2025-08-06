import React from 'react';
import { motion } from 'framer-motion';
import './IntroductionSection.css';
import sectionsCopy from '../../Copy/sections';

const IntroductionSection = () => {
  const { introduction } = sectionsCopy;

  return (
    <section className="introduction-section section" id="about" aria-labelledby="introduction-heading">
      <div className="section-content">
        <div className="content-layout">
          {/* Background fog animation */}
          <div className="fog-background" aria-hidden="true">
            <motion.div
              className="fog-layer fog-1"
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="fog-layer fog-2"
              animate={{
                x: [0, -25, 0],
                y: [0, 15, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 5
              }}
            />
            <motion.div
              className="fog-layer fog-3"
              animate={{
                x: [0, 20, 0],
                y: [0, -10, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 10
              }}
            />
          </div>

          <div className="text-content">
            <motion.div
              className="paragraph-block"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {introduction.content.map((paragraph, index) => (
                <p key={index} className="section-text">
                  {
                    (index == 0) ? 
                    <p style={{ fontWeight: 'bold', fontSize: '1.5em', fontStyle: 'italic' }}>
                      {paragraph}
                    </p> : 
                    paragraph
                  }
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
