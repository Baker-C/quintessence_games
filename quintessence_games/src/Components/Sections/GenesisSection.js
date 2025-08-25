import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import '../../Styles/painting-bg.css';
import '../../Styles/information-section.css';
import sectionsCopy from '../../Copy/sections';

const GenesisSection = () => {
  const { genesis } = sectionsCopy;
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
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (paintings.length <= 1) return;
    const crossFade = () => {
      const nextIndex = (indexRef.current + 1) % paintings.length;
      indexRef.current = nextIndex;
      const nextSrc = paintings[nextIndex];
      const nextVariant = isFrontActive ? 'drift-b' : 'drift-a';
      if (isFrontActive) {
        setBackImage(nextSrc);
        setBackVariant(nextVariant);
      } else {
        setFrontImage(nextSrc);
        setFrontVariant(nextVariant);
      }
      setIsFrontActive((prev) => !prev);
      timeoutRef.current = setTimeout(crossFade, 7000);
    };
    timeoutRef.current = setTimeout(crossFade, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [paintings, isFrontActive]);

  return (
    <section className="information-section" id="genesis" aria-labelledby="genesis-heading">
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
      <div className="information-container">
        <motion.h2
          id="information-heading"
          className="information-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {genesis.heading}
        </motion.h2>

        <motion.div
          className="subtitle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
        >
          {genesis.subtitle}
        </motion.div>

        <div className="information-block">
          {genesis.content.map((paragraph, index) => (
            <motion.p
              key={index}
              className="section-text"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: index * 0.3, ease: 'easeOut' }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenesisSection;
