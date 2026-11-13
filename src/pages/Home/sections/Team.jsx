// src/pages/Home/sections/Team.jsx

import { Link } from 'react-router-dom';

const Team = () => {
  // Data structure matching your Figma layout
  const teamMembers = [
    { num: '01', name: '[Full name]', title: 'Title', desc: 'Detail about what he do', image: null },
    { num: '01', name: '[Full name]', title: 'Title', desc: 'Detail about what he do', image: null },
    { num: '01', name: '[Full name]', title: 'Title', desc: 'Detail about what he do', image: null },
    { num: '01', name: '[Full name]', title: 'Title', desc: 'Detail about what he do', image: null },
    { num: '01', name: '[Full name]', title: 'Title', desc: 'Detail about what he do', image: null },
    { num: '01', name: '[Full name]', title: 'Title', desc: 'Detail about what he do', image: null },
    { num: '01', name: '[Full name]', title: 'Title', desc: 'Detail about what he do', image: null },
    { num: '01', name: '[Full name]', title: 'Title', desc: 'Detail about what he do', image: null },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      
      <section style={{ 
        backgroundColor: '#000000', 
        padding: '5rem 5%', 
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid #C0C0C0', 
        borderBottom: '1px solid #C0C0C0' 
      }}>
        
        {/* 1. Small "Team" Text above the heading */}
        <p style={{
          color: '#888888',
          fontFamily: "'Hind', sans-serif",
          fontSize: '0.85rem',
          marginBottom: '0.5rem',
          marginLeft: '2px'
        }}>
          Team
        </p>

        {/* Header Row */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          width: '100%',
          marginBottom: '3rem' 
        }}>
          
          <h2 style={{ 
            color: '#FFFFFF', 
            fontFamily: "'Hanuman', serif", // Changed to Hanuman to match Figma
            fontSize: '3rem', 
            fontWeight: '400', 
            margin: 0,
          }}>
            The people behind Artx Dev success
          </h2>
          
          <Link to="/team" style={{ 
            color: '#FFFFFF', 
            fontFamily: "'Hind', sans-serif", 
            textDecoration: 'none',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            Learn More ↗
          </Link>
        </div>

        {/* Team Grid (4 Columns) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '1.5rem', 
          width: '100%',
        }}>
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              style={{ 
                backgroundColor: '#121212', // Slightly lighter than pure black
                border: '1px solid #333333', 
                borderRadius: '16px', 
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFFFFF'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333333'}
            >
              
              {/* 2. The "01" Number in top left */}
              <p style={{
                color: '#666',
                fontFamily: "'Gowun Dodum', sans-serif",
                fontSize: '0.8rem',
                margin: '0 0 0.5rem 0'
              }}>
                {member.num}
              </p>

              {/* Image Placeholder (Silhouette) */}
              <div style={{
                width: '100%',
                aspectRatio: '1 / 1', 
                backgroundColor: '#333333',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}>
                {member.image ? (
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  // Simple CSS silhouette shape
                  <div style={{ width: '80%', height: '90%', backgroundColor: '#555', borderTopLeftRadius: '50px', borderTopRightRadius: '50px' }}></div>
                )}
              </div>
              
              {/* 3. Member Info */}
              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                <h3 style={{ 
                  color: '#FFFFFF', 
                  fontFamily: "'Hind', sans-serif", 
                  fontSize: '1rem', 
                  fontWeight: '600',
                  margin: '0 0 0.2rem 0'
                }}>
                  {member.name}
                </h3>
                <p style={{ 
                  color: '#666', 
                  fontFamily: "'Hind', sans-serif", 
                  fontSize: '0.8rem',
                  margin: '0 0 1rem 0'
                }}>
                  {member.title}
                </p>
                <p style={{
                  color: '#888',
                  fontFamily: "'Hind', sans-serif",
                  fontSize: '0.85rem',
                  margin: 0
                }}>
                  {member.desc}
                </p>
              </div>

              {/* 4. Bottom Row: Social Icons and Arrow */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* 3 Little Circles */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid #555' }}></div>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid #555' }}></div>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid #555' }}></div>
                </div>
                
                {/* Arrow */}
                <div style={{ color: '#888', fontSize: '1.2rem' }}>
                  ↗
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default Team;