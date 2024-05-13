import React, { useState } from 'react';
import { useHistory, Navigate} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import '../css/LoginForm.css';

const LoginForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3002/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Login successful');
        history.push('/user-list'); // Redirect to userlist page
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again later.');
    }

    setLoading(false);
  };

  const handleForgotPassword = async () => {
    const email = prompt('Enter your email to reset password:');
    if (!email) return;

    try {
      const response = await fetch('http://localhost:3002/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.error('Error sending reset password email:', error);
      alert('Error sending reset password email. Please try again later.');
    }
  };

  if (redirect) {
    return <Redirect to="/user-list" />;
  }

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button type="button" onClick={handleForgotPassword}>
          Forgot Password
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

