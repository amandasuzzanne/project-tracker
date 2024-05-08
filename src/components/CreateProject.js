import React, { useState, useEffect } from 'react';

function CreateProject({ selectedProject, onProjectUpdate }) {
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [implementationDate, setImplementationDate] = useState('');
  const [status, setStatus] = useState('pending');


  useEffect(() => {
    if (selectedProject) {
      setName(selectedProject.name);
      setInstitution(selectedProject.institution);
      setImplementationDate(selectedProject.implementation_date);
    }
  }, [selectedProject]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleInstitutionChange = (e) => {
    setInstitution(e.target.value);
  };

  const handleImplementationDateChange = (e) => {
    setImplementationDate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      name,
      institution,
      implementation_date: implementationDate,
      status: 'current',
    };
    if (selectedProject) {
      projectData.id = selectedProject.id;
      try {
        // Update existing project
        const response = await fetch(`http://localhost:3000/projects/${selectedProject.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        });
        if (response.ok) {
          onProjectUpdate(projectData); // Call onProjectUpdate function with updated project data
        } else {
          console.error('Failed to update project');
        }
      } catch (error) {
        console.error('Error updating project:', error);
      }
    } else {
      try {
        // Create new project
        const response = await fetch('http://localhost:3000/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        });
        if (response.ok) {
          // Redirect or show success message
        } else {
          console.error('Failed to create project');
        }
      } catch (error) {
        console.error('Error creating project:', error);
      }
    }
  };

  return (
    <div>
      <h1>{selectedProject ? 'Edit Project' : 'Create Project'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Project Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="institution">Name of Institution:</label>
          <input type="text" id="institution" value={institution} onChange={handleInstitutionChange} />
        </div>
        <div>
          <label htmlFor="implementationDate">Implementation Date:</label>
          <input type="date" id="implementationDate" value={implementationDate} onChange={handleImplementationDateChange} />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select id="status" value={status} onChange={handleStatusChange}>
            <option value="pending">pending</option>
            <option value="in progress">in progress</option>
            <option value="completed">completed</option>
          </select>
        </div>
        <button type="submit">{selectedProject ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
}

export default CreateProject;
