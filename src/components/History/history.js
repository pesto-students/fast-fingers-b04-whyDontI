import React, { useContext, useState } from 'react';
import './history.css'

const History = () => {
  return (
    <div className="historyContainer">
      <div className="heading">Score Board</div>
      <div className="gamelist">
        <span className="">Game 1: 1:14</span>
        <span className="">Game 2: 1:14</span>
        <span className="">Game 3: 1:14</span>
        <span className="">Game 4: 1:14</span>
      </div>
    </div>
  )
}

export default History;