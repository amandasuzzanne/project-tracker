import React, { useState, useEffect } from 'react';

function CreateTask({ projects, editingTask, onTaskUpdated }) {
  const [name, setName] = useState('');
  const [assigned, setAssigned] = useState('');
  const [status, setStatus] = useState('pending');
  const [selectedProjectId, setSelectedProjectId] = useState('');

  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setAssigned(editingTask.assigned);
      setStatus(editingTask.status);
      setSelectedProjectId(editingTask.projectId);
    }
  }, [editingTask]);

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
      const method = editingTask ? 'PUT' : 'POST';
      const url = editingTask ? `http://localhost:3000/tasks/${editingTask.id}` : `http://localhost:3000/projects/${selectedProjectId}/tasks`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, assigned, status, projectId: selectedProjectId }),
      });

      if (response.ok) {
        // Trigger the update of the task list
        onTaskUpdated();
        console.log('Task created successfully');
      } else {
        console.log("Failed to create/update task");
      }
    } catch (error) {
      console.error('Error encountered:', error);
    }
  }

  return (
    <div>
      <h1>{editingTask ? 'Edit Task' : 'Create Task'}</h1>
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
            <option value="pending">pending</option>
            <option value="in progress">in progress</option>
            <option value="completed">completed</option>
          </select>
        </div>
        <button type="submit">{editingTask ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
}

export default CreateTask;
