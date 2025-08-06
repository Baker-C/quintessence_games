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
          className="subtitle genesis-align"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {genesis.subtitle}
        </motion.div>

        <motion.h2
          id="genesis-heading"
          className="genesis-heading genesis-align"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          {genesis.heading}
        </motion.h2>

        

          {/* Right side - Text */}
          <motion.div
            className="genesis-block genesis-align"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {genesis.content.map((paragraph, index) => (
              <p key={index} className="section-text">
                {paragraph}
              </p>)
            )}
          </motion.div>
        </div>
    </section>
  );
};

export default GenesisSection;
