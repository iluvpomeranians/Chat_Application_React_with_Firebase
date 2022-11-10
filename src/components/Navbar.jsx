import React, { useContext } from 'react'
import ChatMessageIcon from "../images/icons8-love-message-96.png"
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className="logo">Chat App</span>
      <img src={ChatMessageIcon} alt="" />
        <div className="user">
          <img src={currentUser.photoURL} alt="" />
        </div>
       <span>{currentUser.displayName}</span>
      <button onClick={() => signOut(auth)} className="logout"></button>
    </div>
  )
}

export default Navbar
