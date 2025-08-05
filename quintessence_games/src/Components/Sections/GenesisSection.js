import React from 'react';
import { motion } from 'framer-motion';
import './GenesisSection.css';
import sectionsCopy from '../../Copy/sections';

const GenesisSection = () => {
  const { genesis } = sectionsCopy;

  return (
    <section className="genesis-section section" id="genesis" aria-labelledby="genesis-heading">
      <div className="section-content">
        <motion.div
          className="subtitle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {genesis.subtitle}
        </motion.div>

        <motion.h2
          id="genesis-heading"
          className="section-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          {genesis.heading}
        </motion.h2>

        <div className="split-layout">
          {/* Left side - Image */}
          <motion.div
            className="image-container"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Static overlay effect */}
            <div className="static-overlay" aria-hidden="true">
              <div className="static-line"></div>
              <div className="static-line"></div>
              <div className="static-line"></div>
            </div>
            
            {/* Placeholder for apartment image */}
            <div className="apartment-image" role="img" aria-label={genesis.imageAlt}>
              <div className="image-placeholder">
                <motion.div
                  className="placeholder-text"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Corpus Christi Apartment
                  <br />
                  <span className="placeholder-subtext">Where it all began</span>
                </motion.div>
              </div>
            </div>

            {/* VHS-style border */}
            <div className="vhs-border" aria-hidden="true"></div>
          </motion.div>

          {/* Right side - Text */}
          <motion.div
            className="text-container"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="genesis-text">
              {genesis.content}
            </p>
          </motion.div>
        </div>

        {/* Background TV static effect */}
        <div className="tv-static-bg" aria-hidden="true">
          <motion.div
            className="static-noise"
            animate={{
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default GenesisSection;
