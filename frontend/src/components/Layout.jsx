import React from 'react'
import TopNav from './TopNav'
import BottomNav from './BottomNav'
import { Outlet } from 'react-router-dom'

export default function Layout(){
  return (
    <div className="app-layout">
      <TopNav />
      <main className="app-main"><Outlet /></main>
      <BottomNav />
    </div>
  )
}
