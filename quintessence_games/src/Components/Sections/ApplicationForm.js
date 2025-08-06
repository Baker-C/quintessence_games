import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './ApplicationForm.css';

const ApplicationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobRole: '',
    portfolioUrl: '',
    resume: null,
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  return (
    <section className="application-section section" id="application" aria-labelledby="application-heading">
      <div className="section-content">
        <motion.h2
          id="application-heading"
          className="section-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1 }}
        >
          Apply Now
        </motion.h2>

        <motion.form
          className="application-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="jobRole">Job Role *</label>
            <input
              type="text"
              id="jobRole"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleInputChange}
              required
              placeholder="e.g., Senior Narrative Designer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="portfolioUrl">Portfolio URL</label>
            <input
              type="url"
              id="portfolioUrl"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleInputChange}
              placeholder="https://yourportfolio.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="resume">Resume Upload *</label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleInputChange}
              accept=".pdf,.doc,.docx"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
              />
              <span className="checkmark"></span>
              I agree to the Terms & Conditions *
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Submit Application
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

ApplicationForm.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ApplicationForm;
