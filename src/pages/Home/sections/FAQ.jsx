// src/pages/Home/sections/FAQ.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

// ==========================================
// 🔴 ADD YOUR QUESTIONS AND ANSWERS HERE 🔴
// ==========================================
const faqs = [
  {
    question: 'What services does ARTX DEV offer?',
    answer: 'We offer a wide range of digital services including Website Design, Web Development, Web Apps, Mobile Applications, Marketing, and AI Automation.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'The timeline depends on the complexity of the project. A standard website might take 4-6 weeks, while a complex web app can take 3-6 months.'
  },
  {
    question: 'Do you provide support after the project is launched?',
    answer: 'Yes! We provide ongoing support and maintenance packages to ensure your product stays fast, secure, and up-to-date.'
  },
  {
    question: 'What is your pricing model?',
    answer: 'We usually work on a fixed-price model based on the project scope, or a monthly retainer for ongoing development and marketing services.'
  },
  // Add more objects here like:
  // { question: 'Your new question?', answer: 'Your new answer.' },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="faq-outer">
      <section className="faq-section">
        <div className="faq-glow" aria-hidden="true" />

        <p className="ax-eyebrow" data-reveal="up">Got questions?</p>
        <h2 className="faq-title" data-reveal="up" style={{ '--d': '0.08s' }}>FAQ</h2>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} data-reveal="up" style={{ '--d': `${0.1 + index * 0.08}s` }}>
                <div className={`faq-item${isOpen ? ' is-open' : ''}`}>

                  {/* Question Row */}
                  <button
                    type="button"
                    id={`faq-q-${index}`}
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${index}`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="faq-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="faq-q-text">{faq.question}</span>
                    <span className="faq-icon" aria-hidden="true"><span /><span /></span>
                  </button>

                  {/* Answer Row – smooth height for any answer length */}
                  <div id={`faq-a-${index}`} className="faq-a" role="region" aria-labelledby={`faq-q-${index}`}>
                    <div className="faq-a-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-cta" data-reveal="up">
          <p>Still have questions?</p>
          <Link to="/contact" className="ax-btn ax-btn--outline">
            Talk to us <span className="ax-btn-arrow">→︎</span>
          </Link>
        </div>

        <style>{`
          .faq-outer { background: #FFFFFF; padding: 0 0.15rem; }
          .faq-section {
            position: relative; background: #000000; padding: 2rem 5% 5rem;
            display: flex; flex-direction: column; align-items: center; overflow: hidden;
          }
          .faq-glow {
            position: absolute; top: -220px; left: 50%; width: 760px; height: 440px;
            transform: translateX(-50%); border-radius: 50%; pointer-events: none;
            background: radial-gradient(ellipse, rgba(0,163,255,0.14), transparent 70%);
            animation: faqBreath 6s ease-in-out infinite;
          }

          .faq-title {
            position: relative; color: #FFFFFF; font-family: 'Inknut Antiqua', serif;
            font-size: 3.5rem; font-weight: 400; margin: 0 0 2rem; text-align: center;
          }

          .faq-list { position: relative; width: 100%; max-width: 1000px; display: flex; flex-direction: column; }

          .faq-item { position: relative; border-bottom: 1px solid rgba(192,192,192,0.35); }
          /* Blue line draws along the bottom on hover / open */
          .faq-item::after {
            content: ''; position: absolute; left: 0; bottom: -1px; width: 100%; height: 1px;
            background: linear-gradient(90deg, #00A3FF, rgba(0,163,255,0));
            transform: scaleX(0); transform-origin: left;
            transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .faq-item:hover::after, .faq-item.is-open::after { transform: scaleX(1); }
          /* Glowing bar on the left when open */
          .faq-item::before {
            content: ''; position: absolute; left: 0; top: 1.4rem; bottom: 1.4rem; width: 2px;
            background: #00A3FF; box-shadow: 0 0 10px #00A3FF;
            transform: scaleY(0); transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .faq-item.is-open::before { transform: scaleY(1); }

          .faq-q {
            width: 100%; display: flex; align-items: center; gap: 1.25rem;
            padding: 1.5rem 0; background: none; border: none; cursor: pointer;
            text-align: left; color: #FFFFFF; font: inherit; outline: none;
            transition: padding-left 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .faq-q:hover, .faq-item.is-open .faq-q { padding-left: 1rem; }
          .faq-q:focus-visible .faq-q-text { text-decoration: underline; text-decoration-color: #00A3FF; text-underline-offset: 6px; }

          .faq-num {
            flex-shrink: 0; width: 1.4rem;
            font-family: 'Gowun Dodum', sans-serif; font-size: 0.8rem; color: #555555;
            transition: color 0.3s ease;
          }
          .faq-q:hover .faq-num, .faq-item.is-open .faq-num { color: #00A3FF; }

          .faq-q-text {
            flex: 1; padding-right: 2rem;
            color: #FFFFFF; font-family: 'Hind', sans-serif; font-size: 1.2rem; font-weight: 400;
          }

          .faq-icon {
            position: relative; flex-shrink: 0; width: 40px; height: 40px;
            border-radius: 50%; border: 1px solid #444444; box-sizing: border-box;
            transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease,
                        transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .faq-icon span {
            position: absolute; left: 50%; top: 50%; width: 14px; height: 1.5px;
            margin: -0.75px 0 0 -7px; border-radius: 2px; background: #FFFFFF;
            transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease;
          }
          .faq-icon span:last-child { transform: rotate(90deg); }
          .faq-q:hover .faq-icon { border-color: #FFFFFF; transform: scale(1.08); }
          .faq-item.is-open .faq-icon {
            background: #00A3FF; border-color: #00A3FF; transform: rotate(180deg);
            box-shadow: 0 0 22px rgba(0,163,255,0.6);
          }
          .faq-item.is-open .faq-icon span { background: #000000; }
          .faq-item.is-open .faq-icon span:last-child { transform: rotate(0deg); }

          .faq-a {
            display: grid; grid-template-rows: 0fr;
            transition: grid-template-rows 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .faq-item.is-open .faq-a { grid-template-rows: 1fr; }
          .faq-a-inner { overflow: hidden; min-height: 0; }
          .faq-a p {
            margin: 0; padding: 0 4.5rem 1.5rem 3.65rem;
            color: #888888; font-family: 'Hind', sans-serif; font-size: 1rem; line-height: 1.6;
            opacity: 0; transform: translateY(-8px);
            transition: opacity 0.35s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .faq-item.is-open .faq-a p { opacity: 1; transform: none; transition-delay: 0.12s; }

          .faq-cta { position: relative; margin-top: 3.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
          .faq-cta p { margin: 0; color: #888888; font-family: 'Hind', sans-serif; font-size: 1rem; }

          @keyframes faqBreath {
            0%,100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
            50%     { opacity: 1;   transform: translateX(-50%) scale(1.1); }
          }

          @media (max-width: 640px) {
            .faq-title { font-size: 2.6rem; }
            .faq-q-text { font-size: 1rem; padding-right: 0.5rem; }
            .faq-a p { padding: 0 1rem 1.5rem 3.65rem; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default FAQ;