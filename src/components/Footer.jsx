// src/components/Footer.jsx

import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png'; // Make sure your logo is named logo.png in the assets folder

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#000000', 
      padding: '4rem 5% 2rem 5%', 
      display: 'flex',
      flexDirection: 'column',
      borderTop: '1px solid #333333',
      fontFamily: "'Hahmlet', serif", // Set Hahmlet as the default for the whole footer
    }}>
      
      {/* Top Section: Logo and Links */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1.5fr 1.5fr 1.5fr',
        gap: '2rem',
        marginBottom: '8rem',
        width: '100%'
      }}>
        
        {/* Column 1: Logo & Socials */}
        <div>
          <div style={{ marginBottom: '1rem' }}>
            {/* YOUR LOGO IMAGE */}
            <img 
              src={logo} 
              alt="ARTX Logo" 
              style={{ height: '60px', objectFit: 'contain' }} 
            />
          </div>
          
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/" style={{ color: '#FFF', textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="/" style={{ color: '#FFF', textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="/" style={{ color: '#FFF', textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/" style={{ color: '#FFF', textDecoration: 'none', fontSize: '1.05rem', fontWeight: '600' }}>Home</Link>
          <Link to="/about" style={{ color: '#FFF', textDecoration: 'none', fontSize: '0.95rem' }}>About Us</Link>
          <Link to="/team" style={{ color: '#FFF', textDecoration: 'none', fontSize: '0.95rem' }}>Team</Link>
          <Link to="/contact" style={{ color: '#FFF', textDecoration: 'none', fontSize: '0.95rem' }}>Contact Us</Link>
          <Link to="/portfolio" style={{ color: '#FFF', textDecoration: 'none', fontSize: '0.95rem' }}>Portfolio</Link>
        </div>

        {/* Column 3: Services */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span style={{ color: '#FFF', fontSize: '1.05rem', fontWeight: '600' }}>Services</span>
          <span style={{ color: '#FFF', fontSize: '0.95rem' }}>Web Development</span>
          <span style={{ color: '#FFF', fontSize: '0.95rem' }}>Web App</span>
          <span style={{ color: '#FFF', fontSize: '0.95rem' }}>SEO, AEO & GEO</span>
          <span style={{ color: '#FFF', fontSize: '0.95rem' }}>Social Media Management</span>
          <span style={{ color: '#FFF', fontSize: '0.95rem' }}>Hosting and Maintenance</span>
        </div>

        {/* Column 4: Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span style={{ color: '#FFF', fontSize: '1.05rem', fontWeight: '600' }}>Contact</span>
          <span style={{ color: '#FFF', fontSize: '0.95rem' }}>(111) 222-3333</span>
          <span style={{ color: '#FFF', fontSize: '0.95rem', lineHeight: '1.5' }}>30 N Gould St Ste R,Sheridan Wyoming 82801</span>
        </div>

      </div>

      {/* Bottom Section: Huge Text */}
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        marginBottom: '0 rem'
      }}>
        <h1 style={{ 
          color: '#FFFFFF', 
          fontFamily: "'Hahmlet', serif", // Hahmlet for the massive text
          fontSize: '17vw', 
          lineHeight: '0.8',
          fontWeight: '700',
          margin: 0,
          letterSpacing: '-2px',
          textAlign: 'center',
          textTransform: 'uppercase'
        }}>
          ARTX DEV
        </h1>
      </div>

      {/* Very Bottom Bar: Copyright and Links */}
      <div style={{ 
        width: '100%',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #333333',
        paddingTop: '1.5rem',
        fontSize: '0.75rem',
        color: '#FFF'
      }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>©2024 Artx Dev LLC PVT. Ltd.</span>
          <span>All right Reserved</span>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/privacy" style={{ color: '#FFF', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link to="/terms" style={{ color: '#FFF', textDecoration: 'none' }}>Terms & Conditions</Link>
          <Link to="/sms" style={{ color: '#FFF', textDecoration: 'none' }}>SMS Terms & Conditions</Link>
        </div>
      </div>

    </footer>
  );
};

export default Footer;