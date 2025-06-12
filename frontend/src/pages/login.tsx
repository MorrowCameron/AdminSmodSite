import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Replace with actual authentication logic
    if (password === 'smileandnod') {
      onLogin();
      navigate('/');
    } else {
      setError('Incorrect password. Try again!');
    }
  };

  // TODO: Replace with actual registration logic
  const handleRegister = () => {
    // Registration logic here
    alert('Registration functionality not implemented.');
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
        <h2>Enter Username and Password to Access Site</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="loginButtonContainer">
          <button type="submit">Login</button>
          <button type="button" onClick={handleRegister}>Register</button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
