import React, { useContext } from 'react'
import VideoCall from "../images/icons8-video-call-96.png"
import AddFriends from "../images/icons8-add-user-group-man-man-96.png"
import More from "../images/icons8-menu-squared-96.png"
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const MainChat = () => {

  const {data} = useContext(ChatContext)

  return (
    <div className='mainchat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={VideoCall} alt="" />
          <img src={AddFriends} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default MainChat
