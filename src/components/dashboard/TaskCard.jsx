import React from 'react';
import './TaskCard.css'; 
import { FiEdit2,FiTrash2,FiCheckCircle } from 'react-icons/fi';


export default function TaskCard({ task, onEdit, onDelete, onComplete }) {
  return (
    <div className={`task-card ${task.categoryColor || 'purple'}`}>
      
      <div className="task-title">{task.title}</div>
      <div className="task-desc">{task.description}</div>
      <div className="task-actions">
        <button className="task-action" title="Edit" onClick={onEdit}><FiEdit2 size={15}/></button>
        <button className="task-action" title="Delete" onClick={onDelete}><FiTrash2 size={15}/></button>
      </div>
      <div className='task-check' onClick={() => {onComplete(task,task.is_completed)}}>
  {task.is_completed ? (
    <FiCheckCircle size={14} className="task-checkmark" />
  ) : (
    <span className='task-circle'></span>
  )}
</div>
      
    </div>
  );
}
