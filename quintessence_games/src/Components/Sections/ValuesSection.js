import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './ValuesSection.css';
import sectionsCopy from '../../Copy/sections';

const ValuesSection = () => {
  const { values } = sectionsCopy;
  // Painting rotation (shared asset pool with genesis for consistency)
  const paintings = [
    '/art/paintings/POC_CorpoPaintingTemp5.PNG',
    '/art/paintings/POC_CorpoPaintingTemp6.PNG',
    '/art/paintings/POC_CorpoPaintingTemp8.PNG',
    '/art/paintings/POC_CorpoPaintingTemp9.PNG'
  ];
  const [frontImage, setFrontImage] = useState(paintings[0]);
  const [backImage, setBackImage] = useState(paintings[1] || paintings[0]);
  const [isFrontActive, setIsFrontActive] = useState(true);
  const [frontVariant, setFrontVariant] = useState('drift-a');
  const [backVariant, setBackVariant] = useState('drift-b');
  const indexRef = useRef(1);
  const isFrontActiveRef = useRef(true);
  const timeoutRef = useRef(null);
  const HOLD_MS = 5000;
  const FADE_MS = 2000;

  useEffect(() => {
    if (paintings.length <= 1) return;
    const crossFade = () => {
      const nextIndex = (indexRef.current + 1) % paintings.length;
      indexRef.current = nextIndex;
      const nextSrc = paintings[nextIndex];
      const nextVariant = (isFrontActiveRef.current ? frontVariant : backVariant) === 'drift-a' ? 'drift-b' : 'drift-a';
      if (isFrontActiveRef.current) {
        setBackImage(nextSrc);
        setBackVariant(nextVariant);
      } else {
        setFrontImage(nextSrc);
        setFrontVariant(nextVariant);
      }
      setIsFrontActive(prev => {
        const newVal = !prev;
        isFrontActiveRef.current = newVal;
        return newVal;
      });
      timeoutRef.current = setTimeout(crossFade, HOLD_MS + FADE_MS);
    };
    timeoutRef.current = setTimeout(crossFade, HOLD_MS);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [paintings, frontVariant, backVariant]);

  return (
    <section className="values-section section" id="values" aria-labelledby="values-heading">
      <div className="values-painting-bg-stack" aria-hidden="true">
        <div className={`values-painting-layer ${isFrontActive ? 'active' : 'inactive'} ${frontVariant}`} style={{ backgroundImage: `url(${frontImage})` }} />
        <div className={`values-painting-layer ${!isFrontActive ? 'active' : 'inactive'} ${backVariant}`} style={{ backgroundImage: `url(${backImage})` }} />
      </div>
      <div className="section-content">
        <div className="content-layout">
          <div className="text-content">
            <motion.div
              className="subtitle"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4 }}
            >
              {values.subtitle}
            </motion.div>

            <motion.h2
              id="values-heading"
              className="values-heading"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {values.heading}
            </motion.h2>

            <motion.div
              className="values-block"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {values.content.map((paragraph, index) => (
                <p key={index} className="section-text">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
