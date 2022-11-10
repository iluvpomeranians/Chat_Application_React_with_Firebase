import {useNavigate, Link} from "react-router-dom"
import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../firebase";



const Login = () => {

  const navigate = useNavigate()
  const[err, setErr] = useState(false)

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const email = e.target[0].value; 
    const password = e.target[1].value;
  
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")  
      
    } catch (err) {
      
      setErr(true);

    }
      
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className="logo">David's Chat App v.2</span>
        <span className="title">Login</span>
      <form onSubmit={handleSubmit}>
            <input type="text" className="email" placeholder='email'/>
            <input type="text" className="password" placeholder='password'/> 
            <button>Sign In</button>
            {err && <span>Something went wrong!</span> }
      </form>
      <p>Don't have an account? <Link to="/register">Register!</Link></p>
      </div>
    </div>
  )
}

export default Login
