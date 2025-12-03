// app/games/math/components/MathGame.js
'use client';

import { useMath } from '../hooks/useMath';
import GameModeSelect from './GameModeSelect';
import QuizScreen from './QuizScreen';
import GameOverScreen from './GameOverScreen';
import GameStats from './GameStats';
import { useRouter } from 'next/navigation';

export default function MathGame() {
  const router = useRouter();
  const {
    gameMode,
    difficulty,
    operation,
    isPlaying,
    gameOver,
    currentQuestion,
    score,
    streak,
    timeLeft,
    totalQuestions,
    highScore,
    correctAnswers,
    wrongAnswers,
    startGame,
    handleAnswer,
    resetGame,
  } = useMath();

  if (!gameMode) {
    return <GameModeSelect onSelectMode={startGame} />;
  }

  if (gameOver) {
    return (
      <GameOverScreen
        score={score}
        totalQuestions={totalQuestions}
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        highScore={highScore}
        difficulty={difficulty}
        gameMode={gameMode}
        operation={operation}
        onRestart={resetGame}
      />
    );
  }

  return (
    <div className="math-container">
      <button onClick={() => router.back()} className="btn-back">
        ← Volver
      </button>
      <div className="math-wrapper">
        <h1 className="game-title">
          <span className="gradient-text">🧮 Matemáticas Rápidas</span>
        </h1>

        <GameStats
          score={score}
          streak={streak}
          timeLeft={timeLeft}
          gameMode={gameMode}
          totalQuestions={totalQuestions}
          currentQuestion={totalQuestions - timeLeft + 1}
        />

        {currentQuestion && (
          <QuizScreen
            question={currentQuestion}
            onAnswer={handleAnswer}
            streak={streak}
          />
        )}
      </div>

      <style jsx>{`
        .math-container {
          min-height: 100vh;
          background: var(--color-dark-bg);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          position: relative;
        }

        .btn-back {
          position: absolute;
          top: 2rem;
          left: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .btn-back:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .math-wrapper {
          max-width: 600px;
          width: 100%;
        }

        .game-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }

        .gradient-text {
          background: var(--gradient-epic);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 640px) {
          .game-title {
            font-size: 1.75rem;
          }
          
          .math-container {
            padding: 1rem;
            padding-top: 5rem; /* Add padding to avoid overlap */
          }

          .btn-back {
            top: 1.5rem;
            left: 1.5rem;
            padding: 0.4rem 0.8rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}