// src/pages/Services/sections/TechStack.jsx
import React from 'react';

// Edit the tools/technologies shown in the scrolling rows
const ROW_1 = ['React', 'Next.js', 'Node.js', 'WordPress', 'Shopify', 'Tailwind CSS', 'Figma'];
const ROW_2 = ['Flutter', 'React Native', 'Python', 'OpenAI', 'Firebase', 'AWS', 'Google Analytics'];

const Row = ({ items, reverse }) => (
  <div className={`svc-tech-row${reverse ? ' is-reverse' : ''}`}>
    <div className="svc-tech-track">
      {[...items, ...items].map((t, i) => (
        <span key={i} className="svc-tech-item" aria-hidden={i >= items.length}>
          {t}
        </span>
      ))}
    </div>
  </div>
);

const TechStack = () => {
  return (
    <section className="svc-tech">
      <p className="svc-tech-label svc-reveal">Tools & technologies we build with</p>
      <Row items={ROW_1} />
      <Row items={ROW_2} reverse />
    </section>
  );
};

export default TechStack;
