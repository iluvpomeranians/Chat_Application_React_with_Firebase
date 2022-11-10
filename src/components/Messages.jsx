import SingleMessage from './SingleMessage'
import { ChatContext } from '../context/ChatContext'
import React, { useContext, useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase';

const Messages = () => {
  const [messages, setMessages] = useState([])
  const {data} = useContext(ChatContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) =>{
      doc.exists() && setMessages(doc.data().messages)
    })

    return ()=>{
      unSub();
    }

  }, [data.chatId])

  console.log(messages)

  return (
    <div className='messages'>
      {messages.map((m)=>(
        <SingleMessage message={m} key={m.id}/>
      ))}
    </div>
  )
}

export default Messages
