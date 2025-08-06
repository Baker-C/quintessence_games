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
          <div className="text-content">
            <motion.div
              className="introduction-block"
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
