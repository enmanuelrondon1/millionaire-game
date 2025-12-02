// app/games/simon/components/SimonGame.js
'use client';

import { useSimon } from '../hooks/useSimon';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import GameStats from './GameStats';
import GameOverScreen from './GameOverScreen';
import Link from 'next/link';

export default function SimonGame() {
  const {
    sequence,
    userSequence,
    isPlaying,
    isUserTurn,
    score,
    highScore,
    gameOver,
    activeButton,
    speed,
    startGame,
    handleButtonClick,
    resetGame,
    changeSpeed
  } = useSimon();

  if (gameOver) {
    return (
      <GameOverScreen
        score={score}
        highScore={highScore}
        onRestart={resetGame}
      />
    );
  }

  return (
    <div className="simon-container">
      <div className="simon-wrapper">
        <div className="header">
          <div className="back-button-container">
            <Link href="/" className="btn btn-secondary">
              Volver
            </Link>
          </div>
          <h1 className="game-title">
            <span className="gradient-text">Simon Dice</span>
          </h1>
        </div>

        <GameStats
          score={score}
          highScore={highScore}
          isUserTurn={isUserTurn}
          speed={speed}
        />

        <GameBoard
          activeButton={activeButton}
          onButtonClick={handleButtonClick}
          disabled={!isUserTurn || !isPlaying}
        />

        <GameControls
          isPlaying={isPlaying}
          speed={speed}
          onStart={startGame}
          onSpeedChange={changeSpeed}
        />
      </div>

      <style jsx>{`
        .simon-container {
          min-height: 100vh;
          background: var(--color-dark-bg);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          transition: padding 0.3s ease;
        }

        .simon-wrapper {
          max-width: 600px;
          width: 100%;
          transition: max-width 0.3s ease;
        }

        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
          transition: margin-bottom 0.3s ease;
        }

        .game-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 800;
          order: 2; /* El título va después del botón en el flujo visual */
        }
        
        .back-button-container {
          order: 1; /* El botón va primero */
        }

        .gradient-text {
          background: var(--gradient-epic);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (min-width: 768px) { /* Cambios para escritorio */
          .simon-container {
            padding: 1rem; /* Reducir padding vertical */
          }

          .simon-wrapper {
            max-width: 480px; /* Reducir el ancho máximo para hacer el tablero más pequeño */
          }

          .header {
            flex-direction: row;
            justify-content: center;
            position: relative;
            margin-bottom: 1.5rem; /* Reducir margen inferior */
          }
          .game-title {
            font-size: 2.5rem; /* Reducir tamaño del título */
            margin-bottom: 0;
          }
          .back-button-container {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}