// app/games/trivia-quick/components/QuestionCard.js
'use client';

import { useState } from 'react';
import { FastTimer } from './FastTimer';

export const QuestionCard = ({
  question,
  currentQuestionNum,
  totalQuestions,
  answers,
  selectedAnswer,
  answered,
  timeLeft,
  timerActive,
  onAnswer,
  correctAnswer
}) => {
  const [hoveredAnswer, setHoveredAnswer] = useState(null);

  const getAnswerColor = (index) => {
    const colors = [
      { bg: 'rgba(59,130,246,0.2)', border: '#3B82F6' },
      { bg: 'rgba(168,85,247,0.2)', border: '#A855F7' },
      { bg: 'rgba(236,72,153,0.2)', border: '#EC4899' },
      { bg: 'rgba(34,211,238,0.2)', border: '#22D3EE' }
    ];
    return colors[index % colors.length];
  };

  const getAnswerStateColor = (index) => {
    if (!answered) return null;
    if (index === correctAnswer) return 'var(--color-success)';
    if (index === selectedAnswer && index !== correctAnswer) return 'var(--color-error)';
    return null;
  };

  return (
    <div className="w-full space-y-6 mb-12 animate-in fade-in slide-in-from-top duration-500">
      {/* Header con Timer */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-[rgba(241,245,249,0.7)]">
            Pregunta {currentQuestionNum} de {totalQuestions}
          </p>
          <div className="mt-2 h-1 w-full sm:w-32 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full" />
        </div>

        {/* Timer */}
        <div className="w-full sm:w-48">
          <FastTimer timeLeft={timeLeft} timerActive={timerActive} />
        </div>
      </div>

      {/* Tarjeta de Pregunta */}
      <div
        className="rounded-2xl p-8 backdrop-blur-md border transition-all duration-300 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(109,40,217,0.15) 0%, rgba(6,182,212,0.1) 100%)',
          borderColor: 'rgba(109,40,217,0.3)'
        }}
      >
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Pregunta */}
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
            {question}
          </h2>

          {/* Respuestas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {answers.map((answer, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === correctAnswer;
              const stateColor = getAnswerStateColor(index);
              const colors = getAnswerColor(index);

              return (
                <button
                  key={index}
                  onClick={() => !answered && onAnswer(index)}
                  disabled={answered}
                  onMouseEnter={() => setHoveredAnswer(index)}
                  onMouseLeave={() => setHoveredAnswer(null)}
                  className={`group relative p-5 rounded-xl transition-all duration-300 transform disabled:cursor-not-allowed text-left ${
                    answered ? '' : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: stateColor
                      ? stateColor === 'var(--color-success)'
                        ? 'rgba(16,185,129,0.2)'
                        : 'rgba(239,68,68,0.2)'
                      : colors.bg,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: stateColor ? stateColor : isSelected && !answered ? colors.border : 'rgba(255,255,255,0.1)',
                    boxShadow: stateColor
                      ? stateColor === 'var(--color-success)'
                        ? '0 0 20px rgba(16,185,129,0.5)'
                        : '0 0 20px rgba(239,68,68,0.5)'
                      : hoveredAnswer === index && !answered
                      ? `0 0 20px ${colors.border}80`
                      : 'none'
                  }}
                >
                  {/* Letra de respuesta */}
                  <div className="flex items-start gap-4">
                    <span
                      className="text-lg font-black mt-1 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-white"
                      style={{
                        background: colors.border
                      }}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>

                    {/* Texto de respuesta */}
                    <span className="text-base font-semibold text-white flex-1">
                      {answer}
                    </span>
                  </div>

                  {/* Ícono de estado */}
                  {answered && (
                    <div className="absolute top-4 right-4 text-2xl">
                      {isCorrect ? '✅' : isSelected && !isCorrect ? '❌' : ''}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};