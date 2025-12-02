//app/games/millionaire/components/PrizeLadder.js
'use client';

import { useMemo } from 'react';

export default function PrizeLadder({
  questions,
  currentQuestion,
  gameOver,
  gameWon
}) {
  const safePrizes = useMemo(() => {
    return [3, 5, 8]; // Índices de preguntas con prize seguro
  }, []);

  const prizes = questions.map((q, index) => ({
    level: index + 1,
    prize: q.prize,
    isSafe: safePrizes.includes(index),
    isPassed: index < currentQuestion,
    isCurrent: index === currentQuestion,
    isAfter: index > currentQuestion
  }));

  const formatCurrency = (amount) => {
    if (amount >= 1000000) return '💰 ' + (amount / 1000000).toFixed(1) + 'M';
    if (amount >= 1000) return '💵 ' + (amount / 1000).toFixed(0) + 'K';
    return '💵 ' + amount;
  };

  const currentPrize = prizes[currentQuestion]?.prize || 0;
  const earnedPrize = prizes[Math.max(0, currentQuestion - 1)]?.prize || 0;

  return (
    <div className="w-full mt-8 rounded-2xl overflow-hidden backdrop-blur-md border animate-in fade-in duration-500"
      style={{
        borderColor: 'rgba(109,40,217,0.3)',
        background: 'linear-gradient(180deg, rgba(109,40,217,0.1) 0%, rgba(6,182,212,0.05) 100%)'
      }}
    >
      {/* Header */}
      <div className="px-6 py-4 sm:py-5 bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 border-b border-[rgba(109,40,217,0.2)]">
        <h3 className="text-lg font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
          🏆 Escalera de Premios
        </h3>
      </div>

      {/* Contenedor scrolleable */}
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-2">
          {prizes.map((item, index) => {
            const isActive = item.isCurrent;
            const isPassed = item.isPassed;
            const isSafe = item.isSafe;

            let backgroundColor = 'rgba(107, 114, 128, 0.1)';
            let borderColor = 'rgba(107, 114, 128, 0.2)';
            let textColor = 'rgba(241, 245, 249, 0.6)';

            if (isPassed) {
              backgroundColor = 'rgba(16, 185, 129, 0.15)';
              borderColor = 'rgba(16, 185, 129, 0.4)';
              textColor = 'var(--color-success)';
            }

            if (isSafe && !isPassed && !isActive) {
              backgroundColor = 'rgba(251, 191, 36, 0.1)';
              borderColor = 'rgba(251, 191, 36, 0.3)';
              textColor = 'var(--color-accent)';
            }

            if (isActive) {
              backgroundColor = 'linear-gradient(135deg, rgba(109,40,217,0.3) 0%, rgba(6,182,212,0.2) 100%)';
              borderColor = 'var(--color-primary)';
              textColor = 'white';
            }

            return (
              <div
                key={index}
                className={`relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-500 transform ${
                  isActive ? 'scale-105 shadow-lg' : 'hover:scale-102'
                } ${isPassed ? '' : ''}`}
                style={{
                  background: backgroundColor,
                  borderColor: borderColor,
                  boxShadow: isActive
                    ? '0 0 20px rgba(109,40,217,0.5), inset 0 0 20px rgba(6,182,212,0.2)'
                    : 'none'
                }}
              >
                <div className="flex items-center justify-between">
                  {/* Nivel */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-black" style={{ color: textColor }}>
                      #{item.level}
                    </span>
                    
                    {/* Indicadores */}
                    <div className="flex gap-2">
                      {isPassed && (
                        <span className="text-lg">✅</span>
                      )}
                      {isActive && (
                        <span className="text-lg animate-pulse">👉</span>
                      )}
                      {isSafe && !isPassed && !isActive && (
                        <span className="text-lg">🔒</span>
                      )}
                    </div>
                  </div>

                  {/* Premio */}
                  <div className="text-right">
                    <p className={`text-xl sm:text-2xl font-black ${
                      isActive ? 'animate-pulse' : ''
                    }`}
                      style={{
                        color: textColor,
                        textShadow: isActive ? `0 0 20px rgba(109,40,217,0.5)` : 'none'
                      }}
                    >
                      {formatCurrency(item.prize)}
                    </p>
                    {isPassed && (
                      <p className="text-xs opacity-70">Ganado</p>
                    )}
                  </div>
                </div>

                {/* Barra de progreso (solo para el actual) */}
                {isActive && (
                  <div className="mt-3 h-1 w-full bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] animate-pulse"
                      style={{ width: '100%' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer con información */}
      {!gameOver && !gameWon && (
        <div className="p-4 bg-[rgba(109,40,217,0.1)] border-t border-[rgba(109,40,217,0.2)]">
          <div className="grid grid-cols-2 gap-4 text-center text-sm">
            <div>
              <p className="text-xs text-[rgba(241,245,249,0.6)] mb-1">Siguiente Premio</p>
              <p className="text-lg font-bold text-[var(--color-secondary)]">
                {formatCurrency(currentPrize)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[rgba(241,245,249,0.6)] mb-1">Mínimo Garantizado</p>
              <p className="text-lg font-bold text-[var(--color-success)]">
                {formatCurrency(earnedPrize)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Estilos custom */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(109, 40, 217, 0.1);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, var(--color-primary), var(--color-accent));
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, var(--color-secondary), var(--color-accent));
        }
      `}</style>
    </div>
  );
}