import React from 'react';
import './NavBar.css';


function Navbar() {
  return (
    <div className='navigation'>
      <nav>
        <a href="/">Home</a>
        <a href="/projects">Projects</a>
        <a href="/tasks">Tasks</a>
        <a href="/reports">Reports</a>
      </nav>
    </div>


  );
}

export default Navbar;
