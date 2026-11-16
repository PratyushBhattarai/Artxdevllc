// src/pages/Services/sections/Process.jsx
import React from 'react';

// Edit process steps here
const STEPS = [
  { title: 'Discovery', desc: 'We discuss your goals, requirements and vision to create a detailed project plan.' },
  { title: 'Design', desc: 'Our team creates wireframes and designs that align with your brand and objectives.' },
  { title: 'Development', desc: 'We build your website using modern technologies and best practices for optimal performance.' },
  { title: 'Testing', desc: 'Rigorous testing across devices and browsers ensures everything works perfectly.' },
  { title: 'Launch', desc: 'We deploy your website and train you on how to manage and update content.' },
  { title: 'Support', desc: 'Ongoing maintenance and support to keep your website running smoothly.' },
];

const Process = () => {
  return (
    <section className="svc-process" id="process">
      <div className="svc-container">
        <div className="svc-head svc-reveal">
          <p className="svc-eyebrow">[ HOW WE WORK ]</p>
          <h2 className="svc-title">
            Our development <span className="svc-outline">process.</span>
          </h2>
          <p className="svc-sub">
            A streamlined approach that ensures quality results and client satisfaction.
          </p>
        </div>

        <div className="svc-steps svc-reveal">
          {STEPS.map((s, i) => (
            <div key={s.title} className="svc-step" style={{ '--d': `${300 + i * 180}ms` }}>
              <div className="svc-step-marker">
                <span className="svc-step-dot" />
              </div>
              <span className="svc-step-num">0{i + 1}</span>
              <h3 className="svc-step-title">{s.title}</h3>
              <p className="svc-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
