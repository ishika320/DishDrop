import React from 'react'
import { Link } from 'react-router-dom'
import './chooseauth.css'

export default function ChooseAuth(){
  return (
    <div className="choose-auth-root">
      <div className="brand">DishDrop</div>

      <div className="choose-grid">
        <div className="choose-card card-left">
          <div className="card-head">
            <h3>User</h3>
            <div className="tag">Enjoy</div>
          </div>
          <p className="muted">Browse reels, like and save your favorites.</p>
          <div className="actions">
            <Link className="btn primary" to="/user/login">Login</Link>
            <Link className="btn outline" to="/user/register">Register</Link>
          </div>
        </div>

        <div className="choose-card card-right">
          <div className="card-head">
            <h3>Food Partner</h3>
            <div className="tag partner">Partner</div>
          </div>
          <p className="muted">Upload short videos of your menu and manage listings.</p>
          <div className="actions">
            <Link className="btn primary" to="/user/food-partner/login">Login</Link>
            <Link className="btn outline" to="/user/food-partner/register">Register</Link>
          </div>
        </div>
      </div>

      <div className="bg-orbs" aria-hidden></div>
    </div>
  )
}
