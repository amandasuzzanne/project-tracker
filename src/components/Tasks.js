import React, { useState, useEffect } from 'react';
import CreateTask from './CreateTask';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

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

    fetchTasks();
    fetchProjects();
  }, []);

  const handleEditTask = (taskId) => {
    console.log('Editing task:', taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit);
  };

  const handleTaskUpdated = async () => {
    await fetchTasks();
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    console.log('Deleting task:', taskId);
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchTasks();
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getProjectName = (projectId) => {
    const project = projects.find((project) => project.id === projectId);
    return project ? project.name : '';
  };

  return (
    <div>
      <div className="container">
        <h1>Tasks</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Project</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.assigned}</td>
                <td>{task.status}</td>
                <td>{getProjectName(task.projectId)}</td>
                <td>
                  <button onClick={() => handleEditTask(task.id)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateTask projects={projects} editingTask={editingTask} onTaskUpdated={handleTaskUpdated} />
      </div>
    </div>
  );
}

export default Tasks;
