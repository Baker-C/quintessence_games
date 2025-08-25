import React from 'react';
import { motion } from 'framer-motion';
import './TeamSection.css';
import '../../Styles/background-pizzazz.css';
import sectionsCopy from '../../Copy/sections';

const TeamSection = () => {
  const { team } = sectionsCopy;
  return (
    <section className="team-section section light-ray-background" id="team" aria-labelledby="team-heading">
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

        {/* Founders Section */}
        <motion.h3
          className="subsection-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {team.foundersHeading}
        </motion.h3>

        <div className="team-grid founders-grid">
          {team.founders.map((founder, index) => (
            <motion.div
              key={index}
              className="team-card founder-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="member-image" aria-label={founder.imageAlt}>
                <div className="image-placeholder">
                  <span className="member-initials">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="member-info">
                <h4 className="member-name">{founder.name}</h4>
                <h5 className="member-role">{founder.role}</h5>
                <p className="member-bio">
                  {founder.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Members Section */}
        <motion.h3
          className="subsection-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Team Members
        </motion.h3>

        <div className="team-grid members-grid">
          {team.members.map((member, index) => (
            <motion.div
              key={index}
              className="team-card member-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="member-info">
                <h4 className="member-name">{member.name}</h4>
                <h5 className="member-role">{member.role}</h5>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
