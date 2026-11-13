import { Link } from 'react-router-dom';

import handHuman from '../../../assets/hand-human.png';
import handRobot from '../../../assets/hand-robot.png';
import heroWeb from '../../../assets/hero-web.png';
import heroX from '../../../assets/hero-x.png';

const Hero = () => {
  return (
    // White wrapper to show the gap
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 0.5px' }}>
      
      <section style={{ 
        position: 'relative',
        backgroundColor: '#000000', 
        width: 'calc(100% - 4px)', 
        margin: '0 auto', 
        height: '85vh', 
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        overflow: 'hidden',
      }}>
        
        {/* 3D WEB IMAGE */}
        <img src={heroWeb} alt="3D Web" style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          zIndex: 1, objectFit: 'cover',
        }} />

        {/* FOREGROUND GRAPHICS */}
        <img src={handHuman} alt="Human Hand" style={{ position: 'absolute', bottom: 0, left: '0%', width: '43%', zIndex: 3 }} />
        <img src={heroX} alt="X Graphic" style={{ position: 'absolute', top: '26.5%', left: '48%', width: '45px', zIndex: 4 }} />
        <img src={handRobot} alt="Robotic Hand" style={{ position: 'absolute', bottom: '8%', right: '0%', width: '40%', zIndex: 3 }} />

        {/* TEXT CONTENT */}
        <div style={{ zIndex: 10, maxWidth: '600px', position: 'relative' }}>
          
          {/* 1. THE MAIN HEADING */}
          <h1 style={{ 
            fontSize: '3.5rem', 
            lineHeight: '1.1', 
            marginBottom: '1rem', 
            fontFamily: "'Kantumruy Pro', sans-serif", 
            fontWeight: '600', 
            color: '#c9c9c9'  
          }}>
            We build Digital <br /> 
            Product That Feels <br /> 
            <span style={{ 
              fontFamily: "'Sansation', sans-serif", 
              fontWeight: '700',       // <--- Made it bolder to match the top lines
              fontStyle: 'normal',  
              fontSize: '3.5rem', // <--- ADDED: Forces exact same size as the rest
              letterSpacing: '1px'
            }}>
              Premium.
            </span>
          </h1>
          
          {/* 2. SUBTEXT */}
          <p style={{ 
            color: '#ffffff', 
            maxWidth: '500px', 
            marginBottom: '4.5rem', 
            fontSize: '0.85rem', 
            lineHeight: '3', 
            fontFamily: "'Karma', serif" 
          }}>
            Website, Web apps, Design, App and Marketing. Design and develop with care, <br/> engineered to be fast and supported after lunch
          </p>
          
          {/* 3. BUTTONS */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            alignItems: 'center',
            transform: 'translateY(40px)' // <--- THIS MOVES THE BUTTONS DOWN
          }}>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <button style={{ background: 'transparent', color: '#ffffff', padding: '10px 24px', borderRadius: '30px', border: '1px solid #ffffff', fontSize: '0.9rem', fontFamily: "'Karma', serif", cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.target.style.background = '#ffffff'; e.target.style.color = '#000000'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#ffffff'; }}>
                Start a project →
              </button>
            </Link>

            <Link to="/portfolio" style={{ textDecoration: 'none' }}>
              <button style={{ background: '#ffffff', color: '#000000', padding: '10px 24px', borderRadius: '30px', border: '1px solid #ffffff', fontSize: '0.9rem', fontWeight: '600', fontFamily: "'Karma', serif", cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.target.style.background = '#ffffff'; e.target.style.color = '#000000'; }}>
                See Our work
              </button>
            </Link>
          </div>
        </div>

        {/* 4. AI AUTOMATION TEXT */}
        <h2 style={{ 
          position: 'absolute', 
          top: '25%', 
          right: '7.5%', 
          fontSize: '3.5rem', 
          fontFamily: "'Kantumruy Pro', sans-serif", 
          fontWeight: '600', 
          color: '#c9c9c9', 
          zIndex: 10 
        }}>
          AI Automation
        </h2>
      </section>
    </div>
  );
};

export default Hero;