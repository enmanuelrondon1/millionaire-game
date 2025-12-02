// app/games/memory/components/MemoryGame.js
'use client';

import { useState, useEffect } from 'react';
import { useMemory } from '../hooks/useMemory';
import { Card } from './Card';
import { DifficultySelect } from './DifficultySelect';
import { GameStats } from './GameStats';
import { WinScreen } from './WinScreen';
import Link from 'next/link';

const MemoryGame = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const {
    cards,
    flipped,
    matched,
    attempts,
    gameWon,
    handleCardClick,
    resetGame,
    getTimeElapsed,
  } = useMemory(difficulty);

  // Timer para el tiempo transcurrido
  useEffect(() => {
    if (!gameWon && difficulty) {
      const interval = setInterval(() => {
        setTimeElapsed(getTimeElapsed());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameWon, difficulty, getTimeElapsed]);

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setTimeElapsed(0);
  };

  const handleRestart = () => {
    resetGame();
    setTimeElapsed(0);
  };

  // Pantalla de selección de dificultad
  if (!difficulty) {
    return <DifficultySelect onSelectDifficulty={handleDifficultySelect} />;
  }

  const totalPairs = cards.length / 2;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-dark-bg)] via-[#1E3A8A] to-[var(--color-dark-bg)] flex flex-col items-center justify-start p-4 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-[var(--color-secondary)] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-radial from-[var(--color-primary)] opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl w-full relative z-10 mt-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center text-center mb-8 animate-in fade-in slide-in-from-top-8 duration-700 sm:relative">
          {/* Botón de Volver */}
          <div className="sm:absolute sm:left-0 mb-4 sm:mb-0">
            <Link href="/" className="btn-secondary">
              &larr; Volver
            </Link>
          </div>

          {/* Título */}
          <div className="flex-grow">
            <h1 className="text-5xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
              🎮 Memory
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] mx-auto rounded-full" />
          </div>
        </div>

        {/* Estadísticas */}
        <GameStats
          attempts={attempts}
          matched={matched.length}
          totalPairs={totalPairs}
          timeElapsed={timeElapsed}
        />

        {/* Grid de Tarjetas */}
        <div className={`
          grid gap-4 mb-12 animate-in fade-in duration-500
          ${totalPairs === 3 ? 'grid-cols-3 md:grid-cols-3' : ''}
          ${totalPairs === 6 ? 'grid-cols-3 md:grid-cols-4' : ''}
          ${totalPairs === 10 ? 'grid-cols-4 md:grid-cols-5' : ''}
        `}>
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              isFlipped={flipped.includes(index)}
              isMatched={matched.includes(card.id)}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>

        {/* Botón de Reinicio */}
        {!gameWon && (
          <div className="text-center mb-8">
            <button
              onClick={handleRestart}
              className="px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                boxShadow: '0 10px 30px rgba(109,40,217,0.4)'
              }}
            >
              🔄 Reiniciar Juego
            </button>
          </div>
        )}
      </div>

      {/* Win Screen */}
      {gameWon && (
        <WinScreen
          attempts={attempts}
          timeElapsed={timeElapsed}
          totalPairs={totalPairs}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default MemoryGame;