import React from 'react';
import { motion } from 'framer-motion';
import './ValuesSection.css';
import sectionsCopy from '../../Copy/sections';

const ValuesSection = () => {
  const { values } = sectionsCopy;

  return (
    <section className="values-section section" id="values" aria-labelledby="values-heading">
      <div className="section-content">
        <div className="content-layout">
          <div className="text-content">
            <motion.div
              className="subtitle"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4 }}
            >
              {values.subtitle}
            </motion.div>

            <motion.h2
              id="values-heading"
              className="values-heading"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {values.heading}
            </motion.h2>

            <motion.div
              className="values-block"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {values.content.map((paragraph, index) => (
                <p key={index} className="section-text">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
