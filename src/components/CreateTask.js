import React, { useState } from 'react';

function CreateTask({ projects }) {
  const [name, setName] = useState('');
  const [assigned, setAssigned] = useState('');
  const [status, setStatus] = useState('Pending');
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAssignedChange = (e) => {
    setAssigned(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleProjectChange = (e) => {
    setSelectedProjectId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/projects/${selectedProjectId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, assigned, status }),
      });
      if (response.ok) {
        // Redirect or show success message
        console.log('Task created successfully');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h1>Create Task</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="projectSelect">Select Project:</label>
          <select id="projectSelect" value={selectedProjectId} onChange={handleProjectChange}>
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name">Task Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="assigned">Assigned:</label>
          <select id="assigned" value={assigned} onChange={handleAssignedChange}>
            <option value="Stella">Stella</option>
            <option value="Amanda">Amanda</option>
            <option value="Soraqhah">Soraqah</option>
            <option value="Mark">Mark</option>
            <option value="Dennis">Dennis</option>
          </select>
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select id="status" value={status} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CreateTask;
