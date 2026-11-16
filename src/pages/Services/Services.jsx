// src/pages/Services/Services.jsx
import React, { useEffect, useRef } from 'react';
import './Services.css';
import ServicesHero from './sections/ServicesHero';
import CoreServices from './sections/CoreServices';
import Packages from './sections/Packages';
import AddOns from './sections/AddOns';
import Process from './sections/Process';
import TechStack from './sections/TechStack';
import ServicesCTA from './sections/ServicesCTA';

const Services = () => {
  const pageRef = useRef(null);

  // Scroll-reveal: any element with class "svc-reveal" animates in
  // when it enters the viewport.
  useEffect(() => {
    const els = pageRef.current?.querySelectorAll('.svc-reveal') ?? [];
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
    <main ref={pageRef} className="svc-page">
      <ServicesHero />
      <CoreServices />
      <Packages />
      <AddOns />
      <Process />
      <TechStack />
      <ServicesCTA />
    </main>
  );
};

export default Services;
