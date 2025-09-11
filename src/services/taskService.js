import {apiClient} from "../lib/apiClient";

const toISO = (d) => {
  const dd = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(dd.getTime())) throw new Error("Invalid date");
  return dd.toISOString();
};

export const createTask = (payload) => apiClient.post("/tasks/create_task", payload);

export const getTasksInRange = (userId, start, end) => {
    const startIso = toISO(start);
    const endIso = toISO(end);
    return apiClient.get(
        `/tasks/${encodeURIComponent(userId)}/range?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`
    );
    
};

/*const grouped = {}; //object - each day has tasks array
        data.data.forEach(task => {
          const dayIndex = new Date(task.start_time).getDay(); //index of the week day -0 is sunday
          const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex]; //using the index to get the name of the day
          
          if (!grouped[dayName]) grouped[dayName] = []; //create new array for that day if there is no array 
          grouped[dayName].push(task); //add the task to the day
        });
        setTasksByDay(grouped); //update the task state with tasks seprated to days arrays
    */