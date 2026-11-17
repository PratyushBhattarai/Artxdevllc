// src/pages/Contact/sections/ContactForm.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegion } from '../../../context/RegionContext';
import { OFFICES } from '../../../data/offices';

const faqs = [
  { q: "How long does it take to build a website?", a: "Most basic websites take 2-3 weeks, e-commerce stores take 3-4 weeks, and enterprise solutions take 4-8 weeks depending on complexity. We'll provide a detailed timeline during our initial consultation." },
  { q: "Do you provide ongoing support after launch?", a: "Yes! We offer 24/7 support and maintenance services. All our packages include free support for the first month, and we offer ongoing maintenance plans to keep your website secure and up-to-date." },
  { q: "Can you help with existing websites?", a: "Absolutely! We can redesign, optimize, or add new features to existing websites. We also provide migration services if you're looking to move to a new platform." },
  { q: "What's included in the pricing?", a: "Our pricing includes design, development, testing, launch, and one year of hosting. You'll own the website completely, and we provide all source code and documentation." },
  { q: "Do you work with international clients?", a: "Yes, we work with clients worldwide! We're experienced in remote collaboration and can accommodate different time zones for meetings and communication." },
];

// Simple line icons (inherit color)
const Icon = {
  mail: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>,
  phone: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  pin: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
  clock: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
};

// Spotlight that follows the mouse inside cards
const handleSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const ContactForm = () => {
  // NEP / US pill in the navbar decides which office's details are shown
  const { region } = useRegion();
  const office = OFFICES[region] || OFFICES.Nepal;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a network request (Replace with your actual fetch to sendmail.php)
    // const data = new FormData(e.target);  ← every field has a "name", so this works
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="cf-outer">
      <section className="cf-section">
        <div className="cf-glow" aria-hidden="true" />

        {/* Main Two-Column Container */}
        <div className="cf-layout">

          {/* LEFT: Contact Form */}
          <div data-reveal="left">
            <div className="cf-form-card" onMouseMove={handleSpotlight}>
              <div className="cf-form-head">
                <p className="ax-eyebrow">Start the conversation</p>
                <h2 className="cf-form-title">Send Us a Message</h2>
                <p className="cf-form-sub">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>

              {isSuccess ? (
                <div className="cf-success" role="status">
                  <svg className="cf-success-icon" width="64" height="64" viewBox="0 0 52 52" aria-hidden="true">
                    <circle cx="26" cy="26" r="24" fill="none" />
                    <path fill="none" d="M15 27l7 7 15-15" />
                  </svg>
                  <h3>Message sent!</h3>
                  <p>Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                  <button type="button" className="ax-btn ax-btn--outline" onClick={() => setIsSuccess(false)}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="cf-form">

                  {/* Name Row */}
                  <div className="cf-row">
                    <div className="cf-field">
                      <label htmlFor="cf-first" className="cf-label">First Name <span>*</span></label>
                      <input id="cf-first" name="firstName" type="text" required autoComplete="given-name" className="cf-input" />
                    </div>
                    <div className="cf-field">
                      <label htmlFor="cf-last" className="cf-label">Last Name <span>*</span></label>
                      <input id="cf-last" name="lastName" type="text" required autoComplete="family-name" className="cf-input" />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="cf-row">
                    <div className="cf-field">
                      <label htmlFor="cf-email" className="cf-label">Email Address <span>*</span></label>
                      <input id="cf-email" name="email" type="email" required autoComplete="email" className="cf-input" />
                    </div>
                    <div className="cf-field">
                      <label htmlFor="cf-phone" className="cf-label">Phone Number</label>
                      <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className="cf-input" />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="cf-field">
                    <label htmlFor="cf-company" className="cf-label">Company/Organization</label>
                    <input id="cf-company" name="company" type="text" autoComplete="organization" className="cf-input" />
                  </div>

                  {/* Dropdowns */}
                  <div className="cf-field">
                    <label htmlFor="cf-service" className="cf-label">Service Interested In <span>*</span></label>
                    <select id="cf-service" name="service" required className="cf-input cf-select" defaultValue="">
                      <option value="">Select a service</option>
                      <option value="basic-website">Basic Website ($700)</option>
                      <option value="ecommerce">E-Commerce Store ($1,000)</option>
                      <option value="enterprise">Enterprise Solution ($1,500+)</option>
                      <option value="custom">Custom Development</option>
                      <option value="consultation">Free Consultation</option>
                    </select>
                  </div>
                  <div className="cf-row">
                    <div className="cf-field">
                      <label htmlFor="cf-budget" className="cf-label">Project Budget</label>
                      <select id="cf-budget" name="budget" className="cf-input cf-select" defaultValue="">
                        <option value="">Select budget range</option>
                        <option value="under-1k">Under $1,000</option>
                        <option value="1k-3k">$1,000 - $3,000</option>
                        <option value="3k-5k">$3,000 - $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-plus">$10,000+</option>
                      </select>
                    </div>
                    <div className="cf-field">
                      <label htmlFor="cf-timeline" className="cf-label">Project Timeline</label>
                      <select id="cf-timeline" name="timeline" className="cf-input cf-select" defaultValue="">
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="2-3-months">2-3 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="cf-field">
                    <label htmlFor="cf-details" className="cf-label">Project Details <span>*</span></label>
                    <textarea id="cf-details" name="details" required rows="5" placeholder="Tell us about your project..." className="cf-input cf-textarea" />
                  </div>

                  {/* Checkboxes */}
                  <div className="cf-checks">
                    <label className="cf-check">
                      <input type="checkbox" name="agreePrivacy" required />
                      <span>I agree to the <Link to="/privacy">Privacy Policy</Link> *</span>
                    </label>
                    <label className="cf-check">
                      <input type="checkbox" name="agreeTerms" required />
                      <span>I agree to the <Link to="/terms">Terms & Conditions</Link> *</span>
                    </label>
                    <label className="cf-check">
                      <input type="checkbox" name="agreeSms" />
                      <span>I agree to receive SMS messages from ArtxDev... (Standard rates apply). View <Link to="/privacy">Privacy Policy</Link> & <Link to="/sms">SMS Terms</Link>.</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" disabled={isSubmitting} className={`cf-submit${isSubmitting ? ' is-loading' : ''}`}>
                    {isSubmitting ? (
                      <><span className="cf-spinner" aria-hidden="true" /> Sending...</>
                    ) : (
                      <>Send Message <span className="cf-submit-arrow" aria-hidden="true">→</span></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: Contact Info & Hours (switches with the NEP / US pill) */}
          <div className="cf-side">

            <p className="cf-office-note" aria-live="polite">
              <span className="cf-office-dot" />
              Showing <strong key={region} className="cf-swap">{office.label}</strong> · switch with NEP / US at the top
            </p>

            {/* Email Card */}
            <div data-reveal="right" style={{ '--d': '0.05s' }}>
              <div className="cf-card" onMouseMove={handleSpotlight}>
                <div className="cf-icon">{Icon.mail}</div>
                <h3 className="cf-card-title">Email Us</h3>
                <p className="cf-card-text">Get in touch via email for detailed project discussions</p>
                <a key={region} href={`mailto:${office.email}`} className="cf-card-link cf-swap">
                  {office.email} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            {/* Call Card */}
            <div data-reveal="right" style={{ '--d': '0.15s' }}>
              <div className="cf-card" onMouseMove={handleSpotlight}>
                <div className="cf-icon">{Icon.phone}</div>
                <h3 className="cf-card-title">Call Us <span key={region} className="cf-office-tag cf-swap">{region === 'USA' ? 'USA' : 'Nepal'}</span></h3>
                <p className="cf-card-text">Speak directly with our team for immediate assistance</p>
                <a key={region} href={office.phoneHref} className="cf-card-link cf-swap">
                  {office.phone} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            {/* Visit Card */}
            <div data-reveal="right" style={{ '--d': '0.25s' }}>
              <div className="cf-card" onMouseMove={handleSpotlight}>
                <div className="cf-icon">{Icon.pin}</div>
                <h3 className="cf-card-title">Visit Us <span key={region} className="cf-office-tag cf-swap">{region === 'USA' ? 'USA' : 'Nepal'}</span></h3>
                <p className="cf-card-text">Come say hello at our {region === 'USA' ? 'USA' : 'Nepal'} office</p>
                <span key={region} className="cf-card-address cf-swap">
                  <strong className="cf-company">{office.company}</strong>
                  {office.address}
                </span>
              </div>
            </div>

            {/* Office Hours */}
            <div data-reveal="right" style={{ '--d': '0.35s' }}>
              <div className="cf-card" onMouseMove={handleSpotlight}>
                <div className="cf-hours-head">
                  <div className="cf-icon cf-icon--sm">{Icon.clock}</div>
                  <h3 className="cf-card-title" style={{ margin: 0 }}>Office Hours</h3>
                </div>
                <div className="cf-hours">
                  <div className="cf-hours-row"><span>Monday - Friday</span><span>9:00 AM - 6:00 PM</span></div>
                  <div className="cf-hours-row"><span>Saturday</span><span>10:00 AM - 4:00 PM</span></div>
                  <div className="cf-hours-row is-closed"><span>Sunday</span><span>Closed</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= FAQ SECTION ================= */}
        <div className="cf-faq-wrap" data-reveal="up">
          <div className="cf-faq-card">
            <div className="cf-faq-head">
              <p className="ax-eyebrow">FAQ</p>
              <h2 className="cf-faq-title">Frequently Asked Questions</h2>
              <p className="cf-form-sub">Quick answers to common questions about our services</p>
            </div>

            <div className="cf-faq-list">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div key={index} className={`cf-faq-item${isOpen ? ' is-open' : ''}`}>
                    <button
                      type="button"
                      id={`cf-faq-q-${index}`}
                      className="cf-faq-q"
                      aria-expanded={isOpen}
                      aria-controls={`cf-faq-a-${index}`}
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                    >
                      <span className="cf-faq-num">{String(index + 1).padStart(2, '0')}</span>
                      <span className="cf-faq-text">{faq.q}</span>
                      <span className="cf-faq-icon" aria-hidden="true"><span /><span /></span>
                    </button>
                    <div id={`cf-faq-a-${index}`} className="cf-faq-a" role="region" aria-labelledby={`cf-faq-q-${index}`}>
                      <div className="cf-faq-a-inner"><p>{faq.a}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <style>{`
          .cf-outer { background: #FFFFFF; padding: 0 0.15rem; }
          .cf-section {
            position: relative; overflow: hidden;
            background: #000000; padding: 4rem 5% 5rem;
            display: flex; flex-direction: column; align-items: center;
          }
          .cf-glow {
            position: absolute; top: 20%; right: -250px; width: 700px; height: 700px;
            border-radius: 50%; pointer-events: none;
            background: radial-gradient(circle, rgba(0,163,255,0.1), transparent 65%);
            animation: cfFloat 14s ease-in-out infinite alternate;
          }
          .cf-layout {
            position: relative; max-width: 1200px; width: 100%;
            display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: start;
          }

          /* ---------- Shared card look (spotlight on hover) ---------- */
          .cf-form-card, .cf-card, .cf-faq-card {
            position: relative; isolation: isolate; overflow: hidden; box-sizing: border-box;
            background: #111111; border: 1px solid #2A2A2A;
          }
          .cf-form-card::after, .cf-card::after {
            content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none;
            background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(0,163,255,0.1), transparent 45%);
            opacity: 0; transition: opacity 0.4s ease;
          }
          .cf-form-card:hover::after, .cf-card:hover::after { opacity: 1; }

          /* ---------- Form card ---------- */
          .cf-form-card { padding: 3rem; border-radius: 20px; }
          /* Moving blue line along the top */
          .cf-form-card::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
            background: linear-gradient(90deg, transparent, #00A3FF, transparent);
            background-size: 40% 100%; background-repeat: no-repeat;
            animation: cfScan 3.5s linear infinite;
          }
          .cf-form-head { text-align: center; margin-bottom: 2.5rem; display: flex; flex-direction: column; align-items: center; }
          .cf-form-title { color: #FFFFFF; font-family: 'Hind', sans-serif; font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem; }
          .cf-form-sub { color: #888888; font-family: 'Hind', sans-serif; margin: 0; }

          .cf-form { display: flex; flex-direction: column; gap: 1.4rem; }
          .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
          .cf-field { display: flex; flex-direction: column; gap: 0.5rem; }
          .cf-label { color: #FFFFFF; font-family: 'Hind', sans-serif; font-size: 0.9rem; font-weight: 500; transition: color 0.3s ease; }
          .cf-label span { color: #00A3FF; }
          .cf-field:focus-within .cf-label { color: #00A3FF; }

          .cf-input {
            width: 100%; box-sizing: border-box;
            background: #000000; border: 1px solid #3A3A3A; border-radius: 10px;
            padding: 0.95rem 1rem; color: #FFFFFF;
            font-family: 'Hind', sans-serif; font-size: 1rem; outline: none;
            transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, transform 0.3s ease;
          }
          .cf-input::placeholder { color: #555555; }
          .cf-input:hover { border-color: #555555; }
          .cf-input:focus {
            border-color: #00A3FF; background: #03080C;
            box-shadow: 0 0 0 4px rgba(0,163,255,0.15), 0 8px 24px -12px rgba(0,163,255,0.6);
          }
          .cf-select {
            appearance: none; -webkit-appearance: none; cursor: pointer; padding-right: 2.5rem;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%2300A3FF' stroke-width='1.8'/%3E%3C/svg%3E");
            background-repeat: no-repeat; background-position: right 1rem center;
          }
          .cf-select option { background: #111111; color: #FFFFFF; }
          .cf-textarea { resize: vertical; min-height: 130px; }

          /* Custom checkboxes */
          .cf-checks { display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.5rem; }
          .cf-check {
            display: flex; align-items: flex-start; gap: 0.7rem; cursor: pointer;
            font-size: 0.9rem; color: #D1D5DB; font-family: 'Hind', sans-serif; line-height: 1.5;
          }
          .cf-check input {
            appearance: none; -webkit-appearance: none; flex-shrink: 0;
            width: 18px; height: 18px; margin: 0.15rem 0 0; cursor: pointer;
            border: 1.5px solid #555555; border-radius: 5px; background: #000000;
            display: grid; place-content: center;
            transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          }
          .cf-check input::before {
            content: ''; width: 10px; height: 10px; background: #000000;
            clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
            transform: scale(0); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .cf-check input:checked { background: #00A3FF; border-color: #00A3FF; box-shadow: 0 0 12px rgba(0,163,255,0.6); }
          .cf-check input:checked::before { transform: scale(1); }
          .cf-check input:focus-visible { outline: 2px solid #00A3FF; outline-offset: 2px; }
          .cf-check:hover input { border-color: #00A3FF; }
          .cf-check a { color: #FFFFFF; text-decoration: underline; text-decoration-color: #00A3FF; text-underline-offset: 3px; transition: color 0.3s; }
          .cf-check a:hover { color: #00A3FF; }

          /* Submit */
          .cf-submit {
            position: relative; overflow: hidden; isolation: isolate;
            display: flex; align-items: center; justify-content: center; gap: 10px;
            margin-top: 1rem; padding: 1rem; border: none; border-radius: 10px;
            background: #FFFFFF; color: #000000; cursor: pointer;
            font-family: 'Hind', sans-serif; font-size: 1.1rem; font-weight: 600;
            transition: box-shadow 0.35s ease, transform 0.2s ease, opacity 0.3s ease;
          }
          .cf-submit::after {
            content: ''; position: absolute; top: 0; left: -75%; width: 50%; height: 100%; z-index: -1;
            background: linear-gradient(100deg, transparent, rgba(0,163,255,0.45), transparent);
            transform: skewX(-20deg);
          }
          .cf-submit:hover:not(:disabled) { box-shadow: 0 0 0 1px #FFFFFF, 0 0 36px rgba(0,163,255,0.75); }
          .cf-submit:hover:not(:disabled)::after { animation: axShine 0.8s ease forwards; }
          .cf-submit:active:not(:disabled) { transform: scale(0.98); }
          .cf-submit:disabled { cursor: wait; opacity: 0.8; }
          .cf-submit-arrow { display: inline-block; transition: transform 0.35s ease; }
          .cf-submit:hover .cf-submit-arrow { transform: translateX(5px); }
          .cf-spinner {
            width: 18px; height: 18px; border-radius: 50%;
            border: 2px solid rgba(0,0,0,0.2); border-top-color: #00A3FF;
            animation: cfSpin 0.8s linear infinite;
          }

          /* Success */
          .cf-success {
            display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.75rem;
            padding: 2.5rem 2rem; border-radius: 14px;
            background: rgba(0,163,255,0.06); border: 1px solid rgba(0,163,255,0.5);
            font-family: 'Hind', sans-serif; animation: cfPop 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          .cf-success h3 { color: #FFFFFF; font-size: 1.5rem; margin: 0.5rem 0 0; }
          .cf-success p { color: #A1A1AA; margin: 0 0 1rem; }
          .cf-success-icon { filter: drop-shadow(0 0 12px rgba(0,163,255,0.7)); }
          .cf-success-icon circle { stroke: #00A3FF; stroke-width: 2; stroke-dasharray: 152; stroke-dashoffset: 152; animation: cfDraw 0.7s ease forwards; }
          .cf-success-icon path { stroke: #FFFFFF; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 40; stroke-dashoffset: 40; animation: cfDraw 0.4s ease 0.6s forwards; }

          /* ---------- Info cards ---------- */
          .cf-side { display: flex; flex-direction: column; gap: 1.5rem; }
          .cf-card {
            padding: 2rem; border-radius: 16px;
            transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease, box-shadow 0.5s ease;
          }
          .cf-card:hover {
            transform: translateY(-6px); border-color: rgba(0,163,255,0.5);
            box-shadow: 0 24px 50px -24px rgba(0,163,255,0.55);
          }
          .cf-icon {
            width: 52px; height: 52px; border-radius: 50%; margin-bottom: 1.1rem;
            display: flex; align-items: center; justify-content: center;
            color: #00A3FF; background: rgba(0,163,255,0.08); border: 1px solid rgba(0,163,255,0.25);
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s, color 0.3s, box-shadow 0.3s;
          }
          .cf-card:hover .cf-icon {
            transform: rotate(-10deg) scale(1.08); background: #00A3FF; color: #000000;
            box-shadow: 0 0 24px rgba(0,163,255,0.6);
          }
          .cf-icon--sm { width: 40px; height: 40px; margin: 0; }
          .cf-icon--sm svg { width: 18px; height: 18px; }
          .cf-card-title { color: #FFFFFF; font-family: 'Hind', sans-serif; font-size: 1.2rem; font-weight: 600; margin: 0 0 0.5rem; }
          .cf-card-text { color: #A1A1AA; font-family: 'Hind', sans-serif; font-size: 0.95rem; margin: 0 0 1rem; }
          .cf-card-link {
            position: relative; display: inline-flex; align-items: center; gap: 8px;
            color: #FFFFFF; font-family: 'Hind', sans-serif; font-weight: 500; font-size: 0.95rem; text-decoration: none;
            padding-bottom: 3px;
          }
          .cf-card-link::after {
            content: ''; position: absolute; left: 0; bottom: 0; width: 100%; height: 1px; background: #00A3FF;
            transform: scaleX(0); transform-origin: right; transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .cf-card-link:hover::after { transform: scaleX(1); transform-origin: left; }
          .cf-card-link span { color: #00A3FF; transition: transform 0.35s ease; }
          .cf-card-link:hover span { transform: translateX(4px); }
          .cf-card-address { color: #FFFFFF; font-family: 'Hind', sans-serif; font-size: 0.95rem; line-height: 1.5; }

          /* ---- NEP / US office switch ---- */
          .cf-office-note {
            display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin: 0 0 0.25rem;
            color: #8A8A8A; font-family: 'Hind', sans-serif; font-size: 0.85rem;
          }
          .cf-office-note strong { color: #00A3FF; font-weight: 600; }
          .cf-office-dot { width: 7px; height: 7px; border-radius: 50%; background: #00A3FF; box-shadow: 0 0 8px #00A3FF; }
          .cf-office-tag {
            display: inline-block; vertical-align: middle; margin-left: 8px; padding: 2px 9px; border-radius: 20px;
            border: 1px solid rgba(0, 163, 255, 0.5); color: #00A3FF;
            font-family: monospace, sans-serif; font-size: 0.68rem; font-weight: 400; letter-spacing: 1.5px; text-transform: uppercase;
          }
          .cf-company { display: block; margin-bottom: 2px; color: #00A3FF; font-weight: 600; font-size: 0.85rem; }
          /* details fade/slide in whenever NEP / US changes */
          .cf-swap { animation: cfSwap 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
          @keyframes cfSwap { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

          .cf-hours-head { display: flex; align-items: center; gap: 0.8rem; }
          .cf-hours { display: flex; flex-direction: column; margin-top: 1.25rem; }
          .cf-hours-row {
            display: flex; justify-content: space-between; gap: 1rem;
            padding: 0.65rem 0.5rem; border-bottom: 1px solid #2A2A2A; border-radius: 6px;
            color: #A1A1AA; font-family: 'Hind', sans-serif; font-size: 0.95rem;
            transition: background 0.3s ease, color 0.3s ease, padding 0.3s ease;
          }
          .cf-hours-row:last-child { border-bottom: none; }
          .cf-hours-row:hover { background: rgba(0,163,255,0.06); color: #FFFFFF; padding-left: 0.9rem; }
          .cf-hours-row span:last-child { color: #FFFFFF; }
          .cf-hours-row.is-closed span:last-child { color: #666666; }

          /* ---------- FAQ ---------- */
          .cf-faq-wrap { position: relative; max-width: 1200px; width: 100%; margin-top: 4rem; }
          .cf-faq-card { border-radius: 20px; padding: 2.5rem; }
          .cf-faq-head { text-align: center; margin-bottom: 1.5rem; display: flex; flex-direction: column; align-items: center; }
          .cf-faq-title { color: #FFFFFF; font-family: 'Hind', sans-serif; font-size: 1.8rem; font-weight: 700; margin: 0 0 0.5rem; }

          .cf-faq-item { position: relative; border-bottom: 1px solid #2A2A2A; }
          .cf-faq-item:last-child { border-bottom: none; }
          .cf-faq-item::before {
            content: ''; position: absolute; left: 0; top: 1.3rem; bottom: 1.3rem; width: 2px;
            background: #00A3FF; box-shadow: 0 0 10px #00A3FF;
            transform: scaleY(0); transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .cf-faq-item.is-open::before { transform: scaleY(1); }
          .cf-faq-q {
            width: 100%; display: flex; align-items: center; gap: 1.1rem;
            padding: 1.4rem 0; background: none; border: none; cursor: pointer; text-align: left; outline: none;
            transition: padding-left 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .cf-faq-q:hover, .cf-faq-item.is-open .cf-faq-q { padding-left: 1rem; }
          .cf-faq-q:focus-visible .cf-faq-text { text-decoration: underline; text-decoration-color: #00A3FF; text-underline-offset: 6px; }
          .cf-faq-num { flex-shrink: 0; width: 1.4rem; color: #555555; font-family: 'Gowun Dodum', sans-serif; font-size: 0.8rem; transition: color 0.3s; }
          .cf-faq-q:hover .cf-faq-num, .cf-faq-item.is-open .cf-faq-num { color: #00A3FF; }
          .cf-faq-text { flex: 1; color: #FFFFFF; font-family: 'Hind', sans-serif; font-size: 1.1rem; font-weight: 600; }
          .cf-faq-icon {
            position: relative; flex-shrink: 0; width: 36px; height: 36px; box-sizing: border-box;
            border-radius: 50%; border: 1px solid #444444;
            transition: background 0.4s, border-color 0.4s, box-shadow 0.4s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .cf-faq-icon span {
            position: absolute; left: 50%; top: 50%; width: 12px; height: 1.5px; margin: -0.75px 0 0 -6px;
            background: #FFFFFF; border-radius: 2px;
            transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s;
          }
          .cf-faq-icon span:last-child { transform: rotate(90deg); }
          .cf-faq-q:hover .cf-faq-icon { border-color: #FFFFFF; transform: scale(1.08); }
          .cf-faq-item.is-open .cf-faq-icon {
            background: #00A3FF; border-color: #00A3FF; transform: rotate(180deg);
            box-shadow: 0 0 20px rgba(0,163,255,0.6);
          }
          .cf-faq-item.is-open .cf-faq-icon span { background: #000000; }
          .cf-faq-item.is-open .cf-faq-icon span:last-child { transform: rotate(0deg); }
          .cf-faq-a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
          .cf-faq-item.is-open .cf-faq-a { grid-template-rows: 1fr; }
          .cf-faq-a-inner { overflow: hidden; min-height: 0; }
          .cf-faq-a p {
            margin: 0; padding: 0 3.5rem 1.4rem 3.5rem;
            color: #A1A1AA; font-family: 'Hind', sans-serif; line-height: 1.6;
            opacity: 0; transform: translateY(-8px);
            transition: opacity 0.35s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .cf-faq-item.is-open .cf-faq-a p { opacity: 1; transform: none; transition-delay: 0.12s; }

          @keyframes cfScan  { 0% { background-position: -60% 0; } 100% { background-position: 160% 0; } }
          @keyframes cfSpin  { to { transform: rotate(360deg); } }
          @keyframes cfDraw  { to { stroke-dashoffset: 0; } }
          @keyframes cfPop   { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: none; } }
          @keyframes cfFloat { from { transform: translate(0, 0); } to { transform: translate(-120px, 160px); } }

          @media (max-width: 960px) {
            .cf-layout { grid-template-columns: 1fr; gap: 2.5rem; }
          }
          @media (max-width: 600px) {
            .cf-form-card { padding: 2rem 1.25rem; }
            .cf-row { grid-template-columns: 1fr; }
            .cf-faq-card { padding: 1.75rem 1.25rem; }
            .cf-faq-text { font-size: 1rem; }
            .cf-faq-a p { padding: 0 0.5rem 1.4rem 3.5rem; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default ContactForm;