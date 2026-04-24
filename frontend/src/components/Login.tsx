import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, User } from 'lucide-react';
import styles from './Login.module.css';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div>
          <h2 className={styles.loginTitle}>
            Sign in to your account
          </h2>
        </div>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <div className={styles.inputGroupStacked}>
            <div className={styles.inputWithIcon}>
              <User className={styles.icon} size={20} />
              <input
                type="text"
                required
                className="input-field input-top"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputWithIcon}>
              <Lock className={styles.icon} size={20} />
              <input
                type="password"
                required
                className="input-field input-bottom"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className={styles.errorMessage}>{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="btn btn-full"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
