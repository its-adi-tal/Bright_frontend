import React, { useState } from 'react';
import './AddTaskModal.css';
import { FiX, FiCalendar, FiClock, FiEdit2, FiTag, FiSmile, FiActivity, FiTrendingUp } from 'react-icons/fi';
import {MdSpeed} from 'react-icons/md';
import TaskDatePicker from '../dashboard/TaskDatePicker'

export default function AddTaskModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState(2); //1=Easy, 2=Medium, 3=Difficult
  const [category, setCategory] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dueAt, setDueAt] = useState(null); // Date | null

  const DIFFICULTY_OPTIONS = [
    {value: 1, difficulty_lable: 'Easy', Icon: FiSmile },
    {value: 2, difficulty_lable: 'Medium', Icon: FiActivity},
    {value: 3, difficulty_lable: 'Hard', Icon: FiTrendingUp},
  ];

  /*
  const toISO = (dateStr, timeStr) => {
    if (!dateStr) return null;
    const now= new Date().toTimeString().slice(0,5)
    const t= timeStr || now;
    const iso = new Date(`${dateStr}T${t}:00`);
    if(isNaN(iso.getTime())) return null;
    return iso.toISOString();
  }
  */

  const toISO = (d) => d instanceof Date && !Number.isNaN(d.getTime()) ? d.toISOString() : null;

  const handleSubmit = (e) => {
    e.preventDefault();

    //if (!title.trim() || !startDate || !endDate) return alert("Fields are required!");
    if (!title.trim()) return alert("Title is required");

    const payload = {
      title: title.trim(),
      description: description || null,
      category: (category || "general").trim(),
      difficulty,
      //start_time: toISO(startDate, startTime),
      //end_time: toISO(endTime || startDate, endTime),
      due_at: toISO(dueAt),
    };
      console.log("📦 payload before onSubmit:", payload);

    onSubmit(payload);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}><FiX size={12} /></button>
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
              className='text-input'
            />
          </div>
          <div className="input-group">
            <FiEdit2 className="icon" />
            <textarea 
              placeholder="Description" 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              className='text-input'
            />
          </div>
          <div className="input-group">
            <FiClock className="icon" />
            <TaskDatePicker value={dueAt} 
            onChange={(d) => {
              console.log("onChange DatePicker:", d);
              setDueAt(d)}} />
          </div> 

          <div className="input-group">
            <MdSpeed className='icon' />
            <div className='pill-group' role='radiogroup' aria-label="Difficulty">
              {DIFFICULTY_OPTIONS.map(({value, difficulty_lable, Icon}) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={difficulty === value}
                  onClick={() => setDifficulty(value)}
                  className={`pill-btn ${difficulty === value ? "active" : ""}`}
                >
                <Icon className='pill-icon' />
                <span className='pill-lable'>{difficulty_lable}</span>
                </button>
              ))}
            </div>
            
          </div>


          <div className="input-group">
            <FiCalendar className="icon" />
            <input 
              type="text" 
              placeholder="Category" 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className='text-input' 
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
