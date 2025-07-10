import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Background from './components/Background.jsx';
import Topbar from './components/Topbar.jsx';
import Task from './components/Task.jsx';
import TaskTable from './components/TaskTable.jsx';

function App() {

  return (
    <>
      <Background />
      <div id='mainContent'>
        <Topbar />
        <TaskTable />
      </div>

    </>
  )
}

export default App
