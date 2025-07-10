import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialHours = 0,
  initialMinutes = 5,
  initialSeconds = 0
}) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(
    initialHours * 3600 + initialMinutes * 60 + initialSeconds
  );

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          const newTotal = prev - 1;
          if (newTotal <= 0) {
            setIsRunning(false);
            alert('Time\'s up!');
            return 0;
          }
          return newTotal;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, totalSeconds]);

  useEffect(() => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  }, [totalSeconds]);

  const handleStart = () => {
    if (totalSeconds > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    const newTotal = initialHours * 3600 + initialMinutes * 60 + initialSeconds;
    setTotalSeconds(newTotal);
  };

  const handleTimeChange = (type: 'hours' | 'minutes' | 'seconds', value: number) => {
    if (!isRunning) {
      let newHours = hours;
      let newMinutes = minutes;
      let newSeconds = seconds;

      if (type === 'hours') newHours = Math.max(0, Math.min(23, value));
      if (type === 'minutes') newMinutes = Math.max(0, Math.min(59, value));
      if (type === 'seconds') newSeconds = Math.max(0, Math.min(59, value));

      setTotalSeconds(newHours * 3600 + newMinutes * 60 + newSeconds);
    }
  };

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="countdown-timer">
      <div className="time-display">
        <span className="time-unit">
          {formatTime(hours)}
        </span>
        <span className="separator">:</span>
        <span className="time-unit">
          {formatTime(minutes)}
        </span>
        <span className="separator">:</span>
        <span className="time-unit">
          {formatTime(seconds)}
        </span>
      </div>

      <div className="time-inputs">
        <div className="input-group">
          <label>Hours</label>
          <input
            type="number"
            min="0"
            max="23"
            value={hours}
            onChange={(e) => handleTimeChange('hours', parseInt(e.target.value) || 0)}
            disabled={isRunning}
          />
        </div>
        <div className="input-group">
          <label>Minutes</label>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => handleTimeChange('minutes', parseInt(e.target.value) || 0)}
            disabled={isRunning}
          />
        </div>
        <div className="input-group">
          <label>Seconds</label>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => handleTimeChange('seconds', parseInt(e.target.value) || 0)}
            disabled={isRunning}
          />
        </div>
      </div>

      <div className="controls">
        <button 
          onClick={handleStart} 
          disabled={isRunning || totalSeconds === 0}
          className="start-btn"
        >
          Start
        </button>
        <button 
          onClick={handlePause} 
          disabled={!isRunning}
          className="pause-btn"
        >
          Pause
        </button>
        <button 
          onClick={handleReset}
          className="reset-btn"
        >
          Reset
        </button>
      </div>
    </div>
  );
};