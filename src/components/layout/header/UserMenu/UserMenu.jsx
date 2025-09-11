import React, {useContext} from "react";
import userImg from './user.png';
import './UserMenu.css'; 
import {UserContext} from '../../../../context/UserContext.jsx'
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../../../lib/firebase.js";
import {useAuthHandler} from "../../../../hooks/useAuthHandler.js"

export default function UserMenu() {
  const {user} = useContext(UserContext);
  const {login, logout}=useAuthHandler()


if(!user){
    return (
      <button onClick={login}>Login with Google</button>
    )
  }

  return (
    <div className="user-menu">
      
      <img src={user?.photoURL || userImg} alt="User Avatar" className="avatar"/>
      <span className="greeting">
        Hello {user?.displayName || "Friend"}
        </span>
      <svg className="arrow-icon" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z" />
      </svg>

      <div className="dropdown">
        <a href="/profile">Profile</a>
        {user && (
    <button onClick={logout} className="logout-button">
      Logout
    </button>
  )}
      </div>
    </div>
  );
}
