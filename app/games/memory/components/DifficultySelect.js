// app/games/memory/components/DifficultySelect.js
'use client';

import { useState } from 'react';
import Link from 'next/link';

export const DifficultySelect = ({ onSelectDifficulty }) => {
  const [hoveredDifficulty, setHoveredDifficulty] = useState(null);

  const difficulties = [
    {
      id: 'easy',
      label: 'FÁCIL',
      emoji: '🟢',
      description: '6 tarjetas (3 pares)',
      cards: 6,
      color: 'var(--color-success)',
      icon: '👶'
    },
    {
      id: 'medium',
      label: 'MEDIO',
      emoji: '🟡',
      description: '12 tarjetas (6 pares)',
      cards: 12,
      color: 'var(--color-accent)',
      icon: '🧠'
    },
    {
      id: 'hard',
      label: 'DIFÍCIL',
      emoji: '🔴',
      description: '20 tarjetas (10 pares)',
      cards: 20,
      color: 'var(--color-error)',
      icon: '⚡'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-dark-bg)] via-[#1E3A8A] to-[var(--color-dark-bg)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-10 right-5 w-80 h-80 bg-gradient-radial from-[var(--color-primary)] opacity-15 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 left-5 w-72 h-72 bg-gradient-radial from-[var(--color-secondary)] opacity-10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-4xl w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center text-center mb-16 animate-in fade-in slide-in-from-top-8 duration-700 sm:relative">
          {/* Botón de Volver */}
          <div className="sm:absolute sm:left-0 mb-4 sm:mb-0">
            <Link href="/" className="btn-secondary">
              &larr; Volver al Menú
            </Link>
          </div>

          {/* Título */}
          <div className="flex-grow">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent leading-tight drop-shadow-2xl">
              🎮 Memory
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] mx-auto mt-6 rounded-full" />
            <p className="text-lg sm:text-xl mt-8 text-[rgba(241,245,249,0.9)] font-semibold">
              Selecciona tu nivel de dificultad
            </p>
          </div>
        </div>

        {/* Difficulty Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {difficulties.map((difficulty, index) => (
            <button
              key={difficulty.id}
              onClick={() => onSelectDifficulty(difficulty.id)}
              onMouseEnter={() => setHoveredDifficulty(difficulty.id)}
              onMouseLeave={() => setHoveredDifficulty(null)}
              className="group relative h-full overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105"
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.15}s backwards`
              }}
            >
              {/* Fondo base con gradiente */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${difficulty.color}20 0%, ${difficulty.color}10 100%)`,
                  border: `2px solid ${difficulty.color}40`
                }}
              />

              {/* Efecto de brillo al hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${difficulty.color}30 0%, transparent 70%)`
                }}
              />

              {/* Borde brillante */}
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
                  hoveredDifficulty === difficulty.id ? 'border-2' : 'border-0'
                }`}
                style={{
                  borderColor: difficulty.color
                }}
              />

              {/* Contenido */}
              <div className="relative z-10 p-8 flex flex-col items-center text-white text-center">
                {/* Emoji Grande */}
                <div className="text-6xl sm:text-7xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {difficulty.emoji}
                </div>

                {/* Icono secundario */}
                <div className="text-4xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  {difficulty.icon}
                </div>

                {/* Label */}
                <div
                  className="text-2xl sm:text-3xl font-black mb-3 transition-all duration-300"
                  style={{ color: difficulty.color }}
                >
                  {difficulty.label}
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[rgba(241,245,249,0.85)] mb-4 group-hover:text-[rgba(241,245,249,1)] transition-colors duration-300">
                  {difficulty.description}
                </p>

                {/* Cards Count */}
                <div className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-semibold mt-2" style={{ color: difficulty.color }}>
                  {difficulty.cards} tarjetas
                </div>
              </div>

              {/* Efecto de pulse en hover */}
              {hoveredDifficulty === difficulty.id && (
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{
                    background: `radial-gradient(circle, ${difficulty.color}20 0%, transparent 70%)`,
                    pointerEvents: 'none'
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Info Box */}
        <div
          className="rounded-2xl p-6 sm:p-8 backdrop-blur-md border animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300"
          style={{
            background: 'linear-gradient(135deg, rgba(109,40,217,0.15) 0%, rgba(6,182,212,0.1) 100%)',
            borderColor: 'rgba(109,40,217,0.3)'
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl flex-shrink-0">💡</div>
            <div className="text-left">
              <p className="text-base sm:text-lg text-[rgba(241,245,249,0.95)]">
                <span className="font-bold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                  Consejo:
                </span>{' '}
                Recuerda la posición de cada emoji. <span className="font-semibold">Encuentra todos los pares</span> para ganar. 
                ¡Usa tu memoria estratégicamente!
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};