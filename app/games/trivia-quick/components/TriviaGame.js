// app/games/trivia-quick/components/TriviaGame.js
'use client';

import { useEffect, useState } from 'react';
import { useTrivia } from '../hooks/useTrivia';
import { QuestionCard } from './QuestionCard';
import { StreakCounter } from './StreakCounter';
import { GameOverScreen } from './GameOverScreen';
import Link from 'next/link';

const TriviaGame = ({ questions }) => {
  const [isLoading, setIsLoading] = useState(true);

  const {
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
  } = useTrivia(questions);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setIsLoading(false);
    }
  }, [questions]);

  if (isLoading || !questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--color-dark-bg)] via-[#1E3A8A] to-[var(--color-dark-bg)] flex flex-col items-center justify-center">
        <div className="relative z-10 text-center">
          <div className="mb-6">
            <div
              className="inline-block w-16 h-16 rounded-full animate-spin"
              style={{
                background: 'conic-gradient(var(--color-primary), var(--color-secondary), var(--color-accent))',
                WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 70%)',
                maskImage: 'radial-gradient(circle, transparent 40%, black 70%)'
              }}
            />
          </div>
          <p className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Cargando preguntas...
          </p>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <GameOverScreen
        score={score}
        streak={streak}
        totalQuestions={questions.length}
        onReset={resetGame}
      />
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-dark-bg)] via-[#1E3A8A] to-[var(--color-dark-bg)] flex flex-col items-center justify-start p-4 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-[var(--color-primary)] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-radial from-[var(--color-secondary)] opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl w-full relative z-10 mt-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:relative text-center mb-8 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="sm:absolute sm:left-0 mb-4 sm:mb-0">
            <Link href="/" className="btn-secondary">
              &larr; Volver
            </Link>
          </div>
          <div className="flex-grow">
            <h1 className="text-5xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
              ⚡ Trivia Rápida
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] mx-auto rounded-full" />
          </div>
        </div>

        {/* Estadísticas */}
        <StreakCounter
          streak={streak}
          score={score}
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
        />

        {/* Pregunta */}
        <QuestionCard
          question={currentQuestionData.question}
          currentQuestionNum={currentQuestion + 1}
          totalQuestions={questions.length}
          answers={currentQuestionData.answers}
          selectedAnswer={selectedAnswer}
          answered={answered}
          timeLeft={timeLeft}
          timerActive={timerActive}
          onAnswer={handleAnswer}
          correctAnswer={currentQuestionData.correct}
        />
      </div>
    </div>
  );
};

export default TriviaGame;