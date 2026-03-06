import React from 'react';

export default function ChooseRegister(){
  return (
    <div className="auth-root">
      <div className="auth-card" role="region" aria-label="Choose register">
        <div className="auth-header">
          <h2>Create an account</h2>
        </div>
        <p className="auth-sub">Choose how you'd like to register.</p>

        <div className="register-choices">
          <div className="choice">
            <h3>Customer</h3>
            <p>Order food, save favourites, and track deliveries.</p>
            <a className="primary" href="/user/register">Register as User</a>
          </div>

          <div className="choice">
            <h3>Food Partner</h3>
            <p>Manage your menu, orders and partner dashboard.</p>
            <a className="primary" href="/user/food-partner/register">Register as Partner</a>
          </div>
        </div>

        <div className="alt">Already have an account? <a className="small-link" href="/login">Sign in</a></div>
      </div>
    </div>
  );
}
