// app/games/wordle/components/Keyboard.js
'use client';

import { useState } from 'react';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ñ']
];

export const Keyboard = ({ 
  currentGuess, 
  guesses, 
  word,
  onAddLetter, 
  onRemoveLetter, 
  onSubmitGuess,
  gameOver 
}) => {
  const [hoveredKey, setHoveredKey] = useState(null);

  const getLetterStatus = (letter) => {
    for (let guess of guesses) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === letter) {
          if (guess[i] === word[i]) {
            return 'correct';
          } else if (word.includes(letter)) {
            return 'present';
          } else {
            return 'absent';
          }
        }
      }
    }
    return 'unused';
  };

  const getKeyColor = (letter, status) => {
    switch (status) {
      case 'correct':
        return {
          bg: 'rgba(16,185,129,0.3)',
          border: 'rgba(16,185,129,0.6)',
          text: 'var(--color-success)',
          glow: '0 0 10px rgba(16,185,129,0.4)'
        };
      case 'present':
        return {
          bg: 'rgba(251,191,36,0.3)',
          border: 'rgba(251,191,36,0.6)',
          text: 'var(--color-accent)',
          glow: '0 0 10px rgba(251,191,36,0.4)'
        };
      case 'absent':
        return {
          bg: 'rgba(107,114,128,0.2)',
          border: 'rgba(107,114,128,0.3)',
          text: 'rgba(241,245,249,0.4)',
          glow: 'none'
        };
      default:
        return {
          bg: 'rgba(109,40,217,0.2)',
          border: 'rgba(109,40,217,0.4)',
          text: 'var(--color-text-light)',
          glow: 'none'
        };
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-1 sm:gap-2 justify-center mb-2 ${
            rowIndex === 1 ? 'pl-4 sm:pl-6' : ''
          } ${rowIndex === 2 ? 'pl-8 sm:pl-12' : ''}`}
        >
          {/* Botón Backspace en última fila */}
          {rowIndex === 2 && (
            <button
              onClick={onRemoveLetter}
              disabled={gameOver || currentGuess.length === 0}
              className="px-2 sm:px-3 py-2 sm:py-3 rounded font-bold text-xs sm:text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background: 'rgba(239,68,68,0.2)',
                border: '2px solid rgba(239,68,68,0.4)',
                color: 'var(--color-error)'
              }}
            >
              ⌫
            </button>
          )}

          {/* Letras */}
          {row.map((letter) => {
            const status = getLetterStatus(letter);
            const colors = getKeyColor(letter, status);
            const isDisabled = status === 'absent' || gameOver;

            return (
              <button
                key={letter}
                onClick={() => onAddLetter(letter)}
                onMouseEnter={() => setHoveredKey(letter)}
                onMouseLeave={() => setHoveredKey(null)}
                disabled={isDisabled}
                className={`
                  px-2 sm:px-3 py-2 sm:py-3 rounded font-bold text-xs sm:text-sm
                  transition-all duration-300 border-2
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'}
                  ${hoveredKey === letter && !isDisabled ? 'scale-110' : ''}
                `}
                style={{
                  background: colors.bg,
                  borderColor: colors.border,
                  color: colors.text,
                  boxShadow: hoveredKey === letter && !isDisabled ? colors.glow : 'none'
                }}
              >
                {letter}
              </button>
            );
          })}

          {/* Botón Enter en última fila */}
          {rowIndex === 2 && (
            <button
              onClick={onSubmitGuess}
              disabled={gameOver || currentGuess.length !== 5}
              className="px-2 sm:px-3 py-2 sm:py-3 rounded font-bold text-xs sm:text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background: currentGuess.length === 5 
                  ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                  : 'rgba(109,40,217,0.2)',
                border: '2px solid var(--color-primary)',
                color: 'white'
              }}
            >
              ⏎
            </button>
          )}
        </div>
      ))}
    </div>
  );
};