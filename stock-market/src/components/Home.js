// components/Home.js
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import StockDashboard from './StockDashboard';

const Home = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  return (
    <div>
      <h1>Stock Market Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <StockDashboard />
        </div>
      ) : (
        <div>
          <Login onLogin={handleLogin} />
          <Signup onSignup={handleSignup} />
        </div>
      )}
    </div>
  );
};

export default Home;
