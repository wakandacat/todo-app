import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Background from './components/Background.jsx';
import Topbar from './components/Topbar.jsx';

function App() {

  return (
    <>
      <Background />
      <div id='mainContent'>
        <Topbar />
          <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
      </div>

    </>
  )
}

export default App
