// src/pages/Contact/sections/ContactForm.jsx

import { useState } from 'react';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here is where you would normally send the form data to a backend or email service
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000); // Hide message after 5 seconds
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      <section style={{ 
        backgroundColor: '#000000', 
        padding: '0rem 5% 6rem 5%', // Connecting to the Hero above
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr', // Form takes more space
        gap: '4rem',
      }}>
        
        {/* LEFT COLUMN: THE FORM */}
        <div style={{ backgroundColor: '#121212', padding: '3rem', borderRadius: '24px', border: '1px solid #333' }}>
          <h2 style={{ color: '#FFF', fontFamily: "'Hind', sans-serif", fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem' }}>
            Send us a message
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Name Input */}
            <div>
              <label style={{ display: 'block', color: '#888', fontFamily: "'Hind', sans-serif", fontSize: '0.9rem', marginBottom: '0.5rem' }}>Your Name</label>
              <input type="text" required placeholder="John Doe" style={{ width: '100%', padding: '1rem', backgroundColor: '#000', border: '1px solid #444', borderRadius: '8px', color: '#FFF', fontFamily: "'Hind', sans-serif", outline: 'none' }} />
            </div>

            {/* Email Input */}
            <div>
              <label style={{ display: 'block', color: '#888', fontFamily: "'Hind', sans-serif", fontSize: '0.9rem', marginBottom: '0.5rem' }}>Your Email</label>
              <input type="email" required placeholder="john@example.com" style={{ width: '100%', padding: '1rem', backgroundColor: '#000', border: '1px solid #444', borderRadius: '8px', color: '#FFF', fontFamily: "'Hind', sans-serif", outline: 'none' }} />
            </div>

            {/* Message Input */}
            <div>
              <label style={{ display: 'block', color: '#888', fontFamily: "'Hind', sans-serif", fontSize: '0.9rem', marginBottom: '0.5rem' }}>Your Message</label>
              <textarea required rows="5" placeholder="Tell us about your project..." style={{ width: '100%', padding: '1rem', backgroundColor: '#000', border: '1px solid #444', borderRadius: '8px', color: '#FFF', fontFamily: "'Hind', sans-serif", outline: 'none', resize: 'none' }}></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" style={{
              background: '#FFFFFF', color: '#000000', padding: '1rem', borderRadius: '30px', border: 'none',
              fontSize: '1rem', fontFamily: "'Hind', sans-serif", fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', marginTop: '1rem'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Send Message
            </button>

            {/* Success Message */}
            {submitted && (
              <p style={{ color: '#4ade80', fontFamily: "'Hind', sans-serif", textAlign: 'center', marginTop: '1rem' }}>
                Message sent successfully! We will get back to you soon.
              </p>
            )}
          </form>
        </div>

        {/* RIGHT COLUMN: CONTACT INFO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '1rem' }}>
          
          <div>
            <h3 style={{ color: '#FFF', fontFamily: "'Hind', sans-serif", fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>Email Us</h3>
            <p style={{ color: '#A1A1AA', fontFamily: "'Hind', sans-serif", fontSize: '1rem', margin: 0 }}>hello@artxdev.com</p>
            <p style={{ color: '#A1A1AA', fontFamily: "'Hind', sans-serif", fontSize: '1rem', margin: 0 }}>support@artxdev.com</p>
          </div>

          <div>
            <h3 style={{ color: '#FFF', fontFamily: "'Hind', sans-serif", fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>Call Us</h3>
            <p style={{ color: '#A1A1AA', fontFamily: "'Hind', sans-serif", fontSize: '1rem', margin: 0 }}>(111) 222-3333</p>
            <p style={{ color: '#A1A1AA', fontFamily: "'Hind', sans-serif", fontSize: '1rem', margin: 0 }}>Mon-Fri, 9am - 5pm EST</p>
          </div>

          <div>
            <h3 style={{ color: '#FFF', fontFamily: "'Hind', sans-serif", fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>Visit Us</h3>
            <p style={{ color: '#A1A1AA', fontFamily: "'Hind', sans-serif", fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
              30 N Gould St Ste R,<br />
              Sheridan Wyoming<br />
              82801
            </p>
          </div>

        </div>

      </section>
    </div>
  );
};

export default ContactForm;