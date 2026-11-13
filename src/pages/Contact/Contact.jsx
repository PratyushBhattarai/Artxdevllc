const Contact = () => {
  return (
    <section style={{ padding: '6rem 5%', minHeight: '60vh', display: 'flex', gap: '4rem' }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Get in Touch</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Have a project in mind? Let's talk.</p>
        <p style={{ color: 'var(--text-secondary)' }}>Email: hello@artxdev.com</p>
        <p style={{ color: 'var(--text-secondary)' }}>Phone: (111) 222-3333</p>
      </div>
      <div style={{ flex: 1, background: 'var(--bg-secondary)', padding: '3rem', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
        {/* Form Placeholder */}
        <h3 style={{ marginBottom: '2rem' }}>Send us a message</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Your Name" style={{ padding: '15px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '8px' }} />
          <input type="email" placeholder="Your Email" style={{ padding: '15px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '8px' }} />
          <textarea placeholder="Your Message" rows="5" style={{ padding: '15px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '8px' }}></textarea>
          <button style={{ padding: '15px', background: 'var(--accent-color)', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '1rem' }}>Send Message</button>
        </div>
      </div>
    </section>
  );
};
export default Contact;