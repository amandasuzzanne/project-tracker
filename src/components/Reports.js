import React, { useState, useEffect } from 'react';

function Report() {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedProjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/projects?status=completed');
        const data = await response.json();
        setCompletedProjects(data);
      } catch (error) {
        console.error('Error fetching completed projects:', error);
      }
    };

    fetchCompletedProjects();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const getTasksForProject = (projectId) => {
    const tasksForProject = tasks.filter((task) => task.projectId === projectId);
    console.log('Tasks for Project', projectId, ':', tasksForProject);
    return tasksForProject;
  };

  console.log('Completed Projects:', completedProjects);
  console.log('Tasks:', tasks);

  return (
    <div className="container">
      <h1>Completed Projects Report</h1>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Implementation Date</th>
            <th>Tasks</th>
            <th>Assigned Person</th>
          </tr>
        </thead>
        <tbody>
          {completedProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.implementation_date}</td>
              <td colSpan="2">
                <table>
                  <tbody>
                    {getTasksForProject(project.id).map((task) => (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.assigned}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Report;