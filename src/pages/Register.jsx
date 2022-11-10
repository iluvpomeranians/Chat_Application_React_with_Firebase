import React, { useEffect, useState } from "react";
import Add from "../images/Photos-new-icon.png"
import {useNavigate, Link} from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, storage, db } from "../firebase";

const Register = () => {

  const navigate = useNavigate()
  const[err, setErr] = useState(false)

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value; 
    const password = e.target[2].value;
    const file = e.target[3].files[0]; 
    
    try {
      
      const res = await createUserWithEmailAndPassword(auth, email, password)
    
      const storageRef = ref(storage, displayName);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
      

      uploadTask.on(
        (err) => {
         setErr(true);
        }, 
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await updateProfile(res.user, {
                displayName: displayName,
                photoURL: downloadURL,
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid, 
              displayName,
              email,
              photoURL: downloadURL,
            })

            await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate("/");
          });
        }
      );
      
     
      
    } catch (err) {
      
      setErr(true);

    }
      
  }


  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className="logo">Chat App v.2</span>
        <span className="title">Register</span>
      <form onSubmit={handleSubmit}>
            <input type="text" className="text" placeholder="display name" />
            <input type="text" className="email" placeholder='email'/>
            <input type="text" className="password" placeholder='password'/>
            <input style={{display: "none"}} type="file" id="file"/>
            <label htmlFor="file">
                <img src={Add} alt=""/>
                <span>Add an avatar</span>
            </label>
            <button>Sign Up</button>
            {err && <span>Something went wrong!</span> }
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register
