import React, { useContext, useState, createContext, useEffect} from "react";
import { UserContext } from "./UserContext";
import * as TaskService from "../services/taskService";
import { toast } from 'react-toastify';
import { setAuthTokenProvider } from "../lib/apiClient";

const TaskContext = createContext();

export function useTaskContext(){
    return useContext(TaskContext);
}

//provider
export function TaskProvider({children}){
    const {user} = useContext(UserContext)
    const [tasksByDay, setTasksByDay] = useState(null);
    //range is for updating the board after delete/create ect
    const [range, setRange]= useState({start:null, end:null}); 
    const [loading, setLoading]=useState(false);
    const [error, setError]= useState(null);


//injecting the token function
useEffect(()=> {
    setAuthTokenProvider(async () => (user ? user.getIdToken() : null), [user]);
},[user]);    


//get tasks by day
const groupByWeekday = (tasks = []) => {
     const grouped = {}; 
        tasks.forEach(task => {
          const d = new Date(task.start_time || task.start || task.due_date || task.date);
          if (Number.isNaN(d.getTime())) return;
          const dayIndex = d.getDay();  
          //const dayIndex = new Date(task.start_time).getDay(); //index of the week day -0 is sunday
          const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex]; //using the index to get the name of the day
          if (!grouped[dayName]) grouped[dayName] = []; //create new array for that day if there is no array 
          grouped[dayName].push(task); //add the task to the day
        });
        return grouped;
  };

//fetch tasks by range
const fetchTasks= async(startStr,endStr)=>{
    if(user){
        setRange({start:startStr, end: endStr});
        setLoading(true);
        setError(null);
    try{
        const {data} = await TaskService.getTasksInRange(user.uid, startStr, endStr);
        console.log(data);
        console.log(">>> fetchTasks range:", startStr, "→", endStr);
      console.log(">>> fetchTasks response data:", data);

        /*
        const tasks = Array.isArray(data) ? data : (data?.data ?? data?.items ?? []);
        if (!Array.isArray(tasks)) {
            throw new Error("Unexpected tasks payload shape");
        }
            */
        setTasksByDay(groupByWeekday(data?.data ?? []));
       
    } catch(e){
        setError(e);
        setTasksByDay(null);
        toast.error("Failed to fetch tasks");
    } finally {
        setLoading(false);
    }
    }

};

const refreshBoard = async () => {
  if (!user || !range.start || !range.end) return;
  await fetchTasks(range.start, range.end);
};

//prefer my own ISO format to avoid user mistakes
const toISO = (d) => d instanceof Date && !Number.isNaN(d.getTime()) ? d.toISOString() : null;

const addTask = async (taskData) => {
    if(!user) {toast.info("Please log in to create a task"); return; }
    const payload ={
        user_id: user.uid,
        title: taskData.title,
        description: taskData.description?.trim() || null,
        due_date: taskData.dueAt ? toISO(taskData.dueAt) : null,
        difficulty: String(taskData.difficulty ?? 2),
        category: Number.parseInt(taskData.category || "0", 10), //category into decimal number
    }
    console.log("payload to POST:", payload);
    try{
        const {data: created }= await TaskService.createTask(payload);
        
        //re-render the tasks board
        toast.success("Task created");
        refreshBoard();
        return created;
    } catch (e) {
        setError(e);
        toast.error(e.data?.message ?? "Failed to create task");
        throw e;
    }
};

const deleteTask = async (task_id) => {
    //console.log("deleteTask called with:", {task_id}); 
    
    setError(null);
    try{
        const response= await fetch(`http://localhost:8000/api/tasks/${task_id}`,{method: "DELETE"});
        if(!response.ok) {
            toast.error("Failed to delete task");
            //throw new Error("Failed to delete task");
        } else {
            toast.success("Task deleted successfuly!");
            //await fetchTasks(userId, startStr, endStr);
            setTasksByDay(prevTasksByDay => {
                const updated ={}
                for(const day in prevTasksByDay){
                    updated[day] = prevTasksByDay[day].filter(task => task.task_id !== task_id)
                }
                return updated;
            });
        }
        
        //await fetch tasks?
    } catch (err){
        setError(err);
    }
    
};

function updateTaskCompleted(tasksByDay, task_id, is_completed) {
  const updated = {};
  for (const day in tasksByDay) {
    updated[day] = tasksByDay[day].map(task =>
      task.task_id === task_id
        ? { ...task, is_completed }
        : task
    );
  }
  return updated;
}

const completeTask = async(task_id,is_completed)=> {
    console.log("completeTask called with:", {task_id, is_completed});

    //immidiate update 
    setTasksByDay(prev => updateTaskCompleted(prev, task_id, !is_completed))
    setError(null);

    try{
        //updating the server
        const response = await fetch(`http://localhost:8000/api/tasks/${task_id}/complete`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ is_completed: !is_completed })
        });
        if(!response.ok) {
            throw new Error("Failed to update task is_complete on server");
        }
    } catch (err){
        setTasksByDay(prev=> updateTaskCompleted(prev,task_id, is_completed));
        setError(err);
        toast.error("Error- task was not marked");
    }
    
};


return(
    <TaskContext.Provider value={{tasksByDay,
    fetchTasks,
    loading,
    setLoading,
    error,
    addTask,
    setTasksByDay,
    deleteTask,
    completeTask,
    refreshBoard,
    }}>
        {children}
    </TaskContext.Provider>
)





}