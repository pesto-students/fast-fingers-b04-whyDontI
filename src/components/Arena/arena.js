import React, { useContext, useState } from 'react';
import Header from '../Header/header';
import History from '../History/history'
import Timer from '../Timer/timer';
import './arena.css'

const Arena = () => {
  return (
    <div className="arenaContainer">
      <div className="header">
        <Header></Header>
      </div>
      <div className="history">
        <History></History>
      </div>
      <div className="arena">
        <Timer />
        <h1>Arena</h1>
        <input type="text" className="inputBox" />
      </div>
    </div>
  )
}

export default Arena;