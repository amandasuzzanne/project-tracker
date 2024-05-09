import React, { useState, useEffect } from 'react';
import CreateProject from './CreateProject';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleEditProject = (id) => {
    console.log('Editing project:', id);
    const projectToEdit = projects.find((project) => project.id === id);
    setSelectedProject(projectToEdit);
  };

  const handleDeleteProject = async (id) => {
    console.log('Deleting project:', id);
    try {
      const response = await fetch(`http://localhost:3000/projects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted project from the projects array
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
      } else {
        console.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleProjectUpdate = async (updatedProject) => {
    // Fetch projects again to update the list
    try {
      const response = await fetch('http://localhost:3000/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Projects</h1>
        <table className="response-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Institution</th>
              <th>Implementation Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.institution}</td>
                <td>{project.implementation_date}</td>
                <td>{project.status}</td>
                <td>
                  <button onClick={() => handleEditProject(project.id)}>Edit</button>
                  <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateProject selectedProject={selectedProject} onProjectUpdate={handleProjectUpdate} />
      </div>
    </div>
  );
}

export default Projects;
