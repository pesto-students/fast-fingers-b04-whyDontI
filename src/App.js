import React from 'react';
import Home from './components/Home/home'
import './App.css';
import GameContextProvider from './contexts/context';

function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <Home></Home>
      </GameContextProvider>
    </div>
  );
}

export default App;
