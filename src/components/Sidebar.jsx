import React from 'react'
import ChatsMenu from './ChatsMenu'
import Navbar from './Navbar'
import Search from './Search'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <ChatsMenu/>
    </div>
  )
}

export default Sidebar
