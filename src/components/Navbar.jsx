import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import arrowDown from '../assets/Polygon 1.png';

const Navbar = () => {
  // ADDED: Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '15px 2%', 
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E5E5E5',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      
      {/* 1. Logo Area */}
      {/* ADDED onClick={scrollToTop} */}
      <Link to="/" onClick={scrollToTop} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <img src={logo} alt="ARTX Logo" style={{ height: '45px', objectFit: 'contain' }} />
      </Link>
      
      {/* 2. Navigation Links */}
      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        fontFamily: 'var(--font-heading)', 
        fontSize: '18px', 
        fontWeight: '400',
        color: '#000000'
      }}>
        {/* ADDED onClick={scrollToTop} to all links */}
        <Link to="/" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
        <Link to="/about" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>About Us</Link>
        
        <Link to="/services" onClick={scrollToTop} style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: 'inherit' }}>
          Services
          <img src={arrowDown} alt="dropdown" style={{ width: '12px', height: '12px', objectFit: 'contain' }} />
        </Link>

        <Link to="/portfolio" onClick={scrollToTop} style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: 'inherit' }}>
          Portfolio
          <img src={arrowDown} alt="dropdown" style={{ width: '12px', height: '12px', objectFit: 'contain' }} />
        </Link>

        <Link to="/contact" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</Link>
        <Link to="/team" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>Our Team</Link>
      </div>

      {/* 3. Right Side Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Nepal / USA Pill Button (UPDATED) */}
        <div style={{
          backgroundColor: '#000000', 
          borderRadius: '30px', 
          display: 'flex',
          position: 'relative', 
          fontFamily: "'Karma', serif", 
          fontSize: '15px', 
          color: '#FFFFFF',
          height: '40px', // Fixed height for the pill
          width: '160px', // Fixed width to keep the halves equal
          boxSizing: 'border-box',
          overflow: 'hidden' // Prevents the slash from spilling out
        }}>
          
          {/* Left Half - Nepal (ADDED onClick) */}
          <div onClick={scrollToTop} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            Nepal
          </div>
          
          {/* The Slash Line */}
          <div style={{ 
            width: '1.5px', 
            height: '60px', // Made taller so it touches the edges
            backgroundColor: '#FFFFFF', 
            position: 'absolute', 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(25deg)', 
            pointerEvents: 'none' 
          }}></div>
          
          {/* Right Half - USA (ADDED onClick) */}
          <div onClick={scrollToTop} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            USA
          </div>

        </div>

        {/* Book a Meeting Button (ADDED onClick to Link) */}
        <Link to="/book-meeting" onClick={scrollToTop} style={{ textDecoration: 'none' }}>
          <button style={{
            background: '#ffffff',
            border: '2.5px solid #000000', 
            color: '#000000', 
            padding: '9px 24px',
            fontFamily: "'Karma', serif",
            fontSize: '15px',
            fontWeight: '700', 
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#000000';
            e.target.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#FFFFFF';
            e.target.style.color = '#000000';
          }}
          >
            Book a Meeting
          </button>
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;