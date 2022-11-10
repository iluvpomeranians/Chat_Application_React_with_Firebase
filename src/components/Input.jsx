import React, { useState } from 'react'
import Upload from "../images/icons8-uploadimage-96.png"
import Attach from "../images/icons8-attach-96.png"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { useContext } from 'react'
import { arrayUnion, Timestamp, updateDoc, doc, serverTimestamp,} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Input = () => {

  const [text, setText] = useState("")
  const [img, setImg] = useState(null)

  const{currentUser} = useContext(AuthContext)
  const{data} = useContext(ChatContext)

  const handleSend = async () => {
      if(img){

        const storageRef = ref(storage, uuid());
      
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          (err) => {
           //setErr(true);
          }, 
          () => {
            
            getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(), 
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                })
              })
            });
          }
        );
        
      
      } else {

        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(), 
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          })
        })

      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]:{
          text,
        },
        [data.chatId+".date"]: serverTimestamp(),
      })

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]:{
          text,
        },
        [data.chatId+".date"]: serverTimestamp(),
      })

      setText("");
      setImg(null);
  }

  // var input = document.getElementById("text");
  // input.addEventListener("keypress", function(event) {
  //   // If the user presses the "Enter" key on the keyboard
  //   if (event.key === "Enter") {
  //     // Cancel the default action, if needed
  //     event.preventDefault();
  //     // Trigger the button element with a click
  //     document.getElementById("button").click();
  //   }
  // });

  return (
    <div className='input'>
      <input type="text" 
             placeholder="Write a message..." 
             onChange={(e)=>setText(e.target.value)}
             value={text}
             
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id="file" class="search" onChange={(e)=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img src={Upload} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input
