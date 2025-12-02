//app/games/millionaire/components/Timer.js
'use client';

import { useMemo } from 'react';
import { Clock } from 'lucide-react';

export default function Timer({ timeLeft, timerActive }) {
  const isWarning = timeLeft <= 10;
  const isCritical = timeLeft <= 5;

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

  const getProgressWidth = () => {
    return (timeLeft / 30) * 100;
  };

  return (
    <div
      className={`rounded-2xl px-6 py-4 sm:px-8 sm:py-5 backdrop-blur-md border transition-all duration-300 ${
        isCritical ? 'animate-pulse' : ''
      }`}
      style={{
        background: getBackgroundGradient(),
        borderColor: getBorderColor()
      }}
    >
      <div className="flex items-center justify-between">
        {/* Icono y etiqueta */}
        <div className="flex items-center gap-3">
          <div className="text-2xl sm:text-3xl">
            {isCritical ? '⚠️' : '⏱️'}
          </div>

          <div>
            <p className="text-xs font-semibold text-[rgba(241,245,249,0.7)] uppercase">
              Tiempo
            </p>
            <p className="text-xs text-[rgba(241,245,249,0.6)]">
              restante
            </p>
          </div>
        </div>

        {/* Tiempo */}
        <div className="text-right">
          <p
            className={`text-4xl sm:text-5xl font-black transition-all duration-200 ${
              isCritical ? 'animate-bounce' : ''
            }`}
            style={{
              color: timerColor,
              textShadow: `0 0 20px ${timerColor}60`
            }}
          >
            {timeLeft}
          </p>
          <p className="text-xs text-[rgba(241,245,249,0.6)]">segundos</p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mt-4 w-full h-2 rounded-full overflow-hidden bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)]">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${getProgressWidth()}%`,
            background: getProgressGradient(),
            boxShadow: `0 0 10px ${timerColor}80`
          }}
        />
      </div>

      {/* Indicador de alerta crítica */}
      {isCritical && (
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-error)] animate-pulse" />
          <p className="text-xs text-[var(--color-error)] font-semibold">
            ¡Apúrate! El tiempo se acaba
          </p>
        </div>
      )}

      {/* Anillo de alerta crítica */}
      {isCritical && (
        <div
          className="absolute inset-0 rounded-2xl border-2 animate-pulse"
          style={{
            borderColor: 'rgba(239,68,68,0.5)',
            pointerEvents: 'none'
          }}
        />
      )}

      <style jsx>{`
        @keyframes timer-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes timer-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(239, 68, 68, 0.8);
          }
        }
      `}</style>
    </div>
  );
}