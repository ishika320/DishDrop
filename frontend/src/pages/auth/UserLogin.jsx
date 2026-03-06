import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './auth-forms.css'

const UserLogin = () =>{

const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:3000/api/auth/user/login', { email, password }, { withCredentials: true });
      console.log(response.data);
      navigate('/home');
    } catch (err) {
      console.error('Login failed', err.response || err);
      alert(err?.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className="auth-root bg-1">
      <div className="auth-card" role="region" aria-label="User login">
        <div className="left-visual">
          <div className="visual-icon" aria-hidden>🍜</div>
          <div className="logo">DishDrop</div>
          <p>Discover short tasty reels and save favorites.</p>
        </div>

        <div className="auth-form">
          <div className="auth-header">
            <h2>User Login</h2>
          </div>
          <p className="auth-sub">Welcome back — sign in to continue.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input name="email" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label>Password</label>
              <input name="password" type="password" placeholder="Your password" />
            </div>
            <div className="actions">
              <button type="submit" className="primary">Sign in</button>
              <Link to="/user/register" className="ghost">Register</Link>
            </div>
          </form>
          <div className="alt">Don't have an account?
            <Link className="small-link" to="/user/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;