// app/games/flags/hooks/useFlags.js
import { useState, useEffect, useCallback } from 'react';
import { getRandomCountries, generateOptions, getCountriesByDifficulty } from '../services/flagsService';

const GAME_MODES = {
  normal: { questions: 20, timeLimit: null },
  timed: { questions: 30, timeLimit: 60 },
};

export function useFlags() {
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  const [currentFlag, setCurrentFlag] = useState(null);
  const [options, setOptions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hint, setHint] = useState(null);
  
  const [highScore, setHighScore] = useState(0);
  const [questionsQueue, setQuestionsQueue] = useState([]);

  // Cargar high score
  useEffect(() => {
    if (gameMode && difficulty) {
      const key = `flags-highscore-${gameMode}-${difficulty}`;
      const saved = localStorage.getItem(key);
      if (saved) setHighScore(parseInt(saved));
    }
  }, [gameMode, difficulty]);

  // Timer para modo con tiempo
  useEffect(() => {
    if (gameMode === 'timed' && isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
  }, [timeLeft, isPlaying, gameMode]);

  const startGame = useCallback((mode, diff) => {
    setGameMode(mode);
    setDifficulty(diff);
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setStreak(0);
    setQuestionNumber(0);
    setHintsUsed(0);
    setHint(null);
    
    const config = GAME_MODES[mode];
    setTotalQuestions(config.questions);
    setTimeLeft(config.timeLimit);
    
    // Generar todas las preguntas
    const countries = getRandomCountries(config.questions, diff);
    setQuestionsQueue(countries);
    loadNextQuestion(countries, 0);
  }, []);

  const loadNextQuestion = useCallback((queue, qNumber) => {
    if (qNumber >= queue.length) {
      setIsPlaying(false);
      setGameOver(true);
      return;
    }

    const country = queue[qNumber];
    const allCountries = getCountriesByDifficulty(difficulty);
    const opts = generateOptions(country, allCountries, 4);
    
    setCurrentFlag(country);
    setOptions(opts);
    setQuestionNumber(qNumber + 1);
    setHint(null);
  }, [difficulty]);

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setGameOver(true);
    
    // Guardar high score
    if (score > highScore) {
      const key = `flags-highscore-${gameMode}-${difficulty}`;
      localStorage.setItem(key, score.toString());
      setHighScore(score);
    }
  }, [score, highScore, gameMode, difficulty]);

  const handleAnswer = useCallback((selectedCountry) => {
    const isCorrect = selectedCountry.code === currentFlag.code;
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      loadNextQuestion(questionsQueue, questionNumber);
    }, 1000);
  }, [currentFlag, score, streak, questionNumber, questionsQueue, loadNextQuestion]);

  const useHint = useCallback(() => {
    if (hint || hintsUsed >= 3) return;
    
    setHintsUsed(hintsUsed + 1);
    setHint({
      continent: currentFlag.continent,
      capital: currentFlag.capital,
    });
  }, [hint, hintsUsed, currentFlag]);

  const resetGame = useCallback(() => {
    setGameMode(null);
    setDifficulty('easy');
    setIsPlaying(false);
    setGameOver(false);
    setCurrentFlag(null);
    setOptions([]);
    setScore(0);
    setStreak(0);
    setQuestionNumber(0);
    setTimeLeft(null);
    setHintsUsed(0);
    setHint(null);
  }, []);

  return {
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
    hint,
    startGame,
    handleAnswer,
    useHint,
    resetGame,
  };
}