import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeroSection from './Components/Hero/Hero';
import IntroductionSection from './Components/Sections/IntroductionSection';
import GenesisSection from './Components/Sections/GenesisSection';
import ValuesSection from './Components/Sections/ValuesSection';
import JoinTeamSection from './Components/Sections/JoinTeamSection';
import ApplicationForm from './Components/Sections/ApplicationForm';
import ConceptArtSection from './Components/Sections/ConceptArtSection';
import TeamSection from './Components/Sections/TeamSection';
import ContactSection from './Components/Sections/ContactSection';
import './App.css';

function App({ overlayComplete, onHeroComplete }) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const handleToggleApplication = () => {
    setShowApplicationForm(prev => !prev);
  };

  const handleCloseApplication = () => {
    setShowApplicationForm(false);
  };

  return (
    <div className="app-container">
      <HeroSection overlayComplete={overlayComplete} onHeroComplete={onHeroComplete} />
      <IntroductionSection />
  <GenesisSection />
  <TeamSection />
  <ValuesSection />
  <ConceptArtSection />
      <JoinTeamSection onApplyClick={handleToggleApplication} />
      {showApplicationForm && (
        <ApplicationForm onClose={handleCloseApplication} />
      )}
      <ContactSection />
    </div>
  );
}

App.propTypes = {
  overlayComplete: PropTypes.bool,
  onHeroComplete: PropTypes.func
};

export default App;
