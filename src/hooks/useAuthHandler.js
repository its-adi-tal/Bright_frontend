import React, {useContext} from "react";
import { signInWithPopup } from "firebase/auth";
import {auth, provider} from "../services/firebase"
import {UserContext} from "../context/UserContext"

export const useAuthHandler= () => {
    const {setUser}= useContext(UserContext);

    const login = async() => {
        try{
            const result = await signInWithPopup(auth, provider)
            const user= result.user;

            if (!user) throw new Error("No user returned from Firebase"); //if undefined

            //updating the app with connected user
            setUser(user);

            //sending to backend
            const response= await fetch("http://localhost:8000/api/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    //photoURL: user.photoURL || null,
                }),
            });

            //check logical errors 
            if(!response.ok){
                const errorData = await response.json();
                console.error("Server error:", errorData.detail || response.status);
                throw new Error("Failed to save user in backend");
            }
        }
        
        catch  (error){
                console.error("Login failed", error);
        
        }
    };
        
    const logout = async ()=> {
        try {
            await auth.signOut();
            setUser(null);
        } catch (error) {
                console.error("Logout failed:", error.message)
        }
    
    };

    return {login, logout}
};
