import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useTaskContext } from '../../context/TaskContext'
import TaskColumn from './TaskColumn';
import './WeeklyBoard.css';

export default function WeeklyBoard() {
  //const [tasksByDay, setTasksByDay] = useState(null);
  const {user}= useContext(UserContext);
  const {tasksByDay,fetchTasks,deleteTask,completeTask,loading,error, setLoading}= useTaskContext();

  //calculating the week range
  const today= new Date(); //number of todays day 0-is sunday
  const start= new Date(today); //copy of today
  start.setDate(today.getDate() - today.getDay()); //returns the last sunday
  const end= new Date(start);
  end.setDate(start.getDate()+6); //adds 6 more days


  const startISO = start.toISOString();
  const endISO = end.toISOString();

  useEffect(() => {
    if (!user) return; //no fetching if user isnt connected
    fetchTasks(startISO,endISO); //dependency in user- each time user changes it renders
  },[user]);

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const EMPTY_WEEK = { Sun: [], Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [] };
const week = (tasksByDay && typeof tasksByDay === 'object')
  ? { ...EMPTY_WEEK, ...tasksByDay }
  : EMPTY_WEEK;

if (!user) return <p>Please sign in to view your weekly board.</p>;
if (loading) {
   return <p>Loading tasks...</p>;
}
if (error) {
  return <p style={{ color: 'red' }}>{error.message || "Failed to load tasks"}</p>;
}


return (
    
    <div className="weekly-board-wrapper">
      {days.map(day => (
      <TaskColumn key={day} 
      day={day} 
      tasks={week[day]}
      onEditTask={(task) => alert(`Edit ${task.title}`)}
      onDeleteTask={(task) => {
        if(window.confirm(`Delete ${task.title}?`)){
          deleteTask(task.task_id);
        }}}
      onCompleteTask={(task, current_completed) => completeTask(task.task_id,current_completed,user.uid,startISO,endISO)}
       />
      ))}
    </div>
  );
}
