import React, { useState } from 'react';
import './AddTaskModal.css';
import { FiX, FiCalendar, FiClock, FiEdit2, FiTag } from 'react-icons/fi';
import {MdSpeed} from 'react-icons/md';

export default function AddTaskModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficuly] = useState(2); //1=Easy, 2=Medium, 3=Difficult
  const [category, setCategory] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dueDate, setDueDate] = useState('');

  const toISO = (dateStr, timeStr) => {
    if (!dateStr) return null;
    const now= new Date().toTimeString().slice(0,5)
    const t= timeStr || now;
    const iso = new Date(`${dateStr}T${t}:00`);
    if(isNaN(iso.getTime())) return null;
    return iso.toISOString();
  }

  const handleSubmit = (e) => {
    //e.preventDefault();

    if (!title.trim() || !startDate || !endDate) return alert("Fields are required!");
    
    const payload = {
      title: title.trim(),
      description: description || null,
      category: category || "general",
      difficulty,
      start_time: toISO(startDate, startTime),
      end_time: toISO(endTime || startDate, endDate),
      due_date: dueDate || null,
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}><FiX size={15} /></button>
        <div className="modal-header">
          <h2>Add Task</h2>
        </div>
        <div className="modal-body">
          <div className="input-group">
            <FiTag className="icon" />
            <input 
              type="text" 
              placeholder="Title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>
          <div className="input-group">
            <FiEdit2 className="icon" />
            <textarea 
              placeholder="Description" 
              value={description} 
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FiClock className="icon" />
            <input 
              type="start at" 
              value={startTime} 
              onChange={e => setTime(e.target.value)} 
            />
          </div>
          <div className="input-group">
            <MdSpeed className='icon' />
            <input 
              type="text" 
              placeholder="Difficulty" 
              value={difficulty} 
              onChange={e => setLocation(e.target.value)} 
            />
          </div>
          <div className="input-group">
            <FiCalendar className="icon" />
            <input 
              type="text" 
              placeholder="Category" 
              value={category} 
              onChange={e => setCategory(e.target.value)} 
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="confirm-button" onClick={handleSubmit}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
