import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const AdminLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header stays at the top */}
      <Header />

      {/* Main content below header */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        {/* Content scrolls if needed */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
