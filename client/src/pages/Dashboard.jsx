import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    if (!token || !userString) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userString);
      setUser (parsedUser);
    } catch (error ) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Welcome, {user.name || user.email}
      </h1>
      <p>Email: {user.email}</p>
      <p>User ID: {user._id}</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          backgroundColor: '#dc2626',
          color: '#ffffff',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
