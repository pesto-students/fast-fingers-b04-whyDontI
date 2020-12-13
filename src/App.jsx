import React from 'react';
import { Router } from '@reach/router';
import GameContextProvider from './contexts/context';
import Home from './components/Home/home';
import Arena from './components/Arena/arena';
import Final from './components/Final/final';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './App.css';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <GameContextProvider>
          <Router>
            <Home path="/" />
            <Arena path="/arena" />
            <Final path="/final" />
          </Router>
        </GameContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
