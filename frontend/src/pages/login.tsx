import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
