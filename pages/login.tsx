import React, { useState } from 'react';
import Link from 'next/link'; // Import Link from next/link

const Login = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  console.log("hi")
  console.log(email);
  console.log(password);

  const inputName = email;
  const inputPassword = password;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:3001/api/auth', {
        method: 'POST',
        body: JSON.stringify({
            username: inputName,
            password: inputPassword
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        credentials: 'include', // Include credentials (cookies)
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        // Optionally, redirect to the dashboard or another page

        window.location.href = "/dashboard";
      } else {
        setErrorMessage(data.message || 'Error logging in');
        console.error('Error logging in:', data);
      }
    } catch (error) {
      setErrorMessage('Server error, please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Hoko Login</h2>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <div style={styles.inputContainer}>
          <label style={styles.label}>Username</label>
          <input
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Login</button>

        {/* Link to the signup page */}
        <div style={styles.redirectText}>
          Don’t have an account?{' '}
          <Link href="/signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1a1a1a',
  },
  form: {
    backgroundColor: '#2e2e2e',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
  },
  inputContainer: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#ccc',
    fontSize: '1rem',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#333',
    border: '1px solid #444',
    borderRadius: '5px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  redirectText: {
    marginTop: '1rem',
    color: '#bbb',
    fontSize: '0.9rem',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
};

export default Login;
