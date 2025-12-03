// app/games/math/components/GameOverScreen.js
'use client';

export default function GameOverScreen({ 
  score,
  correctAnswers,
  wrongAnswers,
  highScore, 
  difficulty, 
  gameMode,
  operation,
  onRestart 
}) {
  const totalAnswers = correctAnswers + wrongAnswers;
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
  const isNewRecord = score > 0 && score === highScore;

  const getMedalEmoji = () => {
    if (accuracy >= 95) return '🥇';
    if (accuracy >= 80) return '🥈';
    if (accuracy >= 60) return '🥉';
    return '📊';
  };

  const getMessage = () => {
    if (accuracy === 100) return '¡Perfecto! Eres un genio matemático';
    if (accuracy >= 90) return '¡Excelente! Dominas las operaciones';
    if (accuracy >= 75) return '¡Muy bien! Tienes buen nivel';
    if (accuracy >= 50) return '¡Bien hecho! Sigue practicando';
    return '¡No te rindas! La práctica hace al maestro';
  };

  const difficultyLabels = {
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil'
  };

  const modeLabels = {
    timed: 'Contrarreloj',
    questions: 'Por Preguntas'
  };

  const operationLabels = {
    addition: 'Suma',
    subtraction: 'Resta',
    multiplication: 'Multiplicación',
    division: 'División',
    mixed: 'Mezclado'
  };

  return (
    <div className="gameover-container">
      <div className="gameover-card">
        <div className="medal">
          {getMedalEmoji()}
        </div>

        <h1 className="title">
          {isNewRecord ? '¡Nuevo Récord!' : '¡Juego Terminado!'}
        </h1>

        <div className="score-section">
          <div className="main-score">
            <div className="score-label">Puntuación Final</div>
            <div className="score-value">{score}</div>
          </div>

          {isNewRecord && (
            <div className="record-badge">
              🎉 ¡Nuevo Récord Personal! 🎉
            </div>
          )}

          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-icon">✅</span>
              <div className="stat-info">
                <div className="stat-number">{correctAnswers}</div>
                <div className="stat-text">Correctas</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">❌</span>
              <div className="stat-info">
                <div className="stat-number">{wrongAnswers}</div>
                <div className="stat-text">Incorrectas</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🎯</span>
              <div className="stat-info">
                <div className="stat-number">{accuracy}%</div>
                <div className="stat-text">Precisión</div>
              </div>
            </div>
          </div>

          <div className="details">
            <div className="detail-item">
              <span className="detail-label">Mejor Puntuación:</span>
              <span className="detail-value">{highScore}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Modo:</span>
              <span className="detail-value">{modeLabels[gameMode]}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Operación:</span>
              <span className="detail-value">{operationLabels[operation]}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Dificultad:</span>
              <span className="detail-value">{difficultyLabels[difficulty]}</span>
            </div>
          </div>
        </div>

        <div className="message">
          {getMessage()}
        </div>

        <div className="buttons">
          <button className="btn-primary" onClick={onRestart}>
            🔄 Jugar de Nuevo
          </button>
          <a href="/" className="btn-secondary">
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
          max-width: 550px;
          width: 100%;
          text-align: center;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .medal {
          font-size: 5rem;
          margin-bottom: 1rem;
          animation: bounce 1s ease;
        }

        .title {
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

        .main-score {
          background: rgba(109, 40, 217, 0.2);
          border: 2px solid var(--color-primary);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .score-label {
          font-size: 1rem;
          color: rgba(241, 245, 249, 0.8);
          margin-bottom: 0.5rem;
        }

        .score-value {
          font-size: 3.5rem;
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
          margin-bottom: 1.5rem;
          font-weight: 700;
          animation: pulse 2s ease-in-out infinite;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .stat-icon {
          font-size: 2rem;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-accent);
        }

        .stat-text {
          font-size: 0.75rem;
          color: rgba(241, 245, 249, 0.7);
        }

        .details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 1.25rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-label {
          color: rgba(241, 245, 249, 0.7);
          font-size: 0.95rem;
        }

        .detail-value {
          color: var(--color-accent);
          font-weight: 700;
          font-size: 1.125rem;
        }

        .message {
          font-size: 1.125rem;
          color: rgba(241, 245, 249, 0.9);
          line-height: 1.6;
          margin: 2rem 0;
          font-weight: 500;
        }

        .buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .btn-primary, .btn-secondary {
          padding: 1rem 2rem;
          font-size: 1.125rem;
          width: 100%;
          text-decoration: none;
          display: inline-block;
        }

        .btn-secondary {
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

          .medal {
            font-size: 3.5rem;
          }

          .title {
            font-size: 2rem;
          }

          .score-value {
            font-size: 2.5rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .message {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}