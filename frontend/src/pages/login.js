import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'smileandnod') {
      onLogin();
      navigate('/');
    } else {
      setError('Incorrect password. Try again!');
    }
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
        <h2>Enter Password to Access Site</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
