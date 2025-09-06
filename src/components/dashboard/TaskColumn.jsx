import React, { useState } from 'react';
import TaskCard from './TaskCard';
import './TaskColumn.css'


export default function TaskColumn({ day, tasks,onEditTask,onDeleteTask,onCompleteTask }) {
    //tasks is an array of tasks

  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

function handleDeleteRequest(task) {
  setTaskToDelete(task);
  setShowModal(true);
}

function handleConfirmDelete() {
  deleteTask(taskToDelete); 
  setTaskToDelete(null);
}


  return (
    <>
    <div className="day-column">
      <h3 className="day-title">{day}</h3>
      {tasks.length === 0 ? (
  <div className="empty-placeholder">No tasks</div>
) : tasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          onEdit={() => onEditTask(task)}
          onDelete={() => onDeleteTask(task)}
          onComplete={(taskObj,current_completed) => onCompleteTask(taskObj,current_completed)}
        />
      ))}
      
    </div>
    </>
  );
}

