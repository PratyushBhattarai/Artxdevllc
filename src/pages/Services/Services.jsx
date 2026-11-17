// src/pages/Services/Services.jsx
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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

  // Jump to a section when the URL has a #hash (e.g. links from the navbar
  // dropdown like /services#web-apps). Runs after ScrollToTop's jump to top.
  const location = useLocation();
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return undefined;
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const isService = el.classList.contains('svc-core-row');
      el.scrollIntoView({ behavior: 'smooth', block: isService ? 'center' : 'start' });
      // Make sure the row has faded in. (The service itself is opened and highlighted
      // by CoreServices, so no extra flash effect is needed here.)
      if (isService) el.closest('.svc-reveal')?.classList.add('is-visible');
    }, 80);
    return () => clearTimeout(timer);
  }, [location.key, location.hash]);

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
