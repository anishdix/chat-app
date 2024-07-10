//basic login component
import React, { useState } from 'react';
import { login } from '../../services/api';
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(username, password);
      onLogin(token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Login</button>
    </form>
  );
};

export default Login;