import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
    setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || 'Login failed');
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      }
    } catch {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    borderRadius: '0.75rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginTop: '0.25rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    outline: 'none',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    marginTop: '1rem',
    borderRadius: '0.5rem',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    cursor: 'pointer',
  };

  const errorTextStyle = {
    color: '#dc2626',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
          Login
        </h2>

        {serverError && <p style={errorTextStyle}>{serverError}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Email</label>
            <input
              style={inputStyle}
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p style={errorTextStyle}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Password</label>
            <input
              style={inputStyle}
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <p style={errorTextStyle}>{errors.password}</p>}
          </div>

          <button type="submit" style={buttonStyle} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
