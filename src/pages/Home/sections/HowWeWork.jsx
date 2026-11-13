// src/pages/Home/sections/HowWeWork.jsx

const HowWeWork = () => {
  const steps = [
    { num: '01', title: 'Discover', desc: 'We Discuss and discover the the plans and Ideas. As Our first step' },
    { num: '02', title: 'Design', desc: 'Wireframes then high-friedly design you can click throught before any code' },
    { num: '03', title: 'Build', desc: 'Clean,tested code with weekly previews so you always see progress' },
    { num: '04', title: 'Lunch & Support', desc: 'We go live monitor performance and keep improving month after month' },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 1.5rem' }}>
      
      <section style={{ 
        backgroundColor: '#ffffff', 
        padding: '3rem 5%', // <--- CHANGED: Reduced from 5rem to 3rem (brings bottom border up)
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid #C0C0C0'
      }}>
        
        <p style={{
          color: '#3D3D3D',
          fontFamily: "'Hind', sans-serif", 
          fontSize: '0.85rem',
          alignSelf: 'flex-start',
          marginBottom: '0rem',
          marginLeft: '2px'
        }}>
          Process:
        </p>

        <h2 style={{ 
          color: '#000000', 
          fontFamily: "'Hanuman', serif", 
          fontSize: '3rem', 
          fontWeight: '700',
          alignSelf: 'flex-start',
          marginBottom: '2rem',
          marginTop: 0
        }}>
          How we Work
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '1.5rem', 
          width: '100%',
          marginBottom: '0rem' // <--- CHANGED: Removed the extra space at the bottom
        }}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              style={{ 
                backgroundColor: 'transparent', 
                border: '1px solid #555555', 
                borderRadius: '12px', 
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p style={{ 
                color: '#000000', 
                fontFamily: "'Gowun Dodum', sans-serif", 
                fontSize: '1.2rem', 
                margin: '0 0 1rem 0' 
              }}>
                {step.num}
              </p>

              <div style={{ 
                width: '100%', 
                height: '1px', 
                backgroundColor: '#555555', 
                marginBottom: '1.5rem' 
              }}></div>

              <h3 style={{ 
                color: '#000000', 
                fontFamily: "'Hanuman', serif", 
                fontSize: '1.4rem', 
                fontWeight: '700',
                marginBottom: '1rem',
                marginTop: 0
              }}>
                {step.title}
              </h3>

              <p style={{ 
                color: '#888888', 
                fontFamily: "'Hanuman', serif", 
                fontSize: '0.9rem', 
                lineHeight: '1.6',
                margin: 0
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default HowWeWork;