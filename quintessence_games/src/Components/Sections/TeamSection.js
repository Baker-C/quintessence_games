import React from 'react';
import { motion } from 'framer-motion';
import './TeamSection.css';
import sectionsCopy from '../../Copy/sections';

const TeamSection = () => {
  const { team } = sectionsCopy;

  return (
    <section className="team-section section" id="team" aria-labelledby="team-heading">
      <div className="section-content">
        <motion.h2
          id="team-heading"
          className="section-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1 }}
        >
          {team.heading}
        </motion.h2>

        <div className="team-grid">
          {team.members.map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="member-image" aria-label={member.imageAlt}>
                <div className="image-placeholder">
                  <span className="member-initials">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              
              <div className="member-info">
                <h3 className="member-role">{member.role}</h3>
                <p className="member-bio">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
