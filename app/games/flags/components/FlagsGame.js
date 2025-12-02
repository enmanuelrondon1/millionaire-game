// app/games/flags/components/FlagsGame.js
'use client';

import { useFlags } from '../hooks/useFlags';
import GameModeSelect from './GameModeSelect';
import QuizScreen from './QuizScreen';
import GameOverScreen from './GameOverScreen';
import GameStats from './GameStats';
import Link from 'next/link';

export default function FlagsGame() {
  const {
    gameMode,
    difficulty,
    isPlaying,
    gameOver,
    currentFlag,
    options,
    score,
    streak,
    totalQuestions,
    timeLeft,
    hintsUsed,
    highScore,
    startGame,
    handleAnswer,
    useHint,
    resetGame,
    hint
  } = useFlags();

  if (!gameMode) {
    return <GameModeSelect onSelectMode={startGame} />;
  }

  if (gameOver) {
    return (
      <GameOverScreen
        score={score}
        totalQuestions={totalQuestions}
        highScore={highScore}
        difficulty={difficulty}
        gameMode={gameMode}
        onRestart={resetGame}
      />
    );
  }

  return (
    <div className="flags-container">
      <div className="flags-wrapper">
        <div className="header">
          <div className="back-button-container">
            <Link href="/" className="btn btn-secondary">
              &larr; Volver
            </Link>
          </div>
          <h1 className="game-title">
            <span className="gradient-text">🌍 Quiz de Banderas</span>
          </h1>
        </div>

        <GameStats
          score={score}
          streak={streak}
          timeLeft={timeLeft}
          gameMode={gameMode}
          hintsUsed={hintsUsed}
        />

        {currentFlag && (
          <QuizScreen
            flag={currentFlag}
            options={options}
            onAnswer={handleAnswer}
            onUseHint={useHint}
            hint={hint}
            hintsUsed={hintsUsed}
          />
        )}
      </div>

      <style jsx>{`
        .flags-container {
          min-height: 100vh;
          background: var(--color-dark-bg);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
        }

        .flags-wrapper {
          max-width: 700px;
          width: 100%;
        }

        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .game-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 800;
          order: 2;
        }
        
        .back-button-container {
          order: 1;
        }

        @media (min-width: 768px) {
          .header {
            flex-direction: row;
            justify-content: center;
            position: relative;
          }
          .game-title {
            font-size: 2.5rem;
            margin-bottom: 0;
            order: 1;
          }
          .back-button-container {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            order: 0;
          }
        }

        @media (max-width: 767px) {
          .game-title {
            font-size: 1.75rem;
          }
        }

        .flags-wrapper {
          width: 100%;
        }
      `}</style>
    </div>
  );
}