import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './auth-forms.css'

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;
    
    try {
      const response = await axios.post('http://localhost:3000/api/auth/food-partner/register', {
        name: businessName,
        contactName,
        phone,
        email,
        password,
        address,
      }, { withCredentials: true });

      console.log(response.data);
      navigate('/create-food');
    } catch (error) {
      console.error('There was an error registering!', error);
      alert(error?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-root bg-4">
      <div className="auth-card" role="region" aria-label="Partner sign up">
        <div className="left-visual">
          <div className="visual-icon" aria-hidden>🥘</div>
          <div className="logo">DishDrop Partner</div>
          <p>Grow your business with our platform.</p>
        </div>

        <div className="auth-form">
          <div className="auth-header">
            <h2>Partner sign up</h2>
            <div className="switch">Switch: <Link to="/user/register">User</Link> · <span>Food partner</span></div>
          </div>

          <p className="auth-sub">Grow your business with our platform.</p>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Business Name</label>
              <input name="businessName" type="text" placeholder="Tasty Bites" />
            </div>

            <div className="two-col">
              <div>
                <label>Contact Name</label>
                <input name="contactName" type="text" placeholder="Jane Doe" />
              </div>
              <div>
                <label>Phone</label>
                <input name="phone" type="tel" placeholder="+1 555 123 4567" />
              </div>
            </div>

            <div>
              <label>Email</label>
              <input name="email" type="email" placeholder="business@example.com" />
            </div>

            <div>
              <label>Password</label>
              <input name="password" type="password" placeholder="Create password" />
            </div>

            <div>
              <label>Address</label>
              <input name="address" type="text" placeholder="123 Market Street" />
            </div>

            <div className="actions">
              <button type="submit" className="primary">Create Partner Account</button>
              <Link to="/" className="ghost">Back</Link>
            </div>
          </form>

          <div className="alt">Already a partner? <Link className="small-link" to="/user/food-partner/login">Sign in</Link></div>
        </div>
      </div>
    </div>
  );
}

export default FoodPartnerRegister;