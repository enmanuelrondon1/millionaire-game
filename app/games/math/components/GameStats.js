// app/games/math/components/GameStats.js
'use client';

export default function GameStats({ score, streak, timeLeft, gameMode, totalQuestions, currentQuestion }) {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-label">Puntuación</div>
        <div className="stat-value score">{score}</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Racha</div>
        <div className="stat-value streak">
          {streak > 0 ? `🔥 ${streak}` : '—'}
        </div>
      </div>

      {gameMode === 'timed' ? (
        <div className="stat-card">
          <div className="stat-label">Tiempo</div>
          <div className={`stat-value time ${timeLeft <= 10 ? 'warning' : ''}`}>
            ⏱️ {timeLeft}s
          </div>
        </div>
      ) : (
        <div className="stat-card">
          <div className="stat-label">Pregunta</div>
          <div className="stat-value question">
            {currentQuestion}/{totalQuestions}
          </div>
        </div>
      )}

      <style jsx>{`
        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 0.875rem;
          text-align: center;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          border-color: var(--color-primary-light);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--color-text-light);
          opacity: 0.7;
          margin-bottom: 0.375rem;
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

        .stat-value.streak {
          color: var(--color-accent);
        }

        .stat-value.time {
          color: var(--color-info);
        }

        .stat-value.time.warning {
          color: var(--color-error);
          animation: pulse 1s ease-in-out infinite;
        }

        .stat-value.question {
          color: var(--color-secondary);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @media (max-width: 640px) {
          .stats-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.625rem;
          }

          .stat-card {
            padding: 0.75rem 0.5rem;
          }

          .stat-label {
            font-size: 0.65rem;
          }

          .stat-value {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}