// app/games/memory/hooks/useMemory.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateCards, shuffleArray } from '../services/cardService';

export const useMemory = (difficulty) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [startTime] = useState(Date.now());

  // Inicializar el juego
  useEffect(() => {
    if (difficulty) {
      const newCards = generateCards(difficulty);
      setCards(newCards);
      setFlipped([]);
      setMatched([]);
      setAttempts(0);
      setGameOver(false);
      setGameWon(false);
    }
  }, [difficulty]);

  // Verificar si dos tarjetas coinciden
  useEffect(() => {
    if (flipped.length !== 2) return;

    const [first, second] = flipped;
    const firstCard = cards[first];
    const secondCard = cards[second];

    setAttempts(prev => prev + 1);

    if (firstCard.id === secondCard.id) {
      setMatched(prev => [...prev, firstCard.id]);
      setFlipped([]);
    } else {
      setTimeout(() => {
        setFlipped([]);
      }, 1000);
    }
  }, [flipped, cards]);

  // Verificar si ganó
  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length / 2) {
      setGameWon(true);
      setGameOver(true);
    }
  }, [matched, cards]);

  const handleCardClick = useCallback((index) => {
    if (gameOver || gameWon) return;
    if (flipped.includes(index)) return;
    if (matched.includes(cards[index].id)) return;

    setFlipped(prev => {
      if (prev.length === 2) return prev;
      return [...prev, index];
    });
  }, [flipped, matched, cards, gameOver, gameWon]);

  const resetGame = useCallback(() => {
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
    setGameOver(false);
    setGameWon(false);
    const newCards = generateCards(difficulty);
    setCards(newCards);
  }, [difficulty]);

  const getTimeElapsed = () => {
    return Math.floor((Date.now() - startTime) / 1000);
  };

  return {
    cards,
    flipped,
    matched,
    attempts,
    gameOver,
    gameWon,
    handleCardClick,
    resetGame,
    getTimeElapsed,
  };
};