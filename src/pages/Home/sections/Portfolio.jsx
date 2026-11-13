// src/pages/Home/sections/Portfolio.jsx

import { Link } from 'react-router-dom';

/* 
  =========================================
  WHEN YOU HAVE YOUR IMAGES, DO THIS:
  1. Save your images in src/assets/
  2. Uncomment the imports below:
  
  // import project1 from '../../../assets/project1.png';
  // import project2 from '../../../assets/project2.png';
  // import project3 from '../../../assets/project3.png';
  // import project4 from '../../../assets/project4.png';
  =========================================
*/

const Portfolio = () => {
  const projects = [
    { title: 'Seabrook Texas Town', category: 'Web App', image: null }, 
    { title: 'Website', category: 'Website', image: null },             
    { title: 'Project Name 3', category: 'Category', image: null },     
    { title: 'Project Name 4', category: 'Category', image: null },     
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      
      <section style={{ 
        backgroundColor: '#000000', 
        padding: '5rem 5%', 
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid #C0C0C0'
      }}>
        
        {/* Header Row */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          width: '100%',
          marginBottom: '3rem' 
        }}>
          
          {/* CHANGED TO INKNUT ANTIQUA */}
          <h2 style={{ 
            color: '#FFFFFF', 
            fontFamily: "'Inknut Antiqua', serif", 
            fontSize: '3.5rem', 
            fontWeight: '400', 
            margin: 0
          }}>
            Portfolio
          </h2>
          
          {/* CHANGED TO HIND */}
          <Link to="/portfolio" style={{ 
            color: '#FFFFFF', 
            fontFamily: "'Hind', sans-serif", 
            textDecoration: 'none',
            fontSize: '0.9rem',
            marginBottom: '0.5rem'
          }}>
            All Project →
          </Link>
        </div>

        {/* Portfolio Grid (2 Columns) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '2rem', 
          width: '100%',
          marginBottom: '5rem'
        }}>
          {projects.map((project, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image Container / Placeholder */}
              <div style={{
                width: '100%',
                height: '300px', 
                overflow: 'hidden',
                cursor: 'pointer',
                marginBottom: '1rem',
                backgroundColor: '#1A1A1A', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #333333' 
              }}>
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      transition: 'transform 0.4s ease' 
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                ) : (
                  <p style={{ color: '#555555', fontFamily: "'Hind', sans-serif" }}>
                    Image Placeholder {index + 1}
                  </p>
                )}
              </div>
              
              {/* Text below image */}
              <div>
                <h3 style={{ 
                  color: '#FFFFFF', 
                  fontFamily: "'Kantumruy Pro', sans-serif", 
                  fontSize: '1.2rem', 
                  fontWeight: '700',
                  marginBottom: '0.2rem',
                  marginTop: 0
                }}>
                  {project.title}
                </h3>
                <p style={{ 
                  color: '#888888', 
                  fontFamily: "'Hind', sans-serif", 
                  fontSize: '0.85rem',
                  margin: 0
                }}>
                  {project.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Link to="/portfolio" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'transparent',
              color: '#FFFFFF',
              border: '1px solid #FFFFFF',
              borderRadius: '30px', 
              padding: '10px 40px',
              fontSize: '0.95rem',
              fontFamily: "'Hind', sans-serif", 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#FFFFFF';
              e.target.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#FFFFFF';
            }}
            >
              See More
            </button>
          </Link>
        </div>

      </section>
    </div>
  );
};

export default Portfolio;