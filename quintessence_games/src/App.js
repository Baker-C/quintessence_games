import React, { useState } from 'react';
import HeroSection from './Components/Hero/Hero';
import GamesForSoulSection from './Components/Sections/GamesForSoulSection';
import GenesisSection from './Components/Sections/GenesisSection';
import ValuesSection from './Components/Sections/ValuesSection';
import JoinTeamSection from './Components/Sections/JoinTeamSection';
import ApplicationForm from './Components/Sections/ApplicationForm';
import ConceptArtSection from './Components/Sections/ConceptArtSection';
import TeamSection from './Components/Sections/TeamSection';
import ContactSection from './Components/Sections/ContactSection';
import './App.css';

function App() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const handleOpenApplication = () => {
    setShowApplicationForm(true);
  };

  const handleCloseApplication = () => {
    setShowApplicationForm(false);
  };

  return (
    <div className="app-container">
      <HeroSection />
      <GamesForSoulSection />
      <GenesisSection />
      <ValuesSection />
      <TeamSection />
      <JoinTeamSection onApplyClick={handleOpenApplication} />
      <ConceptArtSection />
      <ContactSection />
      
      {showApplicationForm && (
        <ApplicationForm onClose={handleCloseApplication} />
      )}
    </div>
  );
}

export default App;
