import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './auth-forms.css'

export default function FoodPartnerLogin(){
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await axios.post('http://localhost:3000/api/auth/food-partner/login', { email, password }, { withCredentials: true });
      console.log('Partner login', res.data);
      alert('Login successful');
      e.target.reset();
      navigate('/create-food');
    } catch (err) {
      console.error('Login error', err);
      alert('Login failed');
    }
  };

  return (
    <div className="auth-root bg-3">
      <div className="auth-card" role="region" aria-label="Food partner login">
        <div className="left-visual">
          <div className="visual-icon" aria-hidden>
            <svg className="icon-chef" viewBox="0 0 24 24" width="48" height="48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <title>Chef hat</title>
              <g fill="none" fillRule="evenodd">
                <path d="M4 16c0-3.314 2.686-6 6-6 .33 0 .654.024.97.07C11.66 9.9 13.242 9 15 9c2.761 0 5 2.239 5 5v2H4v-?" fill="#F97316" opacity="0.0" />
                <path d="M6.5 11C5.12 11 4 9.88 4 8.5 4 7.12 5.12 6 6.5 6c.64 0 1.24.22 1.72.58C8.73 5.06 10.59 4 12.75 4 15.6 4 18 6.07 18 8.5c0 1.8-1.14 3.32-2.7 3.97C14.85 13.44 13.37 14 12 14c-2.48 0-4.5-2.02-4.5-3z" fill="#fff"/>
                <path d="M5 16c0-3.866 3.134-7 7-7s7 3.134 7 7v2H5v-2z" fill="#111827" opacity="0.08"/>
                <path d="M8 18h8v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-1z" fill="#0b1220"/>
              </g>
            </svg>
          </div>
          <div className="logo">DishDrop Partner</div>
          <p>Manage your listings and upload tasty reels.</p>
        </div>

        <div className="auth-form">
          <div className="auth-header">
            <h2>Partner Login</h2>
          </div>
          <p className="auth-sub">Sign in to manage your menu and orders.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input name="email" type="email" placeholder="partner@example.com" />
            </div>
            <div>
              <label>Password</label>
              <input name="password" type="password" placeholder="Your password" />
            </div>
            <div className="actions">
              <button type="submit" className="primary">Sign in</button>
              <Link to="/" className="ghost">Back</Link>
            </div>
          </form>
          <div className="alt">Need an account?
            <Link className="small-link" to="/user/food-partner/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}