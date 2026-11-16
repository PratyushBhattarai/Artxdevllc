// src/components/Navbar.jsx

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import arrowDown from '../assets/Polygon 1.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services', hasArrow: true },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/team', label: 'Our Team' },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [region, setRegion] = useState('Nepal');
  const [hoverIndex, setHoverIndex] = useState(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

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

  // Close mobile menu when the page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
      >
        Nepal
      </button>
      <span className="nv-region-slash" aria-hidden="true" />
      <button
        type="button"
        className={`nv-region-btn${region === 'USA' ? ' is-active' : ''}`}
        aria-pressed={region === 'USA'}
        onClick={() => chooseRegion('USA')}
      >
        USA
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
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              ref={(el) => { linkRefs.current[index] = el; }}
              to={link.to}
              onClick={handleNavClick}
              onMouseEnter={() => setHoverIndex(index)}
              className={`nv-link${isActive(link.to) ? ' is-active' : ''}`}
              style={{ '--i': index }}
              aria-current={isActive(link.to) ? 'page' : undefined}
            >
              {link.label}
              {link.hasArrow && <img src={arrowDown} alt="" className="nv-arrow" />}
            </Link>
          ))}

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
          {renderRegion()}

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
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div className={`nv-panel${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="nv-panel-glow" aria-hidden="true" />
        <div className="nv-panel-links">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={handleNavClick}
              className={`nv-panel-link${isActive(link.to) ? ' is-active' : ''}`}
              style={{ '--i': index }}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="nv-panel-num">{String(index + 1).padStart(2, '0')}</span>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="nv-panel-actions">
          {renderRegion('nv-region--panel')}
          <Link to="/book-meeting" onClick={handleNavClick} className="nv-book nv-book--panel" tabIndex={menuOpen ? 0 : -1}>
            <span className="nv-book-text">Book a Meeting</span>
            <span className="nv-book-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <style>{`
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
          position: fixed; inset: 0; z-index: 99; overflow-y: auto;
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
          position: absolute; bottom: -200px; right: -200px; width: 600px; height: 600px;
          border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(0, 163, 255, 0.2), transparent 65%);
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