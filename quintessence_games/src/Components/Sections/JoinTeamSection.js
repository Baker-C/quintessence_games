import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './JoinTeamSection.css';
import sectionsCopy from '../../Copy/sections';

const JoinTeamSection = ({ onApplyClick }) => {
  const { joinTeam } = sectionsCopy;

  // Mock job data
  const mockJobs = [
    { title: 'Senior Narrative Designer', location: 'Remote', department: 'narrative' },
    { title: '3D Environment Artist', location: 'Austin, TX', department: 'art' },
    { title: 'Frontend Developer', location: 'Remote', department: 'engineering' },
    { title: 'UI/UX Designer', location: 'Remote', department: 'design' },
    { title: 'Technical Artist', location: 'Austin, TX', department: 'art' },
    { title: 'Backend Engineer', location: 'Remote', department: 'engineering' }
  ];

  return (
    <section className="join-team-section section" id="jobs" aria-labelledby="join-team-heading">
      <div className="section-content">
        <motion.h2
          id="join-team-heading"
          className="section-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          {joinTeam.heading}
        </motion.h2>

        <motion.p
          className="section-description"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {joinTeam.content}
        </motion.p>

        <div className="jobs-list">
          {mockJobs.map((job, index) => (
            <motion.div
              key={index}
              className="job-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="job-content">
                <span className="job-title">{job.title}</span>
                <span className="job-location">{job.location}</span>
              </div>
              <div className="job-divider"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="cta-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button 
            className="apply-cta-button"
            onClick={onApplyClick}
            aria-label="Apply for positions at Quintessence Games"
          >
            {joinTeam.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

JoinTeamSection.propTypes = {
  onApplyClick: PropTypes.func.isRequired
};

export default JoinTeamSection;
