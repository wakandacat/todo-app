import React, { useContext, useState } from 'react';
import './App.css';
import Background from './components/Background.jsx';
import Topbar from './components/Topbar.jsx';
import TaskTable from './components/TaskTable.jsx';
import TaskForm from './components/TaskForm.jsx';
import GlobalContext from './components/GlobalContext.jsx';
import ToggleView from './components/ToggleView.jsx';

function App() {

  const {view, setView} = useContext(GlobalContext);

  return (
    <>
      <Background />
      <div id='mainContent'>
        <Topbar />
        <ToggleView />
        {view === "viewTasks" ? (<TaskTable />) : (<TaskForm />)}
      </div>

    </>
  )
}

export default App
