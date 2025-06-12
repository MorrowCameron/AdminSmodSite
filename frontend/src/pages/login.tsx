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
  const navigate = useNavigate();

  const loginUser = async (username: string, password: string) => {
    console.log("logging in!");
    const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      handleSuccess(data.token); // Call handleSuccess on 200 response
      navigate('/'); // Navigate to home page after successful login
    } else {
      console.log("Login failed!");
      setError("Login failed. Please check your credentials."); // Handle failure
    }
  };

  const registerUser = (username: string, password: string) => {
    console.log("registering!");
    return fetch("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
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
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="loginButtonContainer">
          <button type="submit">Login</button>
            <button type="button" onClick={() => registerUser(username, password)}>Register</button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
