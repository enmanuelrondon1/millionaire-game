// app/games/trivia-quick/components/FastTimer.js
'use client';

import { useMemo } from 'react';

export const FastTimer = ({ timeLeft, timerActive }) => {
  const isWarning = timeLeft <= 5;
  const isCritical = timeLeft <= 2;

  const timerColor = useMemo(() => {
    if (isCritical) return 'var(--color-error)';
    if (isWarning) return 'var(--color-warning)';
    return 'var(--color-secondary)';
  }, [timeLeft]);

  const getBackgroundGradient = () => {
    if (isCritical) {
      return 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.1) 100%)';
    }
    if (isWarning) {
      return 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.1) 100%)';
    }
    return 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.1) 100%)';
  };

  const getBorderColor = () => {
    if (isCritical) return 'rgba(239,68,68,0.5)';
    if (isWarning) return 'rgba(249,115,22,0.5)';
    return 'rgba(6,182,212,0.3)';
  };

  const getProgressGradient = () => {
    if (isCritical) return 'linear-gradient(90deg, var(--color-error), #FF6B6B)';
    if (isWarning) return 'linear-gradient(90deg, var(--color-warning), #FFB347)';
    return 'linear-gradient(90deg, var(--color-secondary), var(--color-accent))';
  };

  return (
    <div
      className={`
        rounded-2xl px-6 py-4 backdrop-blur-md border transition-all duration-300 text-center
        ${isCritical ? 'animate-pulse' : ''}
      `}
      style={{
        background: getBackgroundGradient(),
        borderColor: getBorderColor()
      }}
    >
      <div className="flex items-center justify-center gap-3">
        <div className="text-3xl">
          {isCritical ? '⚠️' : '⏱️'}
        </div>

        <div>
          <p
            className={`text-5xl sm:text-6xl font-black transition-all duration-200 ${
              isCritical ? 'animate-bounce' : ''
            }`}
            style={{
              color: timerColor,
              textShadow: `0 0 20px ${timerColor}60`
            }}
          >
            {timeLeft}
          </p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mt-3 w-full h-2 rounded-full overflow-hidden bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)]">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${(timeLeft / 10) * 100}%`,
            background: getProgressGradient(),
            boxShadow: `0 0 10px ${timerColor}80`
          }}
        />
      </div>

      <style jsx>{`
        @keyframes timer-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};