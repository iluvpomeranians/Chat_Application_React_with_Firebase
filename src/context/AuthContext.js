import { onAuthStateChanged } from "firebase/auth";
import{ createContext } from "react";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) =>{
            setCurrentUser(user);
            console.log(user)
        });

        return() =>{
            unsub();
        }

    }, []);

    return(
        <AuthContext.Provider value={{currentUser}}>
        {children}
        </AuthContext.Provider>
    )

  
    
};