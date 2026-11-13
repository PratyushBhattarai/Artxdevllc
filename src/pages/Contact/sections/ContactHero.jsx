// src/pages/Contact/sections/ContactHero.jsx

const ContactHero = () => {
  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      <section style={{ 
        backgroundColor: '#000000', 
        padding: '6rem 5% 4rem 5%', // Less bottom padding so the form feels connected
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <p style={{ 
          color: '#888888', 
          fontFamily: "'Hind', sans-serif", 
          fontSize: '1rem', 
          letterSpacing: '2px', 
          textTransform: 'uppercase', 
          marginBottom: '1rem' 
        }}>
          Get In Touch
        </p>
        
        <h1 style={{ 
          color: '#FFFFFF', 
          fontFamily: "'Hanuman', serif", 
          fontSize: '4.5rem', 
          fontWeight: '400', 
          margin: 0, 
          marginBottom: '1.5rem' 
        }}>
          Contact Us
        </h1>
        
        <p style={{ 
          color: '#A1A1AA', 
          fontFamily: "'Hind', sans-serif", 
          fontSize: '1.1rem', 
          maxWidth: '600px', 
          lineHeight: '1.6' 
        }}>
          Have a project in mind or just want to say hi? Fill out the form below or reach out to us directly.
        </p>
      </section>
    </div>
  );
};

export default ContactHero;