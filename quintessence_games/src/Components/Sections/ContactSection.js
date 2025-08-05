import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactSection.css';
import sectionsCopy from '../../Copy/sections';

const ContactSection = () => {
  const { contact } = sectionsCopy;
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', { message });
    // Handle form submission
    setMessage('');
  };

  return (
    <section className="contact-section section" id="contact" aria-labelledby="contact-heading">
      <div className="section-content">
        <motion.h2
          id="contact-heading"
          className="section-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1 }}
        >
          {contact.heading}
        </motion.h2>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="form-group">
            <label htmlFor="message" className="visually-hidden">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={contact.placeholder}
              required
              rows={8}
            />
          </div>

          <button type="submit" className="submit-button">
            {contact.submit}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
