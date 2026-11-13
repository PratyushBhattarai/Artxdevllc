const Team = () => {
  return (
    <section style={{ padding: '6rem 5%', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '3rem' }}>Our Team</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '100%', height: '250px', background: '#222', borderRadius: '10px', marginBottom: '1rem' }}></div>
            <h3>[Full Name]</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Role / Title</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Team;