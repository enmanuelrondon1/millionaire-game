// app/games/flags/components/GameModeSelect.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GameModeSelect({ onSelectMode }) {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const router = useRouter();

  const modes = [
    {
      id: 'normal',
      name: 'Modo Normal',
      icon: '🎯',
      description: '10 preguntas sin límite de tiempo. Perfecto para aprender.',
      color: 'var(--color-primary)',
    },
    {
      id: 'timed',
      name: 'Contrarreloj',
      icon: '⏱️',
      description: '60 segundos. ¿Cuántas banderas puedes identificar?',
      color: 'var(--color-secondary)',
    },
  ];

  const difficulties = [
    { id: 'easy', name: 'Fácil', icon: '🟢', description: 'Países famosos' },
    { id: 'medium', name: 'Medio', icon: '🟡', description: 'Un buen desafío' },
    { id: 'hard', name: 'Difícil', icon: '🔴', description: 'Para expertos' },
  ];

  const handleStart = () => {
    if (selectedMode) {
      onSelectMode(selectedMode, selectedDifficulty);
    }
  };

  return (
    <div className="mode-select-container">
      <button onClick={() => router.back()} className="btn-back">
        &larr; Volver
      </button>
      <div className="mode-select-wrapper">
        <div className="header">
          <h1 className="title">
            <span className="gradient-text">🌍 Quiz de Banderas</span>
          </h1>
          <p className="subtitle">
            Pon a prueba tus conocimientos de geografía mundial
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Selecciona el Modo de Juego</h2>
          <div className="modes-grid">
            {modes.map((mode) => (
              <button
                key={mode.id}
                className={`mode-card ${selectedMode === mode.id ? 'selected' : ''}`}
                onClick={() => setSelectedMode(mode.id)}
                style={{ '--mode-color': mode.color }}
              >
                <div className="mode-icon">{mode.icon}</div>
                <h3 className="mode-name">{mode.name}</h3>
                <p className="mode-description">{mode.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Selecciona la Dificultad</h2>
          <div className="difficulty-grid">
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                className={`difficulty-btn ${selectedDifficulty === diff.id ? 'selected' : ''}`}
                onClick={() => setSelectedDifficulty(diff.id)}
              >
                <span className="diff-icon">{diff.icon}</span>
                <span className="diff-name">{diff.name}</span>
                <span className="diff-desc">{diff.description}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn-primary start-btn"
          onClick={handleStart}
          disabled={!selectedMode}
        >
          🚀 Comenzar Juego
        </button>
      </div>

      <style jsx>{`
        .mode-select-container {
          min-height: 100vh;
          background: var(--color-dark-bg);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          position: relative;
        }

        .btn-back {
          position: absolute;
          top: 2rem;
          left: 2rem;
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: var(--color-text-light);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-weight: 600;
          z-index: 10;
        }

        .btn-back:hover {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(109, 40, 217, 0.3);
        }

        .mode-select-wrapper {
          max-width: 800px;
          width: 100%;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .gradient-text {
          background: var(--gradient-epic);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 1.125rem;
          color: rgba(241, 245, 249, 0.7);
        }

        .section {
          margin-bottom: 2.5rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text-light);
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .modes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .mode-card {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .mode-card:hover {
          transform: translateY(-5px);
          border-color: var(--mode-color);
          box-shadow: 0 10px 30px rgba(109, 40, 217, 0.3);
        }

        .mode-card.selected {
          background: linear-gradient(135deg, rgba(109, 40, 217, 0.2), rgba(6, 182, 212, 0.2));
          border-color: var(--color-accent);
          box-shadow: 0 10px 30px rgba(251, 191, 36, 0.4);
        }

        .mode-icon {
          font-size: 3.5rem;
          margin-bottom: 1rem;
        }

        .mode-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text-light);
          margin-bottom: 0.75rem;
        }

        .mode-description {
          font-size: 0.95rem;
          color: rgba(241, 245, 249, 0.7);
          line-height: 1.5;
        }

        .difficulty-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
        }

        .difficulty-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .difficulty-btn:hover {
          transform: scale(1.05);
          border-color: var(--color-primary-light);
        }

        .difficulty-btn.selected {
          background: var(--gradient-epic);
          border-color: transparent;
          box-shadow: 0 8px 25px rgba(109, 40, 217, 0.4);
        }

        .diff-icon {
          font-size: 2rem;
        }

        .diff-name {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--color-text-light);
        }

        .diff-desc {
          font-size: 0.875rem;
          color: rgba(241, 245, 249, 0.6);
        }

        .start-btn {
          width: 100%;
          font-size: 1.25rem;
          padding: 1.25rem;
          margin-top: 2rem;
        }

        .start-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 640px) {
          .header {
            padding-top: 3rem;
          }
          
          .title {
            font-size: 2rem;
          }

          .modes-grid {
            grid-template-columns: 1fr;
          }

          .difficulty-grid {
            grid-template-columns: 1fr;
          }

          .btn-back {
            top: 1.5rem;
            left: 1.5rem;
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}