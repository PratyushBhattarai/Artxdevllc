// src/pages/About/About.jsx
import React from 'react';
import './About.css';
import AboutHero from './sections/AboutHero';
import MissionVision from './sections/MissionVision';
import Timeline from './sections/Timeline';
import WhyChooseUs from './sections/WhyChooseUs';
import Stats from './sections/Stats';
import Companies from './sections/Companies';
import Clients from './sections/Clients';
import CTA from './sections/CTA';

const About = () => {
  return (
    <main  className="about-page-wrapper">
      <AboutHero />
      { <MissionVision /> }
      {<Timeline /> }
      {<WhyChooseUs /> }
      {<Stats /> }
      {<Companies /> }
      {<Clients /> }
      {<CTA /> }
    </main>
  );
};

export default About;