import React from 'react';
import axios from 'axios';

function TaskItem({ task, onToggle, onDelete }) {
  const handleCheckboxChange = async () => {
    const updatedTask = { ...task, completed: !task.completed };
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`, updatedTask);
    onToggle(res.data);
  };

  const handleDelete = async () => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`);
    onDelete(task._id);
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleCheckboxChange}
      />
      <span
        className="task-title"
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      >
        {task.title}
      </span>
      <button onClick={handleDelete}>❌</button>
    </div>
  );
}

export default TaskItem;
