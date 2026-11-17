// src/components/Navbar.jsx

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import arrowDown from '../assets/Polygon 1.png';
import PayNowModal from './PayNowModal';

const cardIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="nv-pay-icon">
    <rect x="2" y="5" width="20" height="14" rx="2.5" />
    <path d="M2 10h20M6 15h4" />
  </svg>
);

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services', hasArrow: true, dropdown: true },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/team', label: 'Our Team' },
];

// Services dropdown – each item jumps to its row on the Services page
const icon = (d) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">{d}</svg>
);
const serviceMenu = [
  {
    to: '/services#website-design',
    title: 'Website Design',
    desc: 'Premium, on-brand layouts',
    icon: icon(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 13h4v3H7zM14 13h3M14 16h3" /></>),
  },
  {
    to: '/services#website-development',
    title: 'Website Development',
    desc: 'Fast, responsive, SEO-ready',
    icon: icon(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M10 13l-2 2 2 2M14 13l2 2-2 2" /></>),
  },
  {
    to: '/services#web-apps',
    title: 'Web Apps',
    desc: 'Dashboards, portals & tools',
    icon: icon(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>),
  },
  {
    to: '/services#mobile-apps',
    title: 'Mobile Apps',
    desc: 'iOS & Android apps',
    icon: icon(<><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M11 18h2" /></>),
  },
  {
    to: '/services#marketing-and-seo',
    title: 'Marketing & SEO',
    desc: 'Get found, get customers',
    icon: icon(<><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>),
  },
  {
    to: '/services#ai-automation',
    title: 'AI Automation',
    desc: 'Chatbots & smart workflows',
    icon: icon(<><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>),
  },
];

const serviceQuickLinks = [
  { to: '/services#packages', label: 'Pricing & packages' },
  { to: '/services#add-ons', label: 'Add-on services' },
  { to: '/services#process', label: 'Our process' },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [region, setRegion] = useState('Nepal');
  const [hoverIndex, setHoverIndex] = useState(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); // accordion in the phone menu
  const [payOpen, setPayOpen] = useState(false);
  const [payKey, setPayKey] = useState(0); // new key = fresh Pay Now form each time
  const openPay = () => { setMenuOpen(false); setPayOpen(true); };
  const closePay = useCallback(() => {
    setPayOpen(false);
    // after the close animation, swap in a fresh (empty) form for next time
    setTimeout(() => setPayKey((k) => k + 1), 400);
  }, []);

  const linksRef = useRef(null);
  const linkRefs = useRef([]);

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));
  const activeIndex = navLinks.findIndex((link) => isActive(link.to));

  // Scroll to top on every navigation click (and close mobile menu)
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleNavClick = () => {
    scrollToTop();
    setMenuOpen(false);
  };

  const chooseRegion = (value) => {
    setRegion(value);
    scrollToTop();
  };

  // Navbar shrinks + turns glassy after scrolling a little
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Blue sliding indicator follows the hovered link, rests on the active page
  const target = hoverIndex ?? activeIndex;
  useLayoutEffect(() => {
    const update = () => {
      const el = linkRefs.current[target];
      if (target < 0 || !el) {
        setIndicator((prev) => ({ ...prev, visible: false }));
        return;
      }
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
    };
    update();

    if (typeof ResizeObserver === 'undefined' || !linksRef.current) return undefined;
    const observer = new ResizeObserver(update);
    observer.observe(linksRef.current);
    return () => observer.disconnect();
  }, [target]);

  // Close mobile menu + services dropdown when the page changes
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Services dropdown: close with Escape
  useEffect(() => {
    if (!servicesOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setServicesOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [servicesOpen]);

  // Clicking an item in the dropdown: close it (the Services page scrolls to the #section)
  const handleDropdownClick = () => {
    setServicesOpen(false);
    setMenuOpen(false);
  };

  // Mobile menu: lock page scroll + close with Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Plain render function (not a component) so the slide animation isn't reset on re-render
  const renderRegion = (className = '') => (
    <div className={`nv-region${region === 'USA' ? ' is-usa' : ''} ${className}`} role="group" aria-label="Choose region">
      <span className="nv-region-thumb" aria-hidden="true" />
      <button
        type="button"
        className={`nv-region-btn${region === 'Nepal' ? ' is-active' : ''}`}
        aria-pressed={region === 'Nepal'}
        onClick={() => chooseRegion('Nepal')}
        aria-label="Nepal"
      >
        NEP
      </button>
      <span className="nv-region-slash" aria-hidden="true" />
      <button
        type="button"
        className={`nv-region-btn${region === 'USA' ? ' is-active' : ''}`}
        aria-pressed={region === 'USA'}
        onClick={() => chooseRegion('USA')}
        aria-label="USA"
      >
        US
      </button>
    </div>
  );

  return (
    <>
      <nav className={`nv${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-menu-open' : ''}`}>

        {/* 1. Logo Area */}
        <Link to="/" onClick={handleNavClick} className="nv-logo" aria-label="ARTX Dev home">
          <img src={logo} alt="ARTX Logo" />
        </Link>

        {/* 2. Navigation Links (desktop) */}
        <div
          ref={linksRef}
          className="nv-links"
          onMouseLeave={() => setHoverIndex(null)}
        >
          {navLinks.map((link, index) => {
            const anchor = (
              <Link
                key={link.to}
                ref={link.dropdown ? undefined : (el) => { linkRefs.current[index] = el; }}
                to={link.to}
                onClick={handleNavClick}
                onMouseEnter={() => setHoverIndex(index)}
                className={`nv-link${isActive(link.to) ? ' is-active' : ''}`}
                style={{ '--i': index }}
                aria-current={isActive(link.to) ? 'page' : undefined}
                aria-haspopup={link.dropdown ? 'true' : undefined}
                aria-expanded={link.dropdown ? servicesOpen : undefined}
              >
                {link.label}
                {link.hasArrow && <img src={arrowDown} alt="" className="nv-arrow" />}
              </Link>
            );

            if (!link.dropdown) return anchor;

            // ---- Services with hover dropdown ----
            return (
              <div
                key={link.to}
                ref={(el) => { linkRefs.current[index] = el; }}
                className={`nv-item${servicesOpen ? ' is-open' : ''}`}
                onMouseEnter={() => { setHoverIndex(index); setServicesOpen(true); }}
                onMouseLeave={() => setServicesOpen(false)}
                onFocus={() => setServicesOpen(true)}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false); }}
              >
                {anchor}

                <div className="nv-drop" role="menu" aria-label="Services">
                  <div className="nv-drop-card">
                    <div className="nv-drop-grid">
                      {serviceMenu.map((s, i) => (
                        <Link
                          key={s.to}
                          to={s.to}
                          role="menuitem"
                          className="nv-drop-item"
                          style={{ '--j': i }}
                          onClick={handleDropdownClick}
                          tabIndex={servicesOpen ? 0 : -1}
                        >
                          <span className="nv-drop-icon">{s.icon}</span>
                          <span className="nv-drop-text">
                            <span className="nv-drop-title">{s.title}</span>
                            <span className="nv-drop-desc">{s.desc}</span>
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="nv-drop-side">
                      <span className="nv-drop-eyebrow">Explore</span>
                      {serviceQuickLinks.map((q) => (
                        <Link
                          key={q.to}
                          to={q.to}
                          role="menuitem"
                          className="nv-drop-quick"
                          onClick={handleDropdownClick}
                          tabIndex={servicesOpen ? 0 : -1}
                        >
                          {q.label} <span aria-hidden="true">→</span>
                        </Link>
                      ))}
                      <Link
                        to="/services"
                        role="menuitem"
                        className="nv-drop-all"
                        onClick={(e) => { handleDropdownClick(e); scrollToTop(); }}
                        tabIndex={servicesOpen ? 0 : -1}
                      >
                        View all services <span aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <span
            className="nv-indicator"
            aria-hidden="true"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
              opacity: indicator.visible ? 1 : 0,
            }}
          />
        </div>

        {/* 3. Right Side Buttons (desktop) */}
        <div className="nv-actions">
          <button type="button" className="nv-pay" onClick={openPay} aria-label="Pay now">
            {cardIcon}
            <span className="nv-pay-text">Pay Now</span>
          </button>

          <Link to="/book-meeting" onClick={handleNavClick} className="nv-book">
            <span className="nv-book-text">Book a Meeting</span>
            <span className="nv-book-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Hamburger (tablet / mobile) */}
        <button
          type="button"
          className="nv-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => { setMenuOpen((open) => !open); setMobileServicesOpen(false); }}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Floating Nepal / USA switch – sits under "Book a Meeting", stays while scrolling */}
      <div className={`nv-float${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-hidden' : ''}`}>
        {renderRegion('nv-region--float')}
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div className={`nv-panel${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="nv-panel-glow" aria-hidden="true" />
        <div className="nv-panel-links">
          {navLinks.map((link, index) => {
            const num = <span className="nv-panel-num">{String(index + 1).padStart(2, '0')}</span>;

            if (!link.dropdown) {
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={handleNavClick}
                  className={`nv-panel-link${isActive(link.to) ? ' is-active' : ''}`}
                  style={{ '--i': index }}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {num}
                  {link.label}
                </Link>
              );
            }

            // ---- Services: tap to expand the list of services ----
            return (
              <div key={link.to} className={`nv-panel-group${mobileServicesOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className={`nv-panel-link nv-panel-toggle${isActive(link.to) ? ' is-active' : ''}`}
                  style={{ '--i': index }}
                  onClick={() => setMobileServicesOpen((o) => !o)}
                  aria-expanded={mobileServicesOpen}
                  aria-controls="nv-panel-services"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {num}
                  {link.label}
                  <span className="nv-panel-chevron" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                </button>

                <div className="nv-panel-sub" id="nv-panel-services">
                  <div className="nv-panel-sub-inner">
                    <div className="nv-panel-sub-grid">
                      {serviceMenu.map((s, i) => (
                        <Link
                          key={s.to}
                          to={s.to}
                          className="nv-panel-sub-item"
                          style={{ '--j': i }}
                          onClick={handleDropdownClick}
                          tabIndex={menuOpen && mobileServicesOpen ? 0 : -1}
                        >
                          <span className="nv-drop-icon">{s.icon}</span>
                          <span>{s.title}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="nv-panel-sub-quick">
                      {serviceQuickLinks.map((q) => (
                        <Link
                          key={q.to}
                          to={q.to}
                          onClick={handleDropdownClick}
                          tabIndex={menuOpen && mobileServicesOpen ? 0 : -1}
                        >
                          {q.label}
                        </Link>
                      ))}
                      <Link
                        to="/services"
                        className="nv-panel-sub-all"
                        onClick={handleNavClick}
                        tabIndex={menuOpen && mobileServicesOpen ? 0 : -1}
                      >
                        View all services ↗
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="nv-panel-actions">
          <button type="button" className="nv-pay nv-pay--panel" onClick={openPay} tabIndex={menuOpen ? 0 : -1}>
            {cardIcon}
            <span className="nv-pay-text">Pay Now</span>
          </button>
          <Link to="/book-meeting" onClick={handleNavClick} className="nv-book nv-book--panel" tabIndex={menuOpen ? 0 : -1}>
            <span className="nv-book-text">Book a Meeting</span>
            <span className="nv-book-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <PayNowModal key={payKey} open={payOpen} onClose={closePay} />

      <style>{`
        /* ================= PAY NOW BUTTON ================= */
        .nv-pay {
          position: relative; overflow: hidden; isolation: isolate;
          display: inline-flex; align-items: center; gap: 8px;
          height: 40px; padding: 0 18px; box-sizing: border-box;
          border: 2px solid #00A3FF; border-radius: 30px; background: #FFFFFF;
          font-family: 'Karma', serif; font-size: 15px; font-weight: 700; color: #000000;
          white-space: nowrap; cursor: pointer;
          transition: color 0.35s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .nv-pay::before {
          content: ''; position: absolute; inset: 0; z-index: -1; background: #00A3FF;
          transform: translateY(101%); transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        /* soft blue pulse to draw the eye */
        .nv-pay::after {
          content: ''; position: absolute; inset: -2px; border-radius: inherit; pointer-events: none;
          box-shadow: 0 0 0 0 rgba(0, 163, 255, 0.5); animation: nvPayPulse 2.6s ease-out infinite;
        }
        .nv-pay:hover { transform: translateY(-2px); box-shadow: 0 8px 18px -6px rgba(0, 163, 255, 0.7); }
        .nv-pay:hover::before { transform: translateY(0); }
        .nv-pay-icon {
          width: 18px; height: 18px; flex-shrink: 0; fill: none; stroke: currentColor;
          stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; color: #00A3FF;
          transition: color 0.35s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .nv-pay:hover .nv-pay-icon { color: #000000; transform: rotate(-10deg) scale(1.1); }
        @keyframes nvPayPulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 163, 255, 0.45); }
          70%, 100% { box-shadow: 0 0 0 10px rgba(0, 163, 255, 0); }
        }
        /* Mobile menu version */
        .nv-pay--panel { background: transparent; color: #FFFFFF; height: 44px; }
        .nv-pay--panel:hover { color: #000000; }
        /* Tight desktop widths: icon-only so the navbar never wraps */
        @media (max-width: 1180px) and (min-width: 1081px) {
          .nv-pay:not(.nv-pay--panel) { width: 40px; padding: 0; justify-content: center; }
          .nv-pay:not(.nv-pay--panel) .nv-pay-text { display: none; }
        }

        /* ================= FLOATING NEPAL / USA ================= */
        .nv-float {
          position: fixed; z-index: 98; right: 2%; top: 92px;
          padding: 3px; border-radius: 30px;
          background: rgba(255, 255, 255, 0.75);
          -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.06);
          transition: top 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease, transform 0.3s ease;
          animation: nvFloatIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.7s backwards;
        }
        .nv-float.is-scrolled { top: 74px; }
        .nv-float.is-hidden { opacity: 0; transform: translateY(-8px); pointer-events: none; }
        .nv-float:hover { transform: translateY(-2px); }
        .nv-float .nv-region--float { width: 92px; height: 28px; }
        .nv-region--float .nv-region-btn { font-size: 12px; letter-spacing: 0.5px; }
        .nv-region--float .nv-region-slash { height: 36px; }
        @keyframes nvFloatIn { from { opacity: 0; transform: translateY(-14px) scale(0.9); } to { opacity: 1; transform: none; } }
        @media (max-width: 1080px) {
          .nv-float { top: 86px; right: 2%; }
          .nv-float.is-scrolled { top: 74px; }
          .nv-float .nv-region--float { width: 86px; height: 26px; }
        }

        /* ================= NAV BAR ================= */
        .nv {
          position: sticky; top: 0; z-index: 100;
          display: flex; justify-content: space-between; align-items: center; gap: 1.5rem;
          padding: 15px 2%;
          background: #FFFFFF;
          border-bottom: 1px solid #E5E5E5;
          transition: padding 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease,
                      box-shadow 0.4s ease, border-color 0.4s ease;
          animation: nvDrop 0.8s cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }
        /* Blue hairline that appears at the bottom once you scroll */
        .nv::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 1px;
          background: linear-gradient(90deg, transparent, #00A3FF, transparent);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .nv.is-scrolled {
          padding: 9px 2%;
          background: rgba(255, 255, 255, 0.9);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
                  backdrop-filter: blur(14px) saturate(160%);
          border-color: transparent;
          box-shadow: 0 10px 30px -14px rgba(0, 0, 0, 0.25);
        }
        .nv.is-scrolled::after { opacity: 1; }
        .nv.is-menu-open { background: #FFFFFF; }

        /* Logo */
        .nv-logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
        .nv-logo img {
          height: 45px; object-fit: contain; display: block;
          transition: height 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .nv.is-scrolled .nv-logo img { height: 38px; }
        .nv-logo:hover img { transform: scale(1.05) rotate(-2deg); }

        /* Links */
        .nv-links {
          position: relative; display: flex; gap: 2rem;
          font-family: var(--font-heading); font-size: 18px; font-weight: 400; color: #000000;
        }
        .nv-link {
          position: relative; display: flex; align-items: center; gap: 6px;
          padding: 6px 0; color: inherit; text-decoration: none;
          animation: nvFade 0.6s cubic-bezier(0.22, 1, 0.36, 1) calc(0.25s + var(--i) * 0.06s) backwards;
          transition: color 0.3s ease;
        }
        .nv-link:hover { color: #000000; }
        .nv-link.is-active { font-weight: 600; }
        .nv-arrow {
          width: 12px; height: 12px; object-fit: contain;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .nv-link:hover .nv-arrow { transform: rotate(180deg); }

        .nv-indicator {
          position: absolute; left: 0; bottom: -4px; height: 2px; border-radius: 2px;
          background: #00A3FF; box-shadow: 0 0 10px rgba(0, 163, 255, 0.8);
          pointer-events: none;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                      width 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
        }

        /* ================= SERVICES DROPDOWN ================= */
        .nv-item { position: relative; display: flex; }
        .nv-item.is-open .nv-arrow { transform: rotate(180deg); }

        .nv-drop {
          position: absolute; top: 100%; left: 50%; z-index: 101;
          width: 720px; padding-top: 20px;
          font-family: 'Inter', sans-serif; font-size: 14px;
          opacity: 0; visibility: hidden; pointer-events: none;
          transform: translateX(-50%) translateY(12px);
          transition: opacity 0.3s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear 0.3s;
        }
        .nv-item.is-open .nv-drop {
          opacity: 1; visibility: visible; pointer-events: auto;
          transform: translateX(-50%);
          transition: opacity 0.3s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), visibility 0s;
        }
        /* little pointer above the card */
        .nv-drop::before {
          content: ''; position: absolute; top: 13px; left: 50%; z-index: 1;
          width: 14px; height: 14px; background: #FFFFFF;
          border-left: 1px solid #E5E5E5; border-top: 1px solid #E5E5E5;
          transform: translateX(-50%) rotate(45deg);
        }

        .nv-drop-card {
          display: grid; grid-template-columns: 1fr 215px;
          background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 18px; overflow: hidden;
          box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.35), 0 12px 24px -12px rgba(0, 163, 255, 0.25);
        }

        .nv-drop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; padding: 14px; }

        .nv-drop-item {
          display: flex; align-items: center; gap: 14px;
          padding: 12px; border-radius: 12px;
          color: #000000; text-decoration: none;
          opacity: 0; transform: translateY(8px);
          transition: background-color 0.25s ease, opacity 0.4s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nv-item.is-open .nv-drop-item {
          opacity: 1; transform: none;
          transition-delay: 0s, calc(0.05s + var(--j) * 0.04s), calc(0.05s + var(--j) * 0.04s);
        }
        .nv-drop-item:hover { background: #F2F8FF; }

        .nv-drop-icon {
          flex-shrink: 0; width: 42px; height: 42px; border-radius: 11px;
          display: grid; place-items: center;
          background: #000000; color: #FFFFFF;
          transition: background-color 0.3s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }
        .nv-drop-icon svg {
          width: 20px; height: 20px; fill: none; stroke: currentColor;
          stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
        }
        .nv-drop-item:hover .nv-drop-icon {
          background: #00A3FF; transform: rotate(-8deg) scale(1.08);
          box-shadow: 0 6px 16px rgba(0, 163, 255, 0.45);
        }

        .nv-drop-title { display: block; font-size: 15px; font-weight: 600; line-height: 1.3; }
        .nv-drop-desc { display: block; margin-top: 2px; font-size: 12.5px; color: #777777; }
        .nv-drop-item:hover .nv-drop-title { color: #000000; }

        .nv-drop-side {
          position: relative; overflow: hidden; isolation: isolate;
          display: flex; flex-direction: column; gap: 2px;
          padding: 22px 20px; background: #000000; color: #FFFFFF;
        }
        .nv-drop-side::after {
          content: ''; position: absolute; right: -90px; bottom: -90px; z-index: -1;
          width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 163, 255, 0.4), transparent 65%);
          animation: nvGlow 4s ease-in-out infinite;
        }
        .nv-drop-eyebrow {
          margin-bottom: 8px; font-family: monospace; font-size: 11px;
          letter-spacing: 2px; text-transform: uppercase; color: #00A3FF;
        }
        .nv-drop-quick {
          display: flex; justify-content: space-between; align-items: center;
          padding: 9px 0; border-bottom: 1px solid #222222;
          color: #CCCCCC; text-decoration: none; font-size: 14px;
          transition: color 0.25s ease, padding-left 0.3s ease;
        }
        .nv-drop-quick span { color: #00A3FF; transition: transform 0.3s ease; }
        .nv-drop-quick:hover { color: #FFFFFF; padding-left: 6px; }
        .nv-drop-quick:hover span { transform: translateX(3px); }
        .nv-drop-all {
          margin-top: auto; display: inline-flex; justify-content: center; align-items: center; gap: 6px;
          padding: 10px 14px; border-radius: 30px;
          background: #00A3FF; color: #000000; font-size: 13.5px; font-weight: 600; text-decoration: none;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        .nv-drop-all:hover { background: #FFFFFF; transform: translateY(-2px); }

        @keyframes nvGlow { 0%, 100% { transform: scale(0.9); opacity: 0.7; } 50% { transform: scale(1.15); opacity: 1; } }

        /* Right side */
        .nv-actions {
          display: flex; align-items: center; gap: 20px; flex-shrink: 0;
          animation: nvFade 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.55s backwards;
        }

        /* Nepal / USA pill */
        .nv-region {
          position: relative; display: flex; overflow: hidden; box-sizing: border-box;
          width: 160px; height: 40px; border-radius: 30px;
          background: #000000;
        }
        .nv-region-thumb {
          position: absolute; top: 0; bottom: 0; left: -10%; width: 60%;
          background: #00A3FF; box-shadow: 0 0 18px rgba(0, 163, 255, 0.7);
          transform: translateX(0) skewX(-25deg);
          transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .nv-region.is-usa .nv-region-thumb { transform: translateX(100%) skewX(-25deg); }
        .nv-region-slash {
          position: absolute; left: 50%; top: 50%; width: 1.5px; height: 60px;
          background: #FFFFFF; transform: translate(-50%, -50%) rotate(25deg);
          pointer-events: none; opacity: 0.6;
        }
        .nv-region-btn {
          position: relative; z-index: 1; flex: 1;
          display: flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer; padding: 0;
          font-family: 'Karma', serif; font-size: 15px; color: #FFFFFF;
          transition: color 0.35s ease, transform 0.3s ease;
        }
        .nv-region-btn.is-active { color: #000000; font-weight: 700; }
        .nv-region-btn:not(.is-active):hover { color: #00A3FF; }
        .nv-region-btn:active { transform: scale(0.94); }

        /* Book a Meeting */
        .nv-book {
          position: relative; isolation: isolate; overflow: hidden;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 24px; box-sizing: border-box;
          background: #FFFFFF; border: 2.5px solid #000000; color: #000000;
          font-family: 'Karma', serif; font-size: 15px; font-weight: 700;
          text-decoration: none; white-space: nowrap; cursor: pointer;
          transition: color 0.35s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
        }
        .nv-book::before {
          content: ''; position: absolute; inset: 0; z-index: -1; background: #000000;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nv-book:hover { color: #FFFFFF; transform: translate(-3px, -3px); box-shadow: 4px 4px 0 #00A3FF; }
        .nv-book:hover::before { transform: scaleX(1); }
        .nv-book:active { transform: translate(0, 0); box-shadow: 0 0 0 #00A3FF; }
        .nv-book-arrow {
          position: absolute; right: 8px; top: 50%; margin-top: -0.6em; line-height: 1.2;
          color: #00A3FF; font-size: 13px; opacity: 0;
          transform: translate(-4px, 4px);
          transition: opacity 0.3s ease, transform 0.35s ease;
        }
        .nv-book:hover .nv-book-arrow { opacity: 1; transform: none; }

        /* Hamburger */
        .nv-burger {
          display: none; position: relative; width: 44px; height: 44px; flex-shrink: 0;
          border: 1.5px solid #000000; border-radius: 50%; background: #FFFFFF; cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .nv-burger span {
          position: absolute; left: 50%; width: 18px; height: 1.5px; margin-left: -9px;
          background: #000000; border-radius: 2px;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease, background 0.3s ease, top 0.4s;
        }
        .nv-burger span:nth-child(1) { top: 15px; }
        .nv-burger span:nth-child(2) { top: 21px; }
        .nv-burger span:nth-child(3) { top: 27px; }
        .nv-burger:hover { border-color: #00A3FF; }
        .nv.is-menu-open .nv-burger { background: #000000; }
        .nv.is-menu-open .nv-burger span { background: #FFFFFF; }
        .nv.is-menu-open .nv-burger span:nth-child(1) { top: 21px; transform: rotate(45deg); }
        .nv.is-menu-open .nv-burger span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nv.is-menu-open .nv-burger span:nth-child(3) { top: 21px; transform: rotate(-45deg); }

        /* ================= MOBILE PANEL ================= */
        .nv-panel {
          position: fixed; inset: 0; z-index: 99; overflow-y: auto; overflow-x: hidden;
          display: flex; flex-direction: column; justify-content: space-between; gap: 2.5rem;
          padding: 110px 8% 3rem; box-sizing: border-box;
          background: #000000;
          clip-path: circle(0% at calc(100% - 40px) 38px);
          visibility: hidden;
          transition: clip-path 0.7s cubic-bezier(0.65, 0, 0.35, 1), visibility 0s linear 0.7s;
        }
        .nv-panel.is-open {
          clip-path: circle(150% at calc(100% - 40px) 38px);
          visibility: visible;
          transition: clip-path 0.7s cubic-bezier(0.65, 0, 0.35, 1), visibility 0s;
        }
        .nv-panel-glow {
          position: absolute; bottom: 0; right: 0; width: 100%; height: 420px; pointer-events: none;
          background: radial-gradient(circle at 100% 100%, rgba(0, 163, 255, 0.2), transparent 70%);
        }
        .nv-panel-links { position: relative; display: flex; flex-direction: column; gap: 0.4rem; }
        .nv-panel-link {
          display: flex; align-items: baseline; gap: 1rem;
          padding: 0.6rem 0; border-bottom: 1px solid #222222;
          font-family: var(--font-heading); font-size: clamp(1.6rem, 6vw, 2.4rem);
          color: #FFFFFF; text-decoration: none;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease, padding-left 0.4s ease;
        }
        .nv-panel.is-open .nv-panel-link {
          opacity: 1; transform: none;
          transition-delay: calc(0.25s + var(--i) * 0.06s), calc(0.25s + var(--i) * 0.06s), 0s, 0s;
        }
        .nv-panel-link:hover { color: #00A3FF; padding-left: 0.6rem; }
        .nv-panel-link.is-active { color: #00A3FF; }
        .nv-panel-num { font-family: 'Gowun Dodum', sans-serif; font-size: 0.8rem; color: #555555; }

        /* ---- Services accordion (phone menu) ---- */
        .nv-panel-toggle {
          width: 100%; text-align: left; cursor: pointer;
          background: none; border: none; border-bottom: 1px solid #222222; border-radius: 0;
        }
        .nv-panel-chevron {
          margin-left: auto; align-self: center;
          width: 34px; height: 34px; border-radius: 50%; border: 1px solid #333333;
          display: grid; place-items: center; flex-shrink: 0;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease, border-color 0.3s ease;
        }
        .nv-panel-chevron svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .nv-panel-group.is-open .nv-panel-toggle { color: #00A3FF; }
        .nv-panel-group.is-open .nv-panel-chevron {
          transform: rotate(180deg); background: #00A3FF; border-color: #00A3FF; color: #000000;
        }

        /* smooth open/close height using grid rows 0fr → 1fr */
        .nv-panel-sub {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nv-panel-group.is-open .nv-panel-sub { grid-template-rows: 1fr; }
        .nv-panel-sub-inner { overflow: hidden; min-height: 0; }

        .nv-panel-sub-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
          padding: 14px 0 10px;
        }
        .nv-panel-sub-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px; border-radius: 12px; border: 1px solid #222222; background: #0d0d0d;
          color: #FFFFFF; text-decoration: none;
          font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 600; line-height: 1.25;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s ease, background 0.25s ease;
        }
        .nv-panel-group.is-open .nv-panel-sub-item {
          opacity: 1; transform: none;
          transition-delay: calc(0.08s + var(--j) * 0.04s), calc(0.08s + var(--j) * 0.04s), 0s, 0s;
        }
        .nv-panel-sub-item:hover, .nv-panel-sub-item:active { border-color: #00A3FF; background: rgba(0, 163, 255, 0.08); }
        .nv-panel-sub-item .nv-drop-icon { width: 34px; height: 34px; border-radius: 9px; background: #1a1a1a; }
        .nv-panel-sub-item .nv-drop-icon svg { width: 17px; height: 17px; }
        .nv-panel-sub-item:hover .nv-drop-icon { background: #00A3FF; color: #000000; }

        .nv-panel-sub-quick {
          display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
          padding: 4px 0 16px; border-bottom: 1px solid #222222;
        }
        .nv-panel-sub-quick a {
          padding: 7px 12px; border-radius: 30px; border: 1px solid #333333;
          color: #CCCCCC; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.8rem;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .nv-panel-sub-quick a:hover { color: #FFFFFF; border-color: #00A3FF; }
        .nv-panel-sub-quick .nv-panel-sub-all { background: #00A3FF; border-color: #00A3FF; color: #000000; font-weight: 600; }

        @media (max-width: 360px) {
          .nv-panel-sub-grid { grid-template-columns: 1fr; }
        }
        .nv-panel-link.is-active .nv-panel-num { color: #00A3FF; }

        .nv-panel-actions {
          position: relative; display: flex; flex-wrap: wrap; align-items: center; gap: 1rem;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nv-panel.is-open .nv-panel-actions { opacity: 1; transform: none; transition-delay: 0.65s; }
        .nv-region--panel { border: 1px solid #333333; }
        .nv-book--panel { background: transparent; border-color: #FFFFFF; color: #FFFFFF; }
        .nv-book--panel::before { background: #FFFFFF; }
        .nv-book--panel:hover { color: #000000; }

        /* ================= KEYFRAMES ================= */
        @keyframes nvDrop { from { transform: translateY(-100%); opacity: 0; } to { transform: none; opacity: 1; } }
        @keyframes nvFade { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }

        /* ================= RESPONSIVE ================= */
        @media (max-width: 1200px) {
          .nv-links { gap: 1.4rem; font-size: 16px; }
          .nv-actions { gap: 14px; }
        }
        @media (max-width: 1080px) {
          .nv-links, .nv-actions { display: none; }
          .nv-burger { display: block; }
        }
        @media (min-width: 1081px) {
          .nv-panel { display: none; }
        }
      `}</style>
    </>
  );
};

export default Navbar;