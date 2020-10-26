import React from 'react';
import GameContextProvider from './contexts/context';
import { Router } from "@reach/router";
import Home from './components/Home/home'
import Arena from './components/Arena/arena';
import './App.css';
function App() {
  return (
    <div className="App">
      {/* TODO: https://reactjs.org/docs/error-boundaries.html */}
      <GameContextProvider>
        <Router>
          <Home path="/" />
          <Arena path="/arena" />
        </Router>
        {/* <Arena /> */}
      </GameContextProvider>
    </div>
  );
}

export default App;
