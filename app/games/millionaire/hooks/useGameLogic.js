//app/games/millionaire/hooks/useGameLogic.js
'use client';

import { useState, useEffect } from 'react';

const TIMER_DURATION = 30;

export const useGameLogic = (questions) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userMoney, setUserMoney] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [used5050, setUsed5050] = useState(false);
  const [usedFriend, setUsedFriend] = useState(false);
  const [usedPublic, setUsedPublic] = useState(false);
  const [availableAnswers, setAvailableAnswers] = useState([0, 1, 2, 3]);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [timerActive, setTimerActive] = useState(false);
  const [friendAdvice, setFriendAdvice] = useState(null);
  const [publicVotes, setPublicVotes] = useState(null);
  const [gameQuestions, setGameQuestions] = useState(questions);

  // Resetea el timer cuando las preguntas cambian (nueva dificultad seleccionada)
  useEffect(() => {
    setTimeLeft(TIMER_DURATION);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setUsed5050(false);
    setUsedFriend(false);
    setUsedPublic(false);
    setAvailableAnswers([0, 1, 2, 3]);
    setFriendAdvice(null);
    setPublicVotes(null);
    setGameOver(false);
    setGameWon(false);
    // Inicia el timer solo cuando hay preguntas
    if (questions && questions.length > 0) {
      setTimerActive(true);
    }
  }, [questions]);

  // Timer Logic - Solo corre cuando timerActive es true
  useEffect(() => {
    if (!timerActive || answered || gameOver || gameWon) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTimerActive(false);
          setAnswered(true);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, answered, gameOver, gameWon]);

  const handleAnswer = (index) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    setTimerActive(false);

    const isCorrect = index === questions[currentQuestion].correct;

    setTimeout(() => {
      if (isCorrect) {
        const prize = questions[currentQuestion].prize;
        setUserMoney(prize);

        if (currentQuestion === questions.length - 1) {
          setGameWon(true);
        } else {
          nextQuestion();
        }
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setAnswered(false);
    setAvailableAnswers([0, 1, 2, 3]);
    setTimeLeft(TIMER_DURATION);
    setTimerActive(true);
    setFriendAdvice(null);
    setPublicVotes(null);
  };

  const use5050 = () => {
    if (used5050 || answered) return;

    const correct = questions[currentQuestion].correct;
    const wrong = availableAnswers.filter(i => i !== correct);
    const toRemove = wrong.slice(0, 2);
    const remaining = availableAnswers.filter(i => !toRemove.includes(i));

    setAvailableAnswers(remaining);
    setUsed5050(true);
  };

  const useFriendLifeline = () => {
    if (usedFriend || answered) return;

    const correct = questions[currentQuestion].correct;
    const confidence = Math.random() > 0.25 ? correct : availableAnswers[Math.floor(Math.random() * availableAnswers.length)];
    
    setFriendAdvice(confidence);
    setUsedFriend(true);
  };

  const usePublicLifeline = () => {
    if (usedPublic || answered) return;

    const correct = questions[currentQuestion].correct;
    const votes = [0, 0, 0, 0];
    
    votes[correct] = 35 + Math.floor(Math.random() * 15);
    
    let remaining = 100 - votes[correct];
    for (let i = 0; i < 4; i++) {
      if (i !== correct && availableAnswers.includes(i)) {
        const vote = Math.floor(remaining / (availableAnswers.length - 1));
        votes[i] = vote;
      }
    }
    
    setPublicVotes(votes);
    setUsedPublic(true);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserMoney(0);
    setGameOver(false);
    setGameWon(false);
    setAnswered(false);
    setUsed5050(false);
    setUsedFriend(false);
    setUsedPublic(false);
    setAvailableAnswers([0, 1, 2, 3]);
    setTimeLeft(TIMER_DURATION);
    setTimerActive(false);
    setFriendAdvice(null);
    setPublicVotes(null);
  };

  const getSafeAmount = () => {
    const safePrizes = [100, 500, 5000, 32000, 500000];
    if (currentQuestion < 5) return safePrizes[currentQuestion];
    return safePrizes[4];
  };

  return {
    // State
    currentQuestion,
    selectedAnswer,
    userMoney,
    gameOver,
    gameWon,
    answered,
    used5050,
    usedFriend,
    usedPublic,
    availableAnswers,
    timeLeft,
    timerActive,
    friendAdvice,
    publicVotes,
    gameQuestions,
    // Handlers
    handleAnswer,
    use5050,
    useFriendLifeline,
    usePublicLifeline,
    resetGame,
    // Helpers
    getSafeAmount,
    setGameQuestions,
  };
};