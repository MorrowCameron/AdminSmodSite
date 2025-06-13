import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

interface LoginProps {
  handleSuccess: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ handleSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginUser = async (username: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        handleSuccess(data.token);
        navigate('/');
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (username: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("Registration failed. Try a different username.");
      } else {
        setError("Registered successfully! Now log in.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <form onSubmit={(e) => { e.preventDefault(); loginUser(username, password); }}>
        <h2>Enter Username and Password to Access Site</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <div className="loginButtonContainer">
          <button type="submit" disabled={loading}>Login</button>
          <button type="button" onClick={() => registerUser(username, password)} disabled={loading}>
            Register
          </button>
        </div>
        {loading && <p className="status">Please wait...</p>}
        {error && <p className="status error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
