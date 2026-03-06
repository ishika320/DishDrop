import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './auth-forms.css'

const UserRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:3000/api/auth/user/register', {
        fullName,
        email,
        password,
      }, {
        withCredentials: true,
      });

      console.log(response.data);
      navigate('/home');
    } catch (err) {
      console.error('Registration failed', err.response || err);
      alert(err?.response?.data?.message || 'Registration failed');
    }
  };
  return (
    <div className="auth-root bg-2">
      <div className="auth-card" role="region" aria-label="User registration">
        <div className="left-visual">
          <div className="visual-icon" aria-hidden>🥗</div>
          <div className="logo">DishDrop</div>
          <p>Create an account to order delicious food.</p>
        </div>

        <div className="auth-form">
          <div className="auth-header">
            <h2>User Register</h2>
          </div>
          <p className="auth-sub">Create an account to order delicious food.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input type="text" name="fullName" placeholder="Your full name" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" placeholder="you@example.com" />
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="password" placeholder="Choose a password" />
            </div>
            <div className="actions">
              <button type="submit" className="primary">Register</button>
              <Link to="/" className="ghost">Back</Link>
            </div>
          </form>
          <div className="footer-note">By continuing you agree to our terms.</div>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;