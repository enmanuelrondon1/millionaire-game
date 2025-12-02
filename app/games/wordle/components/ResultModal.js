// app/games/wordle/components/ResultModal.js
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export const ResultModal = ({ gameWon, word, guessCount, onReset }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (gameWon) {
      const items = [];
      for (let i = 0; i < 50; i++) {
        items.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 0.5,
          duration: 2 + Math.random() * 1,
          emoji: ['🎉', '🎊', '🏆', '⭐', '🌟', '✨'][Math.floor(Math.random() * 6)]
        });
      }
      setConfetti(items);
    }
  }, [gameWon]);

  const getMessage = () => {
    if (!gameWon) return `La palabra era: ${word}`;
    if (guessCount === 1) return '¡INCREÍBLE! ¡Lo acertaste al primer intento!';
    if (guessCount <= 3) return '¡EXCELENTE! ¡Muy bien hecho!';
    if (guessCount <= 5) return '¡BIEN! ¡Lo lograste!';
    return '¡LO HICISTE! ¡Felicidades!';
  };

  if (!gameWon) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
        <div
          className="rounded-2xl p-8 sm:p-12 backdrop-blur-md border max-w-md w-full transform animate-in scale-in duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.1) 100%)',
            borderColor: 'rgba(239,68,68,0.4)'
          }}
        >
          <div className="text-center mb-6">
            <div className="text-7xl mb-4">💀</div>
            <h3 className="text-4xl font-black mb-2 text-[var(--color-error)]">
              ¡Juego Terminado!
            </h3>
            <p className="text-[rgba(241,245,249,0.8)] text-lg">
              {getMessage()}
            </p>
          </div>

          {/* Botones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={onReset}
              className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                boxShadow: '0 10px 30px rgba(109,40,217,0.4)'
              }}
            >
              🔄 Jugar de Nuevo
            </button>

            <Link href="/">
              <button
                className="w-full px-6 py-3 rounded-xl font-bold border-2 transition-all duration-300"
                style={{
                  borderColor: 'var(--color-secondary)',
                  color: 'var(--color-secondary)',
                  background: 'rgba(6,182,212,0.1)'
                }}
              >
                🏠 Ir a Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300 overflow-hidden">
      {/* Confetti */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {confetti.map(item => (
          <div
            key={item.id}
            className="absolute text-3xl animate-fall"
            style={{
              left: `${item.left}%`,
              top: '-50px',
              animation: `fall ${item.duration}s linear ${item.delay}s`,
              opacity: 0.8
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl p-8 sm:p-12 backdrop-blur-md border max-w-md w-full transform animate-in scale-in duration-300 relative z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.1) 100%)',
          borderColor: 'rgba(16,185,129,0.4)'
        }}
      >
        <div className="text-center mb-6">
          <div className="text-7xl mb-4 animate-bounce">🏆</div>
          <h3 className="text-4xl font-black mb-2 text-[var(--color-success)]">
            ¡GANASTE!
          </h3>
          <p className="text-[rgba(241,245,249,0.8)] text-lg">
            {getMessage()}
          </p>
        </div>

        {/* Estadísticas */}
        <div className="mb-6 py-4 border-y border-[rgba(241,245,249,0.2)]">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xs text-[rgba(241,245,249,0.6)] uppercase mb-1">Palabra</p>
              <p className="text-2xl font-black text-white">{word}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[rgba(241,245,249,0.6)] uppercase mb-1">Intentos</p>
              <p className="text-2xl font-black text-[var(--color-accent)]">{guessCount}/6</p>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
              boxShadow: '0 10px 30px rgba(109,40,217,0.4)'
            }}
          >
            🔄 Jugar de Nuevo
          </button>

          <Link href="/">
            <button
              className="w-full px-6 py-3 rounded-xl font-bold border-2 transition-all duration-300"
              style={{
                borderColor: 'var(--color-secondary)',
                color: 'var(--color-secondary)',
                background: 'rgba(6,182,212,0.1)'
              }}
            >
              🏠 Ir a Home
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};