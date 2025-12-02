// app/games/simon/components/GameOverScreen.js
'use client';

import { useEffect } from 'react';
import { playErrorSound } from '../services/soundService';

export default function GameOverScreen({ score, highScore, onRestart }) {
  const isNewRecord = score > 0 && score === highScore;

  useEffect(() => {
    playErrorSound();
  }, []);

  return (
    <div className="gameover-container">
      <div className="gameover-card">
        <div className="gameover-icon">
          {isNewRecord ? '🏆' : '😢'}
        </div>
        
        <h1 className="gameover-title">
          {isNewRecord ? '¡Nuevo Récord!' : '¡Game Over!'}
        </h1>

        <div className="score-section">
          <div className="final-score">
            <div className="score-label">Puntuación Final</div>
            <div className="score-value">{score}</div>
          </div>

          {isNewRecord && (
            <div className="record-badge">
              <span className="badge-text">🎉 ¡Nuevo Récord Personal! 🎉</span>
            </div>
          )}

          <div className="highscore-display">
            <span className="highscore-label">Mejor Puntuación:</span>
            <span className="highscore-value">{highScore}</span>
          </div>
        </div>

        <div className="message-section">
          <p className="message">
            {score === 0 && '¡Vamos! Puedes hacerlo mejor. ¡Intenta de nuevo!'}
            {score > 0 && score < 5 && '¡Buen intento! La práctica hace al maestro.'}
            {score >= 5 && score < 10 && '¡Nada mal! Estás mejorando.'}
            {score >= 10 && score < 15 && '¡Excelente! Tienes buena memoria.'}
            {score >= 15 && score < 20 && '¡Impresionante! Eres todo un experto.'}
            {score >= 20 && '¡Increíble! Eres una leyenda de Simon.'}
          </p>
        </div>

        <div className="buttons-section">
          <button className="btn-primary restart-btn" onClick={onRestart}>
            🔄 Jugar de Nuevo
          </button>
          
          <a href="/" className="btn-secondary home-btn">
            🏠 Volver al Inicio
          </a>
        </div>
      </div>

      <style jsx>{`
        .gameover-container {
          min-height: 100vh;
          background: var(--color-dark-bg);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          animation: fadeIn 0.5s ease;
        }

        .gameover-card {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 3rem;
          max-width: 500px;
          width: 100%;
          text-align: center;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .gameover-icon {
          font-size: 5rem;
          margin-bottom: 1rem;
          animation: bounce 1s ease infinite;
        }

        .gameover-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: var(--gradient-epic);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 2rem;
        }

        .score-section {
          margin-bottom: 2rem;
        }

        .final-score {
          background: rgba(109, 40, 217, 0.2);
          border: 2px solid var(--color-primary);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .score-label {
          color: var(--color-text-light);
          font-size: 1rem;
          margin-bottom: 0.5rem;
          opacity: 0.8;
        }

        .score-value {
          font-size: 4rem;
          font-weight: 800;
          background: var(--gradient-epic);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .record-badge {
          background: var(--gradient-success);
          padding: 0.75rem 1.5rem;
          border-radius: 15px;
          margin: 1rem 0;
          animation: pulse 2s ease-in-out infinite;
        }

        .badge-text {
          color: white;
          font-weight: 700;
          font-size: 1.125rem;
        }

        .highscore-display {
          color: var(--color-text-light);
          font-size: 1.125rem;
          margin-top: 1rem;
        }

        .highscore-label {
          opacity: 0.7;
          margin-right: 0.5rem;
        }

        .highscore-value {
          font-weight: 800;
          color: var(--color-accent);
          font-size: 1.5rem;
        }

        .message-section {
          margin: 2rem 0;
        }

        .message {
          color: var(--color-text-light);
          font-size: 1.125rem;
          line-height: 1.6;
          opacity: 0.9;
        }

        .buttons-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .restart-btn, .home-btn {
          font-size: 1.125rem;
          padding: 1rem 2rem;
          width: 100%;
          text-decoration: none;
          display: inline-block;
        }

        .home-btn {
          background: rgba(255, 255, 255, 0.05);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @media (max-width: 640px) {
          .gameover-card {
            padding: 2rem;
          }

          .gameover-icon {
            font-size: 3.5rem;
          }

          .gameover-title {
            font-size: 2rem;
          }

          .score-value {
            font-size: 3rem;
          }

          .message {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}