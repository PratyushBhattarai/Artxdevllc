// src/pages/About/About.jsx
import React, { useEffect, useRef } from 'react';
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
  const pageRef = useRef(null);

  // Scroll-reveal: any element with class "reveal" fades/slides in
  // when it enters the viewport.
  useEffect(() => {
    const els = pageRef.current?.querySelectorAll('.reveal') ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main ref={pageRef} className="about-page-wrapper">
      <AboutHero />
      <MissionVision />
      <Timeline />
      <WhyChooseUs />
      <Stats />
      <Companies />
      <Clients />
      <CTA />
    </main>
  );
};

export default About;
