// app/games/simon/hooks/useSimon.js
import { useState, useEffect, useCallback } from 'react';
import { playSound, stopAllSounds } from '../services/soundService';

const SPEEDS = {
  easy: 1000,
  medium: 700,
  hard: 400
};

export function useSimon() {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [speed, setSpeed] = useState('medium');

  // Cargar high score del localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('simon-highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Reproducir secuencia
  const playSequence = useCallback(async (seq) => {
    setIsUserTurn(false);
    setUserSequence([]);

    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const colorId = seq[i];
      setActiveButton(colorId);
      playSound(colorId);
      
      await new Promise(resolve => setTimeout(resolve, SPEEDS[speed]));
      setActiveButton(null);
    }

    setIsUserTurn(true);
  }, [speed]);

  // Agregar nuevo color a la secuencia
  const addToSequence = useCallback(() => {
    const newColor = Math.floor(Math.random() * 4);
    const newSequence = [...sequence, newColor];
    setSequence(newSequence);
    playSequence(newSequence);
  }, [sequence, playSequence]);

  // Iniciar juego
  const startGame = useCallback(() => {
    setSequence([]);
    setUserSequence([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    
    const firstColor = Math.floor(Math.random() * 4);
    const initialSequence = [firstColor];
    setSequence(initialSequence);
    playSequence(initialSequence);
  }, [playSequence]);

  // Manejar click del usuario
  const handleButtonClick = useCallback((colorId) => {
    if (!isUserTurn || !isPlaying) return;

    // Reproducir sonido
    setActiveButton(colorId);
    playSound(colorId);
    setTimeout(() => setActiveButton(null), 300);

    const newUserSequence = [...userSequence, colorId];
    setUserSequence(newUserSequence);

    // Verificar si es correcto
    const currentIndex = newUserSequence.length - 1;
    if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
      // Error - Game Over
      stopAllSounds();
      setGameOver(true);
      setIsPlaying(false);
      
      // Actualizar high score
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('simon-highscore', score.toString());
      }
      return;
    }

    // Si completó la secuencia correctamente
    if (newUserSequence.length === sequence.length) {
      setScore(score + 1);
      setTimeout(() => {
        addToSequence();
      }, 1000);
    }
  }, [isUserTurn, isPlaying, userSequence, sequence, score, highScore, addToSequence]);

  // Reiniciar juego
  const resetGame = useCallback(() => {
    stopAllSounds();
    setSequence([]);
    setUserSequence([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
    setIsUserTurn(false);
    setActiveButton(null);
  }, []);

  // Cambiar velocidad
  const changeSpeed = useCallback((newSpeed) => {
    setSpeed(newSpeed);
  }, []);

  return {
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
  };
}