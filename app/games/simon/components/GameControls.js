// app/games/simon/components/GameControls.js
'use client';

export default function GameControls({ isPlaying, speed, onStart, onSpeedChange }) {
  return (
    <div className="controls-container">
      {!isPlaying && (
        <>
          <div className="speed-selector">
            <label className="speed-label">Selecciona la velocidad:</label>
            <div className="speed-buttons">
              <button
                className={`speed-btn ${speed === 'easy' ? 'active' : ''}`}
                onClick={() => onSpeedChange('easy')}
              >
                🐢 Fácil
              </button>
              <button
                className={`speed-btn ${speed === 'medium' ? 'active' : ''}`}
                onClick={() => onSpeedChange('medium')}
              >
                🚶 Media
              </button>
              <button
                className={`speed-btn ${speed === 'hard' ? 'active' : ''}`}
                onClick={() => onSpeedChange('hard')}
              >
                🚀 Rápida
              </button>
            </div>
          </div>

          <button className="btn-primary start-btn" onClick={onStart}>
            🎮 Comenzar Juego
          </button>
        </>
      )}

      {isPlaying && (
        <div className="playing-info">
          <div className="info-text">
            🎯 ¡Repite la secuencia de colores!
          </div>
        </div>
      )}

      <style jsx>{`
        .controls-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: center;
        }

        .speed-selector {
          width: 100%;
          text-align: center;
        }

        .speed-label {
          display: block;
          color: var(--color-text-light);
          margin-bottom: 0.875rem;
          font-weight: 600;
          font-size: 1rem;
        }

        .speed-buttons {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .speed-btn {
          padding: 0.625rem 1.25rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-text-light);
          border-radius: 15px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .speed-btn:hover {
          transform: scale(1.05);
          border-color: var(--color-primary-light);
          background: rgba(255, 255, 255, 0.1);
        }

        .speed-btn.active {
          background: var(--gradient-epic);
          border-color: transparent;
          box-shadow: 0 8px 25px rgba(109, 40, 217, 0.4);
        }

        .start-btn {
          font-size: 1.125rem;
          padding: 0.875rem 2rem;
          animation: float 3s ease-in-out infinite;
        }

        .playing-info {
          width: 100%;
          text-align: center;
        }

        .info-text {
          padding: 1rem 2rem;
          background: rgba(6, 182, 212, 0.1);
          border: 2px solid var(--color-secondary);
          border-radius: 15px;
          color: var(--color-secondary-light);
          font-weight: 600;
          font-size: 1.125rem;
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.6);
          }
        }

        @media (max-width: 640px) {
          .speed-buttons {
            gap: 0.5rem;
          }

          .speed-btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }

          .start-btn {
            font-size: 1rem;
            padding: 0.875rem 2rem;
          }

          .info-text {
            font-size: 1rem;
            padding: 0.875rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}