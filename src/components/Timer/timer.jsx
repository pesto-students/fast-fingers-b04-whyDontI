import React, {
  useEffect, useState, useContext, useRef,
} from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import { GameContext } from '../../contexts/context';
import styles from './timer.module.css';

function formatTimeLeft(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

const Timer = ({
  currentWord,
  timeLimit,
}) => {
  const timerId = useRef();
  const { dispatch } = useContext(GameContext);
  const [timeToBeShown, setTimeToBeShown] = useState(formatTimeLeft(timeLimit));
  const [strokeDashArray, setStrokeDashArray] = useState('283');
  const FULL_DASH_ARRAY = 283;
  let timePassed = 0;
  let timeLeft = timeLimit;
  let ms = 0;

  function gameOver() {
    dispatch({
      type: 'END_GAME',
      game: {
        gameEndTime: Date.now(),
      },
    });
    navigate('/final');
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / timeLimit;
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    setStrokeDashArray(circleDasharray);
  }

  function startTimer() {
    timerId.current = setInterval(() => {
      ms += 1;

      if (timeLeft <= 0) {
        clearInterval(timerId.current);
        gameOver();
      }

      if (ms >= 10) {
        timePassed += 1;
        timeLeft = timeLimit - timePassed;
        ms = 0;
      }

      if (timeLeft <= 0) {
        clearInterval(timerId.current);
        gameOver();
      }

      setTimeToBeShown(formatTimeLeft(timeLeft));
      setCircleDasharray();
    }, 100);
  }

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(timerId.current);
    };
  }, [currentWord]);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.baseTimer}>
        <svg className={styles.baseTimerSvg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g className={styles.baseTimerCircle}>
            <circle className={styles.baseTimerPathElapsed} cx="50" cy="50" r="45" />
            <path
              id="baseTimerPathRemaining"
              strokeDasharray={strokeDashArray}
              className={styles.baseTimerPathRemaining}
              d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0
                "
            />
          </g>
        </svg>
        <span id="baseTimerLabel" className={styles.baseTimerLabel}>
          {timeToBeShown}
        </span>
      </div>
    </div>
  );
};

Timer.propTypes = {
  currentWord: PropTypes.string.isRequired,
  timeLimit: PropTypes.number.isRequired,
};
export default Timer;
