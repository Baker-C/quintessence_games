import React from 'react';
import { motion } from 'framer-motion';
import './ConceptArtSection.css';

const ConceptArtSection = () => {
  const conceptArt = [
    { id: 1, title: 'Character Study', category: 'Character Design', image: '/art/character_study.jpg' },
    { id: 2, title: 'Environment Concept', category: 'Environment Art', image: '/art/Amarock4.jpg' },
    { id: 3, title: 'Mood Board', category: 'Visual Development', image: '/art/mood_board.png' },
    { id: 4, title: 'Creature Design', category: 'Character Design', image: '/art/creature_design.jpg', fallback: '/art/creature_deisgn.png' },
    { id: 5, title: 'Architecture Study', category: 'Environment Art', image: '/art/Amarock4.jpg' }, // Re-using until dedicated asset exists
    { id: 6, title: 'Color Script', category: 'Visual Development', image: '/art/mood_board.png' } // Re-using until dedicated asset exists
  ];

  return (
    <section className="concept-art-section section" id="concept-art" aria-labelledby="concept-art-heading">
      <div className="section-content">
        <motion.h2
          id="concept-art-heading"
          className="section-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1 }}
        >
          Concept Art Preview
        </motion.h2>

        <div className="concept-grid">
          {conceptArt.map((art, index) => (
            <motion.div
              key={art.id}
              className="concept-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`concept-thumbnail ${art.image ? 'has-image' : ''}`}
                style={art.image ? { backgroundImage: `url(${art.image})` } : undefined}
                aria-label={`${art.title} – ${art.category}`}
                role="img"
              >
                <div className="concept-overlay" />
                <div className="placeholder-content">
                  <span className="concept-title">{art.title}</span>
                  <span className="concept-category">{art.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConceptArtSection;
