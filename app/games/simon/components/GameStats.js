// app/games/simon/components/GameStats.js
'use client';

export default function GameStats({ score, highScore, isUserTurn, speed }) {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-label">Puntuación</div>
        <div className="stat-value score">{score}</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Récord</div>
        <div className="stat-value highscore">🏆 {highScore}</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Estado</div>
        <div className={`stat-value status ${isUserTurn ? 'your-turn' : ''}`}>
          {isUserTurn ? '👉 Tu Turno' : '👀 Observa'}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Velocidad</div>
        <div className="stat-value speed">
          {speed === 'easy' && '🐢 Fácil'}
          {speed === 'medium' && '🚶 Media'}
          {speed === 'hard' && '🚀 Rápida'}
        </div>
      </div>

      <style jsx>{`
        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
          transition: margin-bottom 0.3s ease;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 1rem;
          text-align: center;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          border-color: var(--color-primary-light);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--color-text-light);
          opacity: 0.7;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-text-light);
        }

        .stat-value.score {
          background: var(--gradient-epic);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-value.highscore {
          color: var(--color-accent);
        }

        .stat-value.status {
          color: var(--color-secondary);
          font-size: 1.125rem;
        }

        .stat-value.status.your-turn {
          color: var(--color-success);
          animation: pulse 1.5s ease-in-out infinite;
        }

        .stat-value.speed {
          color: var(--color-info);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        @media (max-width: 640px) {
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .stat-card {
            padding: 0.75rem;
          }

          .stat-label {
            font-size: 0.75rem;
          }

          .stat-value {
            font-size: 1.25rem;
          }
        }
        
        @media (min-width: 768px) {
          .stats-container {
            margin-bottom: 1.5rem; /* Reducir margen inferior en escritorio */
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}