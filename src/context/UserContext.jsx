import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState, useEffect, createContext } from "react";



export const UserContext = createContext();

export const UserProvider =({children}) => {
    const [user, setUser]= useState(null); 
    const [userId, setUserId] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const unsubscribe =onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); //if user connected, save the user
            setLoading(false);

        });

        return ()=> unsubscribe();
    },[]);

    const contextValue = { user, setUser, userId, setUserId };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}