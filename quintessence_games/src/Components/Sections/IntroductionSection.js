import React from 'react';
import { motion } from 'framer-motion';
import './IntroductionSection.css';
import '../../Styles/background-pizzazz.css';
import sectionsCopy from '../../Copy/sections';



const IntroductionSection = () => {
  const { introduction } = sectionsCopy;

  return (
    <section className="introduction-section section light-ray-background" id="about" aria-labelledby="introduction-heading">
      <div className="section-content">
        <div className="content-layout">
          <div className="text-content">
            {introduction.content.map((paragraph, index) => (
              <motion.p
                key={index}
                className="section-text"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut" }}
              >
                {index === 0 ? (
                  <span style={{ fontWeight: 'bold', fontSize: '1.5em', fontStyle: 'italic' }}>
                    {paragraph}
                  </span>
                ) : (
                  paragraph
                )}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
