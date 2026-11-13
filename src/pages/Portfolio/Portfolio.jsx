const PortfolioPage = () => {
  return (
    <section style={{ padding: '6rem 5%', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '3rem' }}>All Works</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} style={{ height: '300px', background: 'var(--bg-secondary)', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>[Project Image {item}]</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default PortfolioPage;