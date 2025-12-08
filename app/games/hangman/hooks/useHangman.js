'use client';

import { useState, useEffect, useCallback } from 'react';
import { getRandomQuestion } from '../services/wordService';

const MAX_WRONG_GUESSES = 6;

export const useHangman = () => {
  const [question, setQuestion] = useState({ question: '', answer: '' });
  const [guessedLetters, setGuessedLetters] = useState([]);

  useEffect(() => {
    setQuestion(getRandomQuestion());
  }, []);

  const wordToGuess = question.answer;

  const wrongGuesses = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  );

  const isWinner = wordToGuess && wordToGuess
    .split('')
    .every(letter => guessedLetters.includes(letter));

  const isLoser = wrongGuesses.length >= MAX_WRONG_GUESSES;

  const guessLetter = useCallback(
    (letter) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;
      setGuessedLetters(currentLetters => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  const restartGame = () => {
    setQuestion(getRandomQuestion());
    setGuessedLetters([]);
  };

  return {
    question: question.question,
    wordToGuess,
    guessedLetters,
    wrongGuesses,
    isWinner,
    isLoser,
    guessLetter,
    restartGame,
  };
};