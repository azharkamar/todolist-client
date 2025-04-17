import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/tasks`)
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  };

  const handleTaskAdded = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleTaskToggle = (updatedTask) => {
    setTasks(prev =>
      prev.map(task => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const handleTaskDelete = (id) => {
    setTasks(prev => prev.filter(task => task._id !== id));
  };  

  return (
    <div>
      <h2>Todo List</h2>
      <AddTask onTaskAdded={handleTaskAdded} />
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} onToggle={handleTaskToggle} onDelete={handleTaskDelete} />
      ))}
    </div>
  );
}

export default TaskList;
