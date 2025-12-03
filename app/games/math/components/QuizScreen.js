// app/games/math/components/QuizScreen.js
'use client';

import { useState, useEffect } from 'react';

export default function QuizScreen({ question, onAnswer, streak }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (question) {
      // Generar opciones
      const correctAnswer = question.answer;
      const opts = [correctAnswer];
      const usedNumbers = new Set([correctAnswer]);
      
      while (opts.length < 4) {
        const offset = Math.floor(Math.random() * 20) - 10;
        let option = correctAnswer + offset;
        
        if (option >= 0 && !usedNumbers.has(option)) {
          opts.push(option);
          usedNumbers.add(option);
        }
      }
      
      setOptions(opts.sort(() => Math.random() - 0.5));
    }
  }, [question]);

  const handleSelect = (option) => {
    if (answered) return;
    
    setSelectedAnswer(option);
    setAnswered(true);
    onAnswer(option);
    
    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswered(false);
    }, 500);
  };

  const getButtonClass = (option) => {
    if (!answered) return 'option-btn';
    
    if (option === question.answer) {
      return 'option-btn correct';
    }
    
    if (option === selectedAnswer) {
      return 'option-btn incorrect';
    }
    
    return 'option-btn disabled';
  };

  if (!question) return null;

  return (
    <div className="quiz-screen">
      {streak >= 3 && (
        <div className="streak-badge">
          🔥 Racha: {streak}
        </div>
      )}

      <div className="question-container">
        <div className="question-display">
          {question.question}
        </div>
        <div className="equals">=</div>
        <div className="answer-placeholder">?</div>
      </div>

      <div className="options-grid">
        {options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(option)}
            onClick={() => handleSelect(option)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>

      <style jsx>{`
        .quiz-screen {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          position: relative;
        }

        .streak-badge {
          position: absolute;
          top: -3rem;
          right: 0;
          background: var(--gradient-error);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 800;
          font-size: 1.125rem;
          animation: pulse 1s ease-in-out infinite;
          box-shadow: 0 5px 20px rgba(239, 68, 68, 0.4);
        }

        .question-container {
          background: rgba(255, 255, 255, 0.05);
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          padding: 3rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          min-height: 200px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .question-display {
          font-size: 4rem;
          font-weight: 800;
          color: var(--color-text-light);
          background: var(--gradient-epic);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .equals {
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-accent);
        }

        .answer-placeholder {
          font-size: 4rem;
          font-weight: 800;
          color: var(--color-secondary);
          animation: pulse 2s ease-in-out infinite;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .option-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 3px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 1.75rem;
          color: var(--color-text-light);
          font-weight: 800;
          font-size: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .option-btn:hover:not(.disabled) {
          transform: scale(1.05);
          border-color: var(--color-primary-light);
          background: rgba(109, 40, 217, 0.2);
          box-shadow: 0 10px 30px rgba(109, 40, 217, 0.3);
        }

        .option-btn.correct {
          background: var(--gradient-success);
          border-color: var(--color-success);
          animation: correctAnswer 0.5s ease;
        }

        .option-btn.incorrect {
          background: var(--gradient-error);
          border-color: var(--color-error);
          animation: shake 0.5s ease;
        }

        .option-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @keyframes correctAnswer {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        @media (max-width: 640px) {
          .streak-badge {
            top: -2.5rem;
            font-size: 1rem;
            padding: 0.375rem 0.875rem;
          }

          .question-container {
            padding: 2rem 1.5rem;
            min-height: 150px;
            flex-direction: column;
            gap: 1rem;
          }

          .question-display {
            font-size: 2.5rem;
          }

          .equals {
            font-size: 2rem;
          }

          .answer-placeholder {
            font-size: 2.5rem;
          }

          .options-grid {
            grid-template-columns: 1fr;
          }

          .option-btn {
            padding: 1.25rem;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}