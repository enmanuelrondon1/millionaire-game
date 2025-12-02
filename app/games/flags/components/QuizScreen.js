// app/games/flags/components/QuizScreen.js
'use client';

import { useState } from 'react';
import { getFlagUrl } from '../services/flagsService';

export default function QuizScreen({ flag, options, onAnswer, onUseHint, hint, hintsUsed }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (option) => {
    if (answered) return;
    
    setSelectedAnswer(option);
    setAnswered(true);
    onAnswer(option);
    
    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswered(false);
    }, 1000);
  };

  const getButtonClass = (option) => {
    if (!answered) return 'option-btn';
    
    if (option.code === flag.code) {
      return 'option-btn correct';
    }
    
    if (option.code === selectedAnswer?.code) {
      return 'option-btn incorrect';
    }
    
    return 'option-btn disabled';
  };

  return (
    <div className="quiz-screen">
      <div className="flag-container">
        <img
          src={getFlagUrl(flag.code)}
          alt="Bandera"
          className="flag-image"
        />
      </div>

      {hint && (
        <div className="hint-box">
          <div className="hint-item">
            <span className="hint-label">🌍 Continente:</span>
            <span className="hint-value">{hint.continent}</span>
          </div>
          <div className="hint-item">
            <span className="hint-label">🏛️ Capital:</span>
            <span className="hint-value">{hint.capital}</span>
          </div>
        </div>
      )}

      <div className="options-grid">
        {options.map((option) => (
          <button
            key={option.code}
            className={getButtonClass(option)}
            onClick={() => handleSelect(option)}
            disabled={answered}
          >
            {option.name}
          </button>
        ))}
      </div>

      {!hint && hintsUsed < 3 && (
        <button className="hint-btn" onClick={onUseHint}>
          💡 Usar Pista ({3 - hintsUsed} disponibles)
        </button>
      )}

      <style jsx>{`
        .quiz-screen {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .flag-container {
          background: rgba(255, 255, 255, 0.05);
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 250px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .flag-image {
          max-width: 100%;
          max-height: 220px;
          object-fit: contain;
          border-radius: 10px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }

        .hint-box {
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2));
          border: 2px solid var(--color-accent);
          border-radius: 15px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          animation: slideIn 0.3s ease;
        }

        .hint-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .hint-label {
          font-weight: 600;
          color: var(--color-accent);
        }

        .hint-value {
          font-weight: 700;
          color: var(--color-text-light);
          font-size: 1.125rem;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .option-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          padding: 1.25rem;
          color: var(--color-text-light);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .option-btn:hover:not(.disabled) {
          transform: scale(1.05);
          border-color: var(--color-primary-light);
          background: rgba(109, 40, 217, 0.2);
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

        .hint-btn {
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2));
          border: 2px solid var(--color-accent);
          color: var(--color-accent);
          border-radius: 15px;
          padding: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hint-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(251, 191, 36, 0.3);
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

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .options-grid {
            grid-template-columns: 1fr;
          }

          .flag-container {
            min-height: 180px;
            padding: 1.5rem;
          }

          .flag-image {
            max-height: 160px;
          }

          .hint-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
}