import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

const RootLayout = () => {
  return (
    <>
      <Navbar title="Fruits-CMS"/>
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}

export default RootLayout