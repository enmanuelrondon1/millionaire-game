// app/games/hangman/components/HangmanGame.js
'use client';

import { useEffect, useState } from 'react';
import { HangmanDrawing } from './HangmanDrawing';
import { Word } from './Word';
import { Keyboard } from './Keyboard';
import { useHangman } from '../hooks/useHangman';
import Link from 'next/link';

const HangmanGame = () => {
  const {
    question,
    wordToGuess,
    guessedLetters,
    wrongGuesses,
    isWinner,
    isLoser,
    guessLetter,
    restartGame,
  } = useHangman();

  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isWinner || isLoser) {
      setShowResult(true);
    }
  }, [isWinner, isLoser]);

  const handleRestartGame = () => {
    setShowResult(false);
    restartGame();
  };

  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toLowerCase();
      if (key.match(/^[a-záéíóúñ]$/)) {
        e.preventDefault();
        guessLetter(key);
      }
    };

    document.addEventListener('keypress', handler);
    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [guessLetter]);

  const correctGuesses = guessedLetters.filter(letter => 
    wordToGuess.includes(letter)
  ).length;
  const totalAttempts = guessedLetters.length;
  const accuracy = totalAttempts > 0 ? Math.round((correctGuesses / totalAttempts) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-dark-bg)] via-[#1E3A8A] to-[var(--color-dark-bg)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-[var(--color-secondary)] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-radial from-[var(--color-primary)] opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:relative text-center mb-8 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="sm:absolute sm:left-0">
            <Link href="/" className="btn btn-secondary mb-4 sm:mb-0">
              Volver
            </Link>
          </div>
          <div className="flex-grow">
            <h1 className="text-5xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
              🎮 Ahorcado
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] mx-auto rounded-full" />
          </div>
        </div>

        {/* Categoría/Pregunta */}
        <div
          className="rounded-2xl p-6 sm:p-8 backdrop-blur-md border mb-8 animate-in fade-in slide-in-from-top duration-500 delay-100"
          style={{
            background: 'linear-gradient(135deg, rgba(109,40,217,0.15) 0%, rgba(6,182,212,0.1) 100%)',
            borderColor: 'rgba(109,40,217,0.3)'
          }}
        >
          <p className="text-sm font-semibold text-[rgba(241,245,249,0.7)] uppercase mb-2">
            📚 Categoría
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
            {question}
          </h2>
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Dibujo del Ahorcado */}
          <div
            className="rounded-2xl p-6 sm:p-8 backdrop-blur-md border flex items-center justify-center min-h-80 animate-in fade-in slide-in-from-left duration-500 delay-200"
            style={{
              background: 'linear-gradient(135deg, rgba(109,40,217,0.1) 0%, rgba(6,182,212,0.05) 100%)',
              borderColor: 'rgba(109,40,217,0.3)'
            }}
          >
            <HangmanDrawing numberOfGuesses={wrongGuesses.length} />
          </div>

          {/* Palabra a Adivinar */}
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right duration-500 delay-200">
            {/* Palabra */}
            <div
              className="rounded-2xl p-8 backdrop-blur-md border text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(109,40,217,0.1) 100%)',
                borderColor: 'rgba(6,182,212,0.3)'
              }}
            >
              <p className="text-sm font-semibold text-[rgba(241,245,249,0.7)] uppercase mb-4">
                La Palabra
              </p>
              <Word wordToGuess={wordToGuess} guessedLetters={guessedLetters} />
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-lg p-4 backdrop-blur-md border text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)',
                  borderColor: 'rgba(16,185,129,0.3)'
                }}
              >
                <p className="text-xs font-semibold text-[var(--color-success)] uppercase mb-1">
                  Correctas
                </p>
                <p className="text-3xl font-black text-white">
                  {correctGuesses}
                </p>
              </div>

              <div
                className="rounded-lg p-4 backdrop-blur-md border text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.05) 100%)',
                  borderColor: 'rgba(239,68,68,0.3)'
                }}
              >
                <p className="text-xs font-semibold text-[var(--color-error)] uppercase mb-1">
                  Errores
                </p>
                <p className="text-3xl font-black text-white">
                  {wrongGuesses.length}/6
                </p>
              </div>
            </div>

            {/* Precisión */}
            <div
              className="rounded-lg p-4 backdrop-blur-md border"
              style={{
                background: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 100%)',
                borderColor: 'rgba(251,191,36,0.3)'
              }}
            >
              <p className="text-xs font-semibold text-[var(--color-accent)] uppercase mb-2">
                Precisión
              </p>
              <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden border border-[rgba(251,191,36,0.2)]">
                <div
                  className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] transition-all duration-500"
                  style={{
                    width: `${accuracy}%`,
                    boxShadow: accuracy > 0 ? '0 0 10px rgba(251,191,36,0.6)' : 'none'
                  }}
                />
              </div>
              <p className="text-sm font-bold text-white mt-2 text-center">
                {accuracy}%
              </p>
            </div>
          </div>
        </div>

        {/* Teclado */}
        <div
          className="rounded-2xl p-6 sm:p-8 backdrop-blur-md border mb-8 animate-in fade-in slide-in-from-bottom duration-500 delay-300"
          style={{
            background: 'linear-gradient(135deg, rgba(109,40,217,0.1) 0%, rgba(6,182,212,0.05) 100%)',
            borderColor: 'rgba(109,40,217,0.3)'
          }}
        >
          <p className="text-sm font-semibold text-[rgba(241,245,249,0.7)] uppercase mb-4 text-center">
            ⌨️ Selecciona las Letras
          </p>
          <Keyboard
            activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
            inactiveLetters={wrongGuesses}
            onSelectLetter={guessLetter}
            disabled={isWinner || isLoser}
          />
        </div>

        {/* Resultado Modal */}
        {showResult && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div
              className="rounded-2xl p-8 sm:p-12 backdrop-blur-md border max-w-md w-full transform animate-in scale-in duration-300"
              style={{
                background: isWinner
                  ? 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.1) 100%)',
                borderColor: isWinner ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'
              }}
            >
              {/* Ícono */}
              <div className="text-center mb-6">
                <div className="text-7xl mb-4 animate-bounce">
                  {isWinner ? '🎉' : '💀'}
                </div>
                <h3 className="text-4xl font-black mb-2" style={{
                  color: isWinner ? 'var(--color-success)' : 'var(--color-error)'
                }}>
                  {isWinner ? '¡Ganaste!' : '¡Perdiste!'}
                </h3>
                <p className="text-[rgba(241,245,249,0.8)]">
                  {isWinner 
                    ? '🏆 ¡Felicidades, adivinaste la palabra!' 
                    : `La palabra era: "${wordToGuess.toUpperCase()}"`}
                </p>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-[rgba(241,245,249,0.2)]">
                <div className="text-center">
                  <p className="text-xs text-[rgba(241,245,249,0.6)] uppercase mb-1">Intentos Correctos</p>
                  <p className="text-2xl font-black text-[var(--color-success)]">{correctGuesses}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-[rgba(241,245,249,0.6)] uppercase mb-1">Errores</p>
                  <p className="text-2xl font-black text-[var(--color-error)]">{wrongGuesses.length}</p>
                </div>
              </div>

              {/* Botones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleRestartGame}
                  className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                    boxShadow: '0 10px 30px rgba(109,40,217,0.4)'
                  }}
                >
                  🔄 Jugar de Nuevo
                </button>

                <Link href="/">
                  <button
                    className="w-full px-6 py-3 rounded-xl font-bold border-2 transition-all duration-300"
                    style={{
                      borderColor: 'var(--color-secondary)',
                      color: 'var(--color-secondary)',
                      background: 'rgba(6,182,212,0.1)'
                    }}
                  >
                    🏠 Ir a Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
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

export default HangmanGame;