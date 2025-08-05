import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Layout.css';
import Navigation from '../Components/Navigation/Navigation';
import FragmentCursor from '../Components/UtilsComponents/FragmentCursor';
import InitialOverlay from '../Components/InitialOverlay/InitialOverlay';

const Layout = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  const handleOverlayComplete = () => {
    console.log('Overlay complete - hiding overlay');
  };

  return (
    <div className="layout-container" data-sound-enabled={isSoundEnabled}>
      <InitialOverlay onComplete={handleOverlayComplete} />
      <FragmentCursor />

      <Navigation 
        isSoundEnabled={isSoundEnabled}
        onSoundToggle={toggleSound}
      />
      
      <main className="main-content" role="main">
        {children}
      </main>
      
      <footer className="footer-container" role="contentinfo">
        <div className="footer-content">
          <span>Privacy</span>
          <span>·</span>
          <span>Terms and Conditions</span>
          <span>·</span>
          <span>© 2025 Quintessence Games LLC</span>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
