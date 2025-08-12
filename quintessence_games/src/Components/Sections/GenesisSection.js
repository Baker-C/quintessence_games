import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './GenesisSection.css';
import sectionsCopy from '../../Copy/sections';

const GenesisSection = () => {
  const { genesis } = sectionsCopy;
  const paintings = [
    '/art/paintings/POC_CorpoPaintingTemp5.PNG',
    '/art/paintings/POC_CorpoPaintingTemp6.PNG',
    '/art/paintings/POC_CorpoPaintingTemp8.PNG',
    '/art/paintings/POC_CorpoPaintingTemp9.PNG'
  ];
  // Cross-fade state (two layer approach)
  const [frontImage, setFrontImage] = useState(paintings[0]);
  const [backImage, setBackImage] = useState(paintings[1] || paintings[0]);
  const [isFrontActive, setIsFrontActive] = useState(true); // which layer currently visible
  const [frontVariant, setFrontVariant] = useState('drift-a');
  const [backVariant, setBackVariant] = useState('drift-b');
  const indexRef = useRef(1); // last index loaded (back layer initially)
  const timeoutRef = useRef(null);
  const isFrontActiveRef = useRef(true);

  // Durations (ms)
  const HOLD_MS = 5000; // full opacity hold time
  const FADE_MS = 2000; // matches CSS transition for smoother cross-fade

  useEffect(() => {
    if (paintings.length <= 1) return; // nothing to rotate

    const crossFade = () => {
      // Prepare next image on hidden layer
      const nextIndex = (indexRef.current + 1) % paintings.length;
      indexRef.current = nextIndex;
      const nextSrc = paintings[nextIndex];
      const nextVariant = (isFrontActiveRef.current ? frontVariant : backVariant) === 'drift-a' ? 'drift-b' : 'drift-a';
      if (isFrontActiveRef.current) {
        setBackImage(nextSrc);
        setBackVariant(nextVariant); // assign new direction to upcoming layer
      } else {
        setFrontImage(nextSrc);
        setFrontVariant(nextVariant);
      }
      // Trigger fade by swapping active flag (variants persist on fading layer)
      setIsFrontActive(prev => {
        const newVal = !prev;
        isFrontActiveRef.current = newVal;
        return newVal;
      });
      // Schedule next cycle after fade completes + hold
      timeoutRef.current = setTimeout(crossFade, HOLD_MS + FADE_MS);
    };

    // Initial schedule: hold then fade
    timeoutRef.current = setTimeout(crossFade, HOLD_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [paintings]);

  return (
    <section className="genesis-section section" id="genesis" aria-labelledby="genesis-heading">
      <div className="painting-bg-stack" aria-hidden="true">
        <div
          className={`painting-bg-layer ${isFrontActive ? 'active' : 'inactive'} ${frontVariant}`}
          style={{ backgroundImage: `url(${frontImage})` }}
        />
        <div
          className={`painting-bg-layer ${!isFrontActive ? 'active' : 'inactive'} ${backVariant}`}
          style={{ backgroundImage: `url(${backImage})` }}
        />
      </div>
      <div className="section-content">
        <div className="genesis-container">
        <motion.div
          className="subtitle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {genesis.subtitle}
        </motion.div>

        <motion.h2
          id="genesis-heading"
          className="genesis-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          {genesis.heading}
        </motion.h2>

        

          {/* Right side - Text */}
          <motion.div
            className="genesis-block"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {genesis.content.map((paragraph, index) => (
              <p key={index} className="section-text">
                {paragraph}
              </p>)
            )}
          </motion.div>
        </div>
        </div>
    </section>
  );
};

export default GenesisSection;
