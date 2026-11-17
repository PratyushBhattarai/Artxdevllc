// src/components/Footer.jsx

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { OFFICES } from '../data/offices';
import { useRegion } from '../context/RegionContext';

// ---- Edit footer content here ----
const pageLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/team', label: 'Our Team' },
  { to: '/contact', label: 'Contact Us' },
];

// Each one opens that service on the Services page
const services = [
  { to: '/services#website-design', label: 'Website Design' },
  { to: '/services#website-development', label: 'Website Development' },
  { to: '/services#web-apps', label: 'Web Apps' },
  { to: '/services#mobile-apps', label: 'Mobile Apps' },
  { to: '/services#marketing-and-seo', label: 'Marketing & SEO' },
  { to: '/services#ai-automation', label: 'AI Automation' },
  { to: '/services#hosting-and-maintenance', label: 'Hosting & Maintenance' },
  { to: '/services#packages', label: 'Pricing & Packages' },
];

// Same details as the Contact page
// Office details come from src/data/offices.js (same as the Contact page)
const contact = {
  email: OFFICES.USA.email,
  offices: [
    { label: 'USA', ...OFFICES.USA },
    { label: 'Nepal', ...OFFICES.Nepal },
  ],
};

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/artx-dev-llc-467b87398/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    ),
  },
  {
    label: 'Instagram',
    // different account per office – picked by the NEP / USA pill
    href: {
      Nepal: 'https://www.instagram.com/artxdevai/',
      USA: 'https://www.instagram.com/artx_dev/',
    },
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1cXrkRp565/?mibextid=wwXIfr',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    ),
  },
];

// A social link can be one URL, or { Nepal, USA } to switch with the NEP / USA pill
const socialHref = (s, region) => (typeof s.href === 'string' ? s.href : s.href[region] || s.href.USA);

const Footer = () => {
  const { region } = useRegion();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);
  const bigTextRef = useRef(null);

  // REPLAYS animation every time it enters the screen
  useEffect(() => {
    const node = footerRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Blue spotlight follows the mouse over the big "ARTX DEV" text
  const handleBigMove = (e) => {
    const el = bigTextRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  const handleBigLeave = () => {
    const el = bigTextRef.current;
    if (!el) return;
    el.style.setProperty('--mx', '-999px');
    el.style.setProperty('--my', '-999px');
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  // Page links go to the top of the page (also when you're already on that page).
  // Service links (with #) are scrolled into place by the Services page itself.
  const onLinkClick = (to) => () => { if (!to.includes('#')) window.scrollTo({ top: 0 }); };
  const year = new Date().getFullYear();

  return (
    <footer ref={footerRef} className={`ft${isVisible ? ' is-visible' : ''}`}>

      {/* ================= TEXTURE & GLOW BACKGROUND ================= */}
      <div className="ft-grid-bg" aria-hidden="true" />
      <div className="ft-glow" aria-hidden="true" />
      <div className="ft-glow-blue" aria-hidden="true" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="ft-content">

        {/* Top Section: Logo and Links */}
        <div className="ft-top">

          {/* Column 1: Logo & Socials */}
          <div className="ft-col" style={{ '--i': 0 }}>
            <Link to="/" className="ft-logo-link" aria-label="ARTX Dev home">
              <img src={logo} alt="ARTX Logo" className="ft-logo" />
            </Link>
            <p className="ft-tagline">
              Websites, apps & AI automation for growing businesses – built in Nepal, serving clients across the USA.
            </p>
            <div className="ft-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={socialHref(s, region)}
                  className="ft-social"
                  aria-label={`${s.label} (opens in a new tab)`}
                  title={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="ft-col ft-list" style={{ '--i': 1 }}>
            <span className="ft-heading"><span className="ft-heading-dot" />Company</span>
            <Link to="/" className="ft-link" onClick={onLinkClick('/')}>Home</Link>
            {pageLinks.map((link) => (
              <Link key={link.to} to={link.to} className="ft-link" onClick={onLinkClick(link.to)}>{link.label}</Link>
            ))}
          </div>

          {/* Column 3: Services */}
          <div className="ft-col ft-list" style={{ '--i': 2 }}>
            <span className="ft-heading"><span className="ft-heading-dot" />Services</span>
            {services.map((s) => (
              <Link key={s.to} to={s.to} className="ft-link" onClick={onLinkClick(s.to)}>{s.label}</Link>
            ))}
          </div>

          {/* Column 4: Contact */}
          <div className="ft-col ft-list" style={{ '--i': 3 }}>
            <span className="ft-heading"><span className="ft-heading-dot" />Contact</span>
            <a href={'mailto:' + contact.email} className="ft-link">{contact.email}</a>
            <div className="ft-contact-offices">
              {contact.offices.map((o) => (
                <div key={o.label} className="ft-office-block">
                  <span className="ft-link ft-link--static ft-address">
                    <span className="ft-office">{o.label}</span>
                    {o.address}
                  </span>
                  <a href={o.phoneHref} className="ft-link ft-phone">{o.phone}</a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ================= BOTTOM SECTION: ANIMATED HUGE TEXT ================= */}
        <div className="ft-big-wrap" onMouseMove={handleBigMove} onMouseLeave={handleBigLeave}>
          <h1 ref={bigTextRef} className="ft-big">ARTX DEV</h1>
        </div>

        {/* Very Bottom Bar */}
        <div className="ft-bottom">
          <div className="ft-copy">
            <span>© {year} Artx Dev LLC & Artx Dev Pvt. Ltd.</span>
            <span>All rights reserved</span>
          </div>
          <div className="ft-legal">
            <Link to="/privacy" onClick={onLinkClick('/privacy')}>Privacy Policy</Link>
            <Link to="/terms" onClick={onLinkClick('/terms')}>Terms & Conditions</Link>
            <Link to="/sms" onClick={onLinkClick('/sms')}>SMS Terms & Conditions</Link>
            <button type="button" className="ft-top-btn" onClick={scrollToTop} aria-label="Back to top">
              <span>↑</span>
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .ft {
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
          background: #000000; padding: 4rem 5% 2rem;
          border-top: 1px solid #333333;
          font-family: 'Hahmlet', serif;
        }
        /* Blue light running along the top border */
        .ft::before {
          content: ''; position: absolute; top: -1px; left: 0; z-index: 2;
          width: 30%; height: 1px;
          background: linear-gradient(90deg, transparent, #00A3FF, transparent);
          box-shadow: 0 0 10px #00A3FF;
          animation: ftRun 6s linear infinite;
        }

        /* ---------- Background ---------- */
        .ft-grid-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: ftPan 18s linear infinite;
        }
        .ft-glow {
          position: absolute; top: 50%; left: 50%; width: 800px; height: 800px;
          transform: translate(-50%, -50%); z-index: 0; pointer-events: none;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
        }
        .ft-glow-blue {
          position: absolute; bottom: -300px; left: 50%; width: 1000px; height: 600px;
          z-index: 0; pointer-events: none; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0,163,255,0.16), transparent 65%);
          animation: ftBreath 7s ease-in-out infinite;
        }

        .ft-content { position: relative; z-index: 1; }

        /* ---------- Columns ---------- */
        .ft-top {
          display: grid; grid-template-columns: 1.9fr 1.1fr 1.4fr 1.6fr;
          gap: 2rem; width: 100%; margin-bottom: 8rem;
        }
        .ft-col {
          opacity: 0; transform: translateY(30px);
          transition:
            opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 0.12s),
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 0.12s);
        }
        .is-visible .ft-col { opacity: 1; transform: none; }

        .ft-logo-link { display: inline-block; margin-bottom: 1.25rem; }
        .ft-logo {
          height: 60px; object-fit: contain; display: block;
          transition: filter 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ft-logo-link:hover .ft-logo { filter: drop-shadow(0 0 14px rgba(0,163,255,0.7)); transform: scale(1.05); }

        .ft-socials { display: flex; gap: 0.75rem; }
        .ft-social {
          width: 38px; height: 38px; border-radius: 50%; box-sizing: border-box;
          border: 1px solid #333333; color: #FFFFFF; text-decoration: none;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ft-social:hover {
          background: #00A3FF; border-color: #00A3FF; color: #000000;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px -6px rgba(0,163,255,0.8);
        }

        .ft-list { display: flex; flex-direction: column; gap: 0.85rem; }
        .ft-heading {
          display: inline-flex; align-items: center; gap: 0.55rem; width: fit-content;
          color: #FFFFFF; font-size: 1.05rem; font-weight: 600; text-decoration: none;
        }
        .ft-heading-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00A3FF; box-shadow: 0 0 8px #00A3FF;
        }
        .ft-heading--link:hover { color: #00A3FF; }

        .ft-link {
          position: relative; width: fit-content;
          color: #FFFFFF; text-decoration: none; font-size: 0.95rem;
          transition: padding-left 0.4s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease;
        }
        /* Blue arrow appears on the left */
        .ft-link::before {
          content: '→'; position: absolute; left: 0; top: 0;
          color: #00A3FF; opacity: 0; transform: translateX(-6px);
          transition: opacity 0.3s ease, transform 0.35s ease;
        }
        /* Blue underline draws in */
        .ft-link::after {
          content: ''; position: absolute; left: 0; bottom: -3px; width: 100%; height: 1px;
          background: #00A3FF; transform: scaleX(0); transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ft-link:hover { padding-left: 1.3rem; }
        .ft-link:hover::before { opacity: 1; transform: none; }
        .ft-link:hover::after { transform: scaleX(1); transform-origin: left; }
        .ft-link--static { cursor: default; color: #BDBDBD; }
        .ft-link--static:hover { padding-left: 0; }
        .ft-link--static::before, .ft-link--static::after { display: none; }
        .ft-address { line-height: 1.5; max-width: 260px; font-size: 0.88rem; }
        .ft-office {
          display: block; margin-bottom: 2px;
          font-family: monospace, sans-serif; font-size: 0.72rem; letter-spacing: 2px;
          text-transform: uppercase; color: #00A3FF;
        }

        .ft-contact-offices { display: flex; flex-direction: column; gap: 0.85rem; }
        .ft-office-block { display: flex; flex-direction: column; gap: 0.35rem; }
        .ft-phone { font-size: 0.88rem; }
        .ft-tagline { margin: 0 0 1.25rem; max-width: 300px; color: #A1A1AA; font-size: 0.9rem; line-height: 1.6; }
        .ft-cta {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 1.5rem;
          padding: 10px 20px; border-radius: 30px;
          background: #FFFFFF; color: #000000; text-decoration: none; font-weight: 700; font-size: 0.9rem;
          transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ft-cta:hover { background: #00A3FF; transform: translateY(-2px); box-shadow: 0 10px 24px -8px rgba(0,163,255,0.8); }
        .ft-cta span { transition: transform 0.3s ease; }
        .ft-cta:hover span { transform: translateX(4px); }

        /* ---------- Huge text ---------- */
        .ft-big-wrap {
          position: relative; width: 100%; overflow: hidden;
          display: flex; justify-content: center;
        }
        .ft-big {
          --mx: -999px; --my: -999px;
          margin: 0; text-align: center; text-transform: uppercase;
          font-family: 'Hahmlet', serif; font-size: 15vw; line-height: 0.8; font-weight: 700;
          letter-spacing: 0.08em;
          background:
            radial-gradient(240px circle at var(--mx) var(--my), #00A3FF 0%, rgba(0,163,255,0) 70%),
            linear-gradient(90deg, #00A3FF 0%, #ffffff 50%, #00A3FF 100%);
          background-size: 100% 100%, 200% 100%;
          background-repeat: no-repeat, repeat;
          -webkit-background-clip: text; background-clip: text;
          color: transparent; -webkit-text-fill-color: transparent;
          opacity: 0; transform: translateY(100px); filter: blur(10px);
          transition:
            opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s,
            transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s,
            filter 1.2s ease 0.3s,
            letter-spacing 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
          cursor: default; user-select: none;
        }
        .is-visible .ft-big {
          opacity: 1; transform: none; filter: none; letter-spacing: -2px;
          animation: ftShine 4s linear 1.5s infinite;
        }

        /* ---------- Bottom bar ---------- */
        .ft-bottom {
          position: relative; width: 100%;
          display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;
          padding-top: 1.5rem; font-size: 0.75rem; color: #888888;
        }
        .ft-bottom::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: #333333;
        }
        .ft-bottom::after {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 1px;
          background: linear-gradient(90deg, #00A3FF, transparent 60%);
          box-shadow: 0 0 8px rgba(0,163,255,0.6);
          transform: scaleX(0); transform-origin: left;
          transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.8s;
        }
        .is-visible .ft-bottom::after { transform: scaleX(1); }

        .ft-copy { display: flex; gap: 2rem; flex-wrap: wrap; }
        .ft-legal { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
        .ft-legal a { color: #FFFFFF; text-decoration: none; transition: color 0.3s ease; }
        .ft-legal a:hover { color: #00A3FF; }

        .ft-top-btn {
          width: 40px; height: 40px; border-radius: 50%; box-sizing: border-box;
          border: 1px solid #333333; background: transparent; color: #FFFFFF;
          font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ft-top-btn:hover {
          background: #00A3FF; border-color: #00A3FF; color: #000000;
          transform: translateY(-3px); box-shadow: 0 0 22px rgba(0,163,255,0.7);
        }
        .ft-top-btn:hover span { animation: ftBounce 0.8s ease-in-out infinite; }
        .ft-top-btn span { display: inline-block; }

        /* ---------- Keyframes ---------- */
        @keyframes ftShine {
          0%   { background-position: 0 0, 200% center; }
          100% { background-position: 0 0, -200% center; }
        }
        @keyframes ftRun    { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }
        @keyframes ftPan    { to { background-position: 0 40px, 40px 0; } }
        @keyframes ftBreath {
          0%,100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50%     { opacity: 1;   transform: translateX(-50%) scale(1.08); }
        }
        @keyframes ftBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

        /* ---------- Responsive ---------- */
        @media (max-width: 900px) {
          .ft-top { grid-template-columns: 1fr 1fr; margin-bottom: 4rem; }
        }
        @media (max-width: 560px) {
          .ft { padding: 3rem 5% 1.5rem; }
          .ft-top { grid-template-columns: 1fr 1fr; gap: 2rem 1.25rem; margin-bottom: 3rem; }
          .ft-top > .ft-col:first-child, .ft-top > .ft-col:last-child { grid-column: 1 / -1; }
          .ft-list { gap: 0.7rem; }
          .ft-link { font-size: 0.86rem; }
          .ft-logo { height: 48px; }
          .ft-tagline { margin-bottom: 1rem; font-size: 0.85rem; }
          .ft-contact-offices { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
          .ft-bottom { flex-direction: column; align-items: flex-start; }
          .ft-copy, .ft-legal { gap: 1rem; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;