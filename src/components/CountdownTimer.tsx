import { useState, useEffect } from 'react';

export const CountdownTimer: React.FC = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const targetDate = new Date('2026-05-17T00:00:00').getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setIsFinished(true);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="countdown-timer">
      {/* HUD Corner Decorations */}
      <div className="hud-corner top-left"></div>
      <div className="hud-corner top-right"></div>
      <div className="hud-corner bottom-left"></div>
      <div className="hud-corner bottom-right"></div>

      <div className="target-date">
        <h2>RACE DAY: MAY 17, 2026</h2>
      </div>

      {isFinished ? (
        <div className="finished-message">
          <h3>MISSION COMPLETE - RACE DAY IS HERE!</h3>
          <p className="race-ready">Time to become an IRONMAN!</p>
        </div>
      ) : (
        <>
          <div className="time-display">
            <div className="time-section">
              <span className="time-unit">{formatTime(days)}</span>
              <span className="time-label">Days</span>
            </div>
            <span className="separator">:</span>
            <div className="time-section">
              <span className="time-unit">{formatTime(hours)}</span>
              <span className="time-label">Hours</span>
            </div>
            <span className="separator">:</span>
            <div className="time-section">
              <span className="time-unit">{formatTime(minutes)}</span>
              <span className="time-label">Minutes</span>
            </div>
            <span className="separator">:</span>
            <div className="time-section">
              <span className="time-unit">{formatTime(seconds)}</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>

          <div className="status-line">
            <span className="status-dot"></span>
            <span className="status-text">SYSTEMS ONLINE - TRAINING MODE ACTIVE</span>
          </div>
        </>
      )}
    </div>
  );
};
