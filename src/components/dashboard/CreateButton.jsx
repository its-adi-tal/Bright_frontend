import React, {useState} from 'react'
import AddTaskModal from './AddTaskModal'
import { FiPlus } from 'react-icons/fi'
import './CreateButton.css';
import {createTask} from "../../services/taskService";
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { useTaskContext } from '../../context/TaskContext';


export default function CreateButton() {
    const [isOpen, setIsOpen]=useState(false); //to control the button ui
    const {user} = useContext(UserContext);
    const { addTask } = useTaskContext();

    const handleSubmit = async (taskData) => {
    try {
      await addTask(taskData);
    } catch (e) {
      console.error("Failed to create task:", e);
    }
  };

    /*const handleSubmit= async (taskData)=> {
      if(!user){
        alert("Please log in to create a task");
        return;
      }
        const payload = {
          user_id: user.uid,
          title: taskData.title,
          description: taskData.description ?? null,
          due_date: taskData.due_at ?? null,
          difficulty: String(taskData.difficulty ?? 2),
          category: Number.parseInt(taskData.category || "0", 10),
        }
        try {
          const token = await user.getIdToken();
          const res = await createTask(payload, token);
          //onCreated?.(); //parent render
          //toast.success("Task created s ")
          console.log("Task created:", res);
          return res;
        } catch (e) {
          console.error(e);
          alert("Failed to create task");
          throw e;
        }
        
        
        
        
    };*/

  return (
    <>
    <button className='create-button' onClick={()=> setIsOpen(!isOpen)}>
        <FiPlus style={{marginRight:6}}/> Create 
    </button>

    {isOpen && (<AddTaskModal onSubmit={handleSubmit} onClose={() => setIsOpen(false)}/>)}
    </>
  )
}


