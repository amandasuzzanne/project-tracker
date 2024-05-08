import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navigation'>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>
          <span>Projects</span>
          <ul>
            <li><Link to="/projects">All Projects</Link></li>
            <li><Link to="/projects/create">Create Project</Link></li>
          </ul>
        </li>
        <li>
          <span>Tasks</span>
          <ul>
            <li><Link to="/tasks">All Tasks</Link></li>
            <li><Link to="/tasks/create">Create Task</Link></li>
          </ul>
        </li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
