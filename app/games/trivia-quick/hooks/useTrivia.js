// app/games/trivia-quick/hooks/useTrivia.js
'use client';

import { useState, useEffect, useCallback } from 'react';

const TIMER_DURATION = 10; // 10 segundos por pregunta

export const useTrivia = (questions) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [timerActive, setTimerActive] = useState(false);

  // Iniciar timer cuando hay preguntas
  useEffect(() => {
    if (questions && questions.length > 0) {
      setTimerActive(true);
      setTimeLeft(TIMER_DURATION);
    }
  }, [questions]);

  // Timer Logic
  useEffect(() => {
    if (!timerActive || answered || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTimerActive(false);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, answered, gameOver]);

  const handleTimeUp = () => {
    setAnswered(true);
    setStreak(0); // Se rompe la racha si se acaba el tiempo
  };

  const handleAnswer = useCallback((index) => {
    if (answered || gameOver) return;

    setSelectedAnswer(index);
    setAnswered(true);
    setTimerActive(false);

    const isCorrect = index === questions[currentQuestion].correct;

    if (isCorrect) {
      const newScore = score + (timeLeft * 10); // Bonus por tiempo restante
      setScore(newScore);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion === questions.length - 1) {
        setGameOver(true);
      } else {
        nextQuestion();
      }
    }, 1000);
  }, [currentQuestion, questions, answered, gameOver, score, timeLeft]);

  const nextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer(null);
    setAnswered(false);
    setTimeLeft(TIMER_DURATION);
    setTimerActive(true);
  };

  const resetGame = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setStreak(0);
    setAnswered(false);
    setGameOver(false);
    setTimeLeft(TIMER_DURATION);
    setTimerActive(false);
  }, []);

  return {
    currentQuestion,
    selectedAnswer,
    score,
    streak,
    answered,
    gameOver,
    timeLeft,
    timerActive,
    handleAnswer,
    resetGame,
  };
};