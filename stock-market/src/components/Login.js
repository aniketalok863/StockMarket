// components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Basic validation, replace with your own validation logic
    if (username && password) {
      // Simulate successful login
      onLogin({ username });

      // Redirect to the dashboard page
      navigate('/dashboard');
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button type="button" className="btn btn-primary mx-3" onClick={handleLogin}>
            Login
          </button>
          <Link to="/signup" className="btn btn-primary mx-3">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
