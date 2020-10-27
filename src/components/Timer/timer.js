import React, { useEffect, useState } from 'react';
import './timer.css'

const Timer = (props) => {
  let [timeToBeShown, setTimeToBeShown] = useState("--:--")
  let [strokeDashArray, setStrokeDashArray] = useState("283")
  let [timeLimit, setTimeLimit] = useState(2)

  useEffect(() => {
    const timeLimit = Math.ceil(props.wordLength / props.difficultyFactor);
    setTimeLimit((timeLimit > 2) ? timeLimit : 2)
    startTimer()
  }, [props.wordLength, props.difficultyFactor])

  const FULL_DASH_ARRAY = 283
  let timePassed = 0;
  let timeLeft = timeLimit;
  let timerInterval = null;

  function formatTimeLeft(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`
  }

  function startTimer() {
    timerInterval = setInterval(() => {

      timePassed = timePassed += 1;
      timeLeft = timeLimit - timePassed;

      if (timeLeft <= 0) {
        clearInterval(timerInterval)
      }

      setTimeToBeShown(formatTimeLeft(timeLeft));
      setCircleDasharray();
    }, 1000);
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / timeLimit;
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);

  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    setStrokeDashArray(circleDasharray)
  }

  return (
    <div className="timerContainer">
      <div className="base-timer">
        <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g className="base-timer__circle">
            <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
            <path
              id="base-timer-path-remaining"
              stroke-dasharray={strokeDashArray}
              className="base-timer__path-remaining"
              d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0
                "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" className="base-timer__label">
          {timeToBeShown}
        </span>
      </div>
    </div>
  )
};

export default Timer;