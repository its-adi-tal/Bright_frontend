import React, {useState} from 'react'
import AddTaskModal from './AddTaskModal'
import { FiPlus } from 'react-icons/fi'
import './CreateButton.css';


export default function CreateButton() {
    const [isOpen, setIsOpen]=useState(false);

    const handleSubmit= (taskData)=> {
        console.log('New task submitted: ',taskData);
    };

  return (
    <>
    <button className='create-button' onClick={()=> setIsOpen(!isOpen)}>
        <FiPlus style={{marginRight:6}}/> Create 
    </button>

    {isOpen && (<AddTaskModal onSubmit={handleSubmit} onClose={() => setIsOpen(false)}/>)}
    </>
  )
}


