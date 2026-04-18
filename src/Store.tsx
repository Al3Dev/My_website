import './App.css';

const Store = () => {
  return (
    <div className="store-page" role="main">
      <div
        className="store-container section-container"
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <h2 style={{ color: '#fff' }}>PRÓXIMAMENTE</h2>
        <p style={{ color: '#888' }}>Merch y productos digitales en camino.</p>
      </div>
    </div>
  );
};

export default Store;
