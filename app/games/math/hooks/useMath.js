// app/games/math/hooks/useMath.js
import { useState, useEffect, useCallback } from 'react';
import { generateQuestion, generateOptions } from '../services/mathService';

const GAME_MODES = {
  timed: { timeLimit: 60, name: 'Contrarreloj' },
  questions: { questionsLimit: 20, name: 'Por Preguntas' },
};

export function useMath() {
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [operation, setOperation] = useState('addition');
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(0);
  
  const [highScore, setHighScore] = useState(0);

  // Cargar high score
  useEffect(() => {
    if (gameMode && difficulty && operation) {
      const key = `math-highscore-${gameMode}-${difficulty}-${operation}`;
      const saved = localStorage.getItem(key);
      if (saved) setHighScore(parseInt(saved));
    }
  }, [gameMode, difficulty, operation]);

  // Timer
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

  const startGame = useCallback((mode, diff, oper) => {
    setGameMode(mode);
    setDifficulty(diff);
    setOperation(oper);
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setStreak(0);
    setQuestionCount(0);
    
    const config = GAME_MODES[mode];
    if (mode === 'timed') {
      setTimeLeft(config.timeLimit);
      setTotalQuestions(0); // Se cuenta dinámicamente
    } else {
      setTotalQuestions(config.questionsLimit);
      setTimeLeft(null);
    }
    
    loadNextQuestion(diff, oper);
  }, []);

  const loadNextQuestion = useCallback((diff, oper) => {
    const question = generateQuestion(oper, diff);
    const opts = generateOptions(question.answer, 4);
    
    setCurrentQuestion(question);
    setOptions(opts);
    setQuestionCount(prev => prev + 1);
  }, []);

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setGameOver(true);
    
    // Guardar high score
    if (score > highScore) {
      const key = `math-highscore-${gameMode}-${difficulty}-${operation}`;
      localStorage.setItem(key, score.toString());
      setHighScore(score);
    }
  }, [score, highScore, gameMode, difficulty, operation]);

  const handleAnswer = useCallback((selectedAnswer) => {
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    if (isCorrect) {
      const basePoints = 10;
      const streakBonus = streak * 2;
      const timeBonus = gameMode === 'timed' ? Math.floor(timeLeft / 10) : 0;
      const points = basePoints + streakBonus + timeBonus;
      
      setScore(score + points);
      setCorrectAnswers(correctAnswers + 1);
      setStreak(streak + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setStreak(0);
    }

    // Verificar si el juego debe terminar
    if (gameMode === 'questions' && questionCount >= totalQuestions) {
      setTimeout(() => endGame(), 500);
      return;
    }

    // Cargar siguiente pregunta
    setTimeout(() => {
      loadNextQuestion(difficulty, operation);
    }, 500);
  }, [currentQuestion, score, streak, timeLeft, correctAnswers, wrongAnswers, gameMode, questionCount, totalQuestions, difficulty, operation, loadNextQuestion, endGame]);

  const resetGame = useCallback(() => {
    setGameMode(null);
    setDifficulty('easy');
    setOperation('addition');
    setIsPlaying(false);
    setGameOver(false);
    setCurrentQuestion(null);
    setOptions([]);
    setScore(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setStreak(0);
    setQuestionCount(0);
    setTimeLeft(null);
  }, []);

  return {
    gameMode,
    difficulty,
    operation,
    isPlaying,
    gameOver,
    currentQuestion,
    options,
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
  };
}
