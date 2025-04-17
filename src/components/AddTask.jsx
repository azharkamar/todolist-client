import React, { useState } from 'react';
import axios from 'axios';

function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, {
        title,
        completed: false
      });
      onTaskAdded(res.data);
      setTitle('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Add a new task"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTask;
