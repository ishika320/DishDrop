import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import '../styles/nav.css'

export default function BottomNav(){
  const [user, setUser] = useState(null)

  useEffect(() => {
    let cancelled = false
    axios.get('http://localhost:3000/api/auth/me', { withCredentials: true })
      .then(res => { if (!cancelled) setUser(res.data.user) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  return (
    <nav className="bottom-global-nav">
      <NavLink to="/home" className={({isActive})=> isActive? 'nav-item active':'nav-item'}>Home</NavLink>

      {user && user.role === 'partner' ? (
        <>
          <NavLink to="/create-food" className={({isActive})=> isActive? 'nav-item active':'nav-item'}>Create</NavLink>
          <NavLink to={`/food-partner/${user.data._id}`} className={({isActive})=> isActive? 'nav-item active':'nav-item'}>Profile</NavLink>
        </>
      ) : (
        <NavLink to="/saved" className={({isActive})=> isActive? 'nav-item active':'nav-item'}>Saved</NavLink>
      )}
    </nav>
  )
}
