const BookMeeting = () => {
  return (
    <section style={{ padding: '6rem 5%', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Book a Meeting</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px' }}>Schedule a 30-minute discovery call with our team to discuss your project.</p>
      
      {/* Calendly / Cal.com Embed Placeholder */}
      <div style={{ width: '100%', maxWidth: '800px', height: '500px', background: 'var(--bg-secondary)', border: '1px dashed var(--border-color)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>[Insert Calendly / Cal.com Booking Iframe Here]</p>
      </div>
    </section>
  );
};
export default BookMeeting;