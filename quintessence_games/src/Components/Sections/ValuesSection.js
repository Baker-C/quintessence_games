import React from 'react';
import { motion } from 'framer-motion';
import './ValuesSection.css';
import sectionsCopy from '../../Copy/sections';

const ValuesSection = () => {
  const { values } = sectionsCopy;

  return (
    <section className="values-section section" id="values" aria-labelledby="values-heading">
      <div className="section-content">
        <div className="values-container">
          <motion.h2
            id="values-heading"
            className="values-heading"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
          >
            {values.heading}
          </motion.h2>

          <motion.div
            className="values-text-block"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <p className="values-text">
              {values.content}
            </p>
          </motion.div>

          {/* Decorative elements */}
          <div className="values-decoration" aria-hidden="true">
            <motion.div
              className="decoration-line decoration-line-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.75, delay: 0.4 }}
            />
            <motion.div
              className="decoration-line decoration-line-2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.75, delay: 0.6 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
