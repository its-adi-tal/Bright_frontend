import React, { useContext, useState, createContext} from "react";
import { toast } from 'react-toastify';

const TaskContext = createContext();

export function useTaskContext(){
    return useContext(TaskContext);
}

//provider
export function TaskProvider({children}){
    const [tasksByDay, setTasksByDay] = useState(null);
    const [loading, setLoading]=useState(false);
    const [error, setError]= useState(null);


//fetch tasks by range
const fetchTasks= async(userId, startStr,endStr)=>{
    if(userId){
    setLoading(true);
    setError(null);
    try{
        const response= await fetch(`http://localhost:8000/api/tasks/${userId}/range?start=${startStr}&end=${endStr}`);
        const data= await response.json();
        
        const grouped = {}; //object - each day has tasks array
        data.data.forEach(task => {
          const dayIndex = new Date(task.start_time).getDay(); //index of the week day -0 is sunday
          const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex]; //using the index to get the name of the day
          
          if (!grouped[dayName]) grouped[dayName] = []; //create new array for that day if there is no array 
          grouped[dayName].push(task); //add the task to the day
        });
        setTasksByDay(grouped); //update the task state with tasks seprated to days arrays
    } catch(err){
        setError(err);
        setTasksByDay(null);
    }
    setLoading(false);
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
    setTasksByDay,
    deleteTask,
    completeTask,
    }}>
        {children}
    </TaskContext.Provider>
)





}