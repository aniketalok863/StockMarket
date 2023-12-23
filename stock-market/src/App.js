// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import StockDashboard from './components/StockDashboard';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user.username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div>
        <Navbar username={loggedInUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<StockDashboard />} />
          <Route path="/dashboard" element={<StockDashboard />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />} // Ensure onLogin is passed correctly
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
