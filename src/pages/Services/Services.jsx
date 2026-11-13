const Services = () => {
  return (
    <section style={{ padding: '6rem 5%', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '3rem' }}>Our Services</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {['Web Design', 'Web Development', 'App Development', 'AI Automation'].map((s, i) => (
          <div key={i} style={{ padding: '3rem', background: 'var(--bg-secondary)', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
            <h2 style={{ marginBottom: '1rem' }}>{s}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Service details go here.</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Services;