import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Reports from './components/Reports';
import Navbar from './components/NavBar';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div><br />
          <Navbar />
          <br />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
