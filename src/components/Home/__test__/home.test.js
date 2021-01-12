import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../home';

it ('Renders without any crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div)
})
