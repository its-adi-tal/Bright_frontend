import React, { useState, useEffect }from 'react';
import Dashboard from './components/dashboard/Dashboard';
import Header from "./components/layout/Header/Header";
import { UserContext } from './context/UserContext';
import { TaskProvider } from './context/TaskContext';
import {getAuth,onAuthStateChanged} from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


export default function App() {
  const [user, setUser] = useState(null);
  const auth=getAuth();

  //listerner from fb authentication
  useEffect(()=> {
    const unsubscribe= onAuthStateChanged(auth,(user)=>{
    if(user){
      setUser(user);
    } else {
      setUser(null);
    }
  });
  return () => unsubscribe();
  }, [auth]);
  
  
  const contextValue = { user, setUser};
  return (
    <UserContext.Provider value={contextValue}>
      <TaskProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="app-container">
      <Header />
      <main className="main-content">
        <Dashboard />
      </main>
    </div>
    </TaskProvider> 
    </UserContext.Provider>
  );
}

