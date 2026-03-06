import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/nav.css'

export default function TopNav(){
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    axios.get('http://localhost:3000/api/auth/me', { withCredentials: true })
      .then(res => {
        if (cancelled) return
        setUser(res.data.user)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const handleLogout = async () => {
    try {
      if (!user) return
      if (user.role === 'user') await axios.get('http://localhost:3000/api/auth/user/logout', { withCredentials: true })
      else await axios.get('http://localhost:3000/api/auth/food-partner/logout', { withCredentials: true })

      setUser(null)
      navigate('/user/login')
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <header className="top-nav">
      <div className="nav-left">
        <Link to="/home" className="brand">DishDrop</Link>
      </div>

      <div className="nav-right">
        {user ? (
          <div className="user-box">
            <span className="user-name">{user.role === 'user' ? user.data.fullName : user.data.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/user/login">Login</Link>
            <Link to="/user/register">Register</Link>
          </div>
        )}
      </div>
    </header>
  )
}
