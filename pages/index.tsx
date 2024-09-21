import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hoko</h1>
      <p style={styles.tagline}>Experience the elegance of simplicity.</p>
      <button style={styles.button} onClick={() => window.location.href = '/login'}>
        Sign In
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1a1a1a',
    color: '#fff',
  },
  title: {
    fontSize: '4rem',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '0.1em',
    marginBottom: '1rem',
  },
  tagline: {
    fontSize: '1.2rem',
    color: '#ccc',
    marginBottom: '3rem',
  },
  button: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  buttonHover: {
    backgroundColor: '#005bb5',
  }
};

export default HomePage;
