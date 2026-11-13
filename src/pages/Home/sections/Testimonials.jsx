// src/pages/Home/sections/Testimonials.jsx

import { useState } from 'react';

const Testimonials = () => {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      
      <section style={{ 
        backgroundColor: '#000000', 
        padding: '5rem 5%', 
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        {/* Section Title */}
        <h2 style={{ 
          color: '#FFFFFF', 
          fontFamily: "'Inknut Antiqua', serif", 
          fontSize: '3.5rem', 
          fontWeight: '400', 
          marginBottom: '3rem',
          marginTop: 0
        }}>
          What clients says
        </h2>
        
        {/* Grid Layout - 3 Columns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1.2fr 1fr', 
          gridAutoRows: 'minmax(260px, auto)',
          gap: '2rem', 
          width: '100%',
        }}>
          
          {/* 1. TOP LEFT VIDEO */}
          <div 
            onClick={() => setActiveModal({ type: 'video', title: 'Video 1' })}
            style={{ 
              width: '100%', height: '100%', minHeight: '260px', backgroundColor: '#1A1A1A', borderRadius: '16px',
              position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}
          >
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: '#FFFFFF', padding: '2px 20px', borderRadius: '10px', fontSize: '0.6rem', fontFamily: "'Hind', sans-serif" }}></div>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#888', fontSize: '0.7rem', fontFamily: "'Hind', sans-serif" }}>0:45</div>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '0', height: '0', borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '12px solid #000000', marginLeft: '4px' }}></div>
            </div>
            <p style={{ position: 'absolute', bottom: '1rem', color: '#555', fontSize: '0.7rem', fontFamily: "'Hind', sans-serif" }}>[CLIENT VIDEO COVER - 16:9 - 1080]</p>
          </div>

          {/* 2. TOP MIDDLE TEXT REVIEW */}
          <div 
            onClick={() => setActiveModal({ type: 'review', title: 'Review 1' })}
            style={{ 
              width: '100%', height: '100%', minHeight: '260px', backgroundColor: '#1A1A1A', borderRadius: '16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer'
            }}
          >
            <div style={{ padding: '2rem' }}>
              <p style={{ color: '#888', fontFamily: "'Hind', sans-serif", fontStyle: 'italic', fontSize: '1rem', lineHeight: '1.6' }}>"Working with ARTX DEV was an absolute game changer. They built our web app exactly as we envisioned..."</p>
            </div>
            <div style={{ padding: '1rem 2rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1rem' }}>👤</span>
                </div>
                <div>
                  <p style={{ color: '#FFF', margin: 0, fontSize: '0.9rem', fontFamily: "'Hind', sans-serif" }}>Client Name</p>
                  <p style={{ color: '#888', margin: 0, fontSize: '0.8rem', fontFamily: "'Hind', sans-serif" }}>Company</p>
                </div>
              </div>
              <p style={{ color: '#FFF', margin: 0, letterSpacing: '2px' }}>★★★★★</p>
            </div>
          </div>

          {/* 3. RIGHT SIDE VERTICAL VIDEO */}
          <div 
            onClick={() => setActiveModal({ type: 'video', title: 'Vertical Video' })}
            style={{ 
              gridRow: 'span 2', 
              width: '100%', height: '100%', backgroundColor: '#1A1A1A', borderRadius: '16px',
              position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
            }}
          >
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#FFF', fontSize: '0.8rem', fontFamily: "'Hind', sans-serif" }}>0:32</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #555', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem', color: '#555' }}>👤</span>
              </div>
              <p style={{ color: '#555', fontSize: '0.7rem', fontFamily: "'Hind', sans-serif" }}>[VIDEO COVER - 9:16]</p>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
                <div style={{ width: '0', height: '0', borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '12px solid #000000', marginLeft: '4px' }}></div>
              </div>
            </div>
            <div style={{ width: '100%', padding: '1.5rem', borderTop: '1px solid #333' }}>
              <p style={{ color: '#FFF', margin: 0, fontSize: '1rem', fontFamily: "'Hind', sans-serif" }}>[Client name]</p>
              <p style={{ color: '#888', margin: 0, fontSize: '0.85rem', fontFamily: "'Hind', sans-serif" }}>[Company, Service]</p>
            </div>
          </div>

          {/* 4. BOTTOM LEFT TEXT REVIEW */}
          <div 
            onClick={() => setActiveModal({ type: 'review', title: 'Review 2' })}
            style={{ 
              width: '100%', height: '100%', minHeight: '260px', backgroundColor: '#1A1A1A', borderRadius: '16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer'
            }}
          >
            <div style={{ padding: '2rem' }}>
              <p style={{ color: '#888', fontFamily: "'Hind', sans-serif", fontStyle: 'italic', fontSize: '1rem', lineHeight: '1.6' }}>"The AI automation setup saves our team hours..."</p>
            </div>
            <div style={{ padding: '1rem 2rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1rem' }}>👤</span>
                </div>
                <div>
                  <p style={{ color: '#FFF', margin: 0, fontSize: '0.9rem', fontFamily: "'Hind', sans-serif" }}>Client Name</p>
                  <p style={{ color: '#888', margin: 0, fontSize: '0.8rem', fontFamily: "'Hind', sans-serif" }}>Company</p>
                </div>
              </div>
              <p style={{ color: '#FFF', margin: 0, letterSpacing: '2px' }}>★★★★★</p>
            </div>
          </div>

          {/* 5. BOTTOM MIDDLE VIDEO */}
          <div 
            onClick={() => setActiveModal({ type: 'video', title: 'Video 3' })}
            style={{ 
              width: '100%', height: '100%', minHeight: '260px', backgroundColor: '#1A1A1A', borderRadius: '16px',
              position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}
          >
             <div style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: '#FFFFFF', padding: '2px 20px', borderRadius: '10px', fontSize: '0.6rem', fontFamily: "'Hind', sans-serif" }}></div>
             <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#888', fontSize: '0.7rem', fontFamily: "'Hind', sans-serif" }}>0:45</div>
             <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '0', height: '0', borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '12px solid #000000', marginLeft: '4px' }}></div>
            </div>
            <p style={{ position: 'absolute', bottom: '1rem', color: '#555', fontSize: '0.7rem', fontFamily: "'Hind', sans-serif" }}>[CLIENT VIDEO COVER - 16:9 - 1080]</p>
          </div>

        </div>

      </section>

      {/* ================= FULL SCREEN OVERLAY MODAL ================= */}
      {activeModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw',    
          height: '100vh',   
          backgroundColor: '#000000', 
          zIndex: 9999, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexDirection: 'column'
        }}>
          
          {/* CLOSE BUTTON - Top Right */}
          <button 
            onClick={closeModal}
            style={{ 
              position: 'absolute', 
              top: '2rem', 
              right: '3rem', 
              background: 'transparent', 
              border: 'none', 
              color: '#FFF', 
              fontSize: '2.5rem', 
              cursor: 'pointer', 
              zIndex: 10000
            }}
          >
            ✕
          </button>

          {/* FULL SCREEN CONTENT AREA */}
          <div style={{ 
            width: '100%',    
            height: '100%',   
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '2rem' 
          }}>
             
             {/* REPLACE THIS SECTION WITH YOUR FULL VIDEO OR REVIEW */}
             <h2 style={{ color: '#FFF', fontFamily: "'Hind', sans-serif", fontSize: '2rem', marginBottom: '1rem' }}>
               {activeModal.title}
             </h2>
             {/* FIXED: Removed the angle brackets around the word video so it doesn't crash */}
             <p style={{ color: '#888', fontFamily: "'Hind', sans-serif" }}>
               [This area is now the entire screen. Place your full video player or long review text here.]
             </p>

          </div>

        </div>
      )}

    </div>
  );
};

export default Testimonials;