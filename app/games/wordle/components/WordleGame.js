// app/games/wordle/components/WordleGame.js
'use client';

import { useState, useEffect } from 'react';
import { useWordle } from '../hooks/useWordle';
import { Guesses } from './Guesses';
import { Keyboard } from './Keyboard';
import { ResultModal } from './ResultModal';
import { getRandomWord } from '../services/wordleService';
import Link from 'next/link';

const WordleGame = () => {
  const [wordToGuess, setWordToGuess] = useState('');
  const [showResult, setShowResult] = useState(false);

  const {
    word,
    guesses,
    currentGuess,
    gameOver,
    gameWon,
    message,
    guessCount,
    maxGuesses,
    addLetter,
    removeLetter,
    submitGuess,
    resetGame,
    getLetterColor,
  } = useWordle(wordToGuess);

  // Inicializar palabra
  useEffect(() => {
    const randomWord = getRandomWord();
    setWordToGuess(randomWord);
  }, []);

  // Mostrar modal cuando termine el juego
  useEffect(() => {
    if (gameOver) {
      setShowResult(true);
    }
  }, [gameOver]);

  const handleReset = () => {
    setShowResult(false);
    const randomWord = getRandomWord();
    setWordToGuess(randomWord);
    resetGame();
  };

  if (!wordToGuess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--color-dark-bg)] via-[#1E3A8A] to-[var(--color-dark-bg)] flex items-center justify-center">
        <div className="text-center">
          <div
            className="inline-block w-16 h-16 rounded-full animate-spin mb-4"
            style={{
              background: 'conic-gradient(var(--color-primary), var(--color-secondary), var(--color-accent))',
              WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 70%)',
              maskImage: 'radial-gradient(circle, transparent 40%, black 70%)'
            }}
          />
          <p className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Cargando palabra...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-dark-bg)] via-[#1E3A8A] to-[var(--color-dark-bg)] flex flex-col items-center justify-start p-4 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-[var(--color-secondary)] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-radial from-[var(--color-primary)] opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl w-full relative z-10 mt-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:relative text-center mb-8 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="sm:absolute sm:left-0 mb-4 sm:mb-0">
            <Link href="/" className="btn btn-secondary">
              &larr; Volver
            </Link>
          </div>
          <div className="flex-grow">
            <h1 className="text-5xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
              🔤 Wordle
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] mx-auto rounded-full" />
            <p className="text-sm text-[rgba(241,245,249,0.7)] mt-4">
              Adivina la palabra en 6 intentos
            </p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div
            className="rounded-lg p-4 backdrop-blur-md border text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 100%)',
              borderColor: 'rgba(251,191,36,0.3)'
            }}
          >
            <p className="text-xs font-semibold text-[var(--color-accent)] uppercase mb-1">Intentos</p>
            <p className="text-2xl font-black text-white">{guessCount}/{maxGuesses}</p>
          </div>

          <div
            className="rounded-lg p-4 backdrop-blur-md border text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)',
              borderColor: 'rgba(59,130,246,0.3)'
            }}
          >
            <p className="text-xs font-semibold text-[var(--color-info)] uppercase mb-1">Restantes</p>
            <p className="text-2xl font-black text-white">{maxGuesses - guessCount}</p>
          </div>

          <div
            className="rounded-lg p-4 backdrop-blur-md border text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)',
              borderColor: 'rgba(16,185,129,0.3)'
            }}
          >
            <p className="text-xs font-semibold text-[var(--color-success)] uppercase mb-1">Letras</p>
            <p className="text-2xl font-black text-white">{word.length}</p>
          </div>
        </div>

        {/* Mensaje */}
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.3)] text-center">
            <p className="text-sm font-semibold text-[var(--color-accent)]">
              {message}
            </p>
          </div>
        )}

        {/* Guesses */}
        <Guesses
          guesses={guesses}
          currentGuess={currentGuess}
          word={word}
          getLetterColor={getLetterColor}
          maxGuesses={maxGuesses}
        />

        {/* Teclado */}
        <Keyboard
          currentGuess={currentGuess}
          guesses={guesses}
          word={word}
          onAddLetter={addLetter}
          onRemoveLetter={removeLetter}
          onSubmitGuess={submitGuess}
          gameOver={gameOver}
        />

        {/* Instrucciones */}
        <div className="mt-8 p-4 rounded-lg bg-[rgba(109,40,217,0.1)] border border-[rgba(109,40,217,0.3)] text-center text-sm text-[rgba(241,245,249,0.7)]">
          <p>
            <span className="text-[var(--color-success)]">🟩 Verde</span> = Letra correcta en posición correcta<br />
            <span className="text-[var(--color-accent)]">🟨 Amarillo</span> = Letra correcta en posición incorrecta<br />
            <span className="text-gray-500">⬜ Gris</span> = Letra no está en la palabra
          </p>
        </div>
      </div>

      {/* Result Modal */}
      {showResult && (
        <ResultModal
          gameWon={gameWon}
          word={word}
          guessCount={guessCount}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default WordleGame;