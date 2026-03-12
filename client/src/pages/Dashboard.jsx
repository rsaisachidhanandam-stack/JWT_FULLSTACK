import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        return JSON.parse(userString);
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    // NEW: get fresh user data from backend using api
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me'); // adjust to your actual route
        // assuming backend returns { user: {...} }
        if (res.data.user) {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
      } catch (err) {
        console.error('Fetch user error:', err);
        // if 401 happens, api.js interceptor will already log out & redirect
      }
    };

    fetchUser();
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
