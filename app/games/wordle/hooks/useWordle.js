// app/games/wordle/hooks/useWordle.js
'use client';

import { useState, useEffect, useCallback } from 'react';

const MAX_GUESSES = 6;

export const useWordle = (wordToGuess) => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [message, setMessage] = useState('');

  const word = wordToGuess ? wordToGuess.toUpperCase() : '';
  const guessCount = guesses.length;
  const isGameOver = gameWon || guessCount >= MAX_GUESSES;

  // Validar letra
  const isValidLetter = (letter) => /^[a-záéíóúñ]$/i.test(letter);

  // Agregar letra al guess actual
  const addLetter = useCallback((letter) => {
    if (gameOver || currentGuess.length >= 5) return;
    if (!isValidLetter(letter)) return;

    setCurrentGuess(prev => (prev + letter).toUpperCase());
  }, [currentGuess, gameOver]);

  // Eliminar última letra
  const removeLetter = useCallback(() => {
    setCurrentGuess(prev => prev.slice(0, -1));
  }, []);

  // Enviar guess
  const submitGuess = useCallback(() => {
    if (currentGuess.length !== 5) {
      setMessage('La palabra debe tener 5 letras');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (guesses.includes(currentGuess)) {
      setMessage('Ya intentaste esta palabra');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    if (currentGuess === word) {
      setGameWon(true);
      setGameOver(true);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
    }

    setCurrentGuess('');
  }, [currentGuess, guesses, word]);

  // Manejar Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        submitGuess();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        removeLetter();
      } else if (isValidLetter(e.key)) {
        e.preventDefault();
        addLetter(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameOver, addLetter, removeLetter, submitGuess]);

  // Función para obtener color de letra
  const getLetterColor = (letter, index, guess) => {
    if (letter === word[index]) {
      return 'correct'; // Verde
    }
    if (word.includes(letter)) {
      return 'present'; // Amarillo
    }
    return 'absent'; // Gris
  };

  const resetGame = useCallback(() => {
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setGameWon(false);
    setMessage('');
  }, []);

  return {
    word,
    guesses,
    currentGuess,
    gameOver,
    gameWon,
    message,
    guessCount,
    maxGuesses: MAX_GUESSES,
    addLetter,
    removeLetter,
    submitGuess,
    resetGame,
    getLetterColor,
  };
};