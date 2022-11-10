import React, { useContext, useState } from 'react'
import { collection, query, where, getDoc, setDoc, doc, updateDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { async } from '@firebase/util';
import { AuthContext } from '../context/AuthContext';

const Search = () => {
  
  const [userName, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () =>{
    const q = query(
      collection(db, "users"), 
      where("displayName", "==", userName)
      );

      try {

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        setUser(doc.data());
});
      } catch (err) {
        setErr(true)
      }     
  };

  const handleKey =(e)=>{
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () =>{
    //check whether the group (chats collection in firestore) exists, if not create
    const combinedID = currentUser.uid > user.uid 
    ? currentUser.uid + user.uid 
    : user.uid + currentUser.uid

    try {
      const res = await getDoc(doc(db, "chats", combinedID))
      if(!res.exists()){
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedID), {messages: []})

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedID+".userInfo"]: {
            uid:user.uid, 
            displayName: user.displayName,
            photoURL: user.photoURL,
          
          },
          [combinedID+".date"]:serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedID+".userInfo"]: {
            uid:currentUser.uid, 
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          
          },
          [combinedID+".date"]:serverTimestamp()
        });

      }
    } catch (err) {
      
    }
    
    setUser(null)
    setUsername("")
    //create user chats
  }
  
  return (
    <div className='search'>
      <div className="searchForm">
        <input 
          type="text" 
          placeholder='Find A User...' 
          onKeyDown={handleKey} 
          onChange={(e)=>setUsername(e.target.value)}
          value={userName} />
        {err && <span>User Not Found!</span>}
        {user && <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>} 
      </div>
    </div>
  )
}

export default Search
