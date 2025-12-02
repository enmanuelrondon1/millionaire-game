// app/games/hangman/components/Keyboard.js
'use client';

import { useState } from 'react';

const KEYS = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z'
];

export const Keyboard = ({
  activeLetters,
  inactiveLetters,
  onSelectLetter,
  disabled,
}) => {
  const [hoveredKey, setHoveredKey] = useState(null);

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
      {KEYS.map(key => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        const isUsed = isActive || isInactive;

        let buttonColor = 'var(--color-primary)';
        let backgroundColor = 'rgba(109,40,217,0.2)';

        if (isActive) {
          buttonColor = 'var(--color-success)';
          backgroundColor = 'rgba(16,185,129,0.2)';
        } else if (isInactive) {
          buttonColor = 'var(--color-error)';
          backgroundColor = 'rgba(239,68,68,0.2)';
        }

        const borderStyle = `2px solid ${buttonColor}`;
        const boxShadowStyle = hoveredKey === key && !isUsed
          ? `0 0 15px ${buttonColor}60`
          : isActive
          ? `0 0 10px rgba(16,185,129,0.4)`
          : isInactive
          ? `0 0 10px rgba(239,68,68,0.4)`
          : 'none';

        const backgroundStyle = isUsed
          ? backgroundColor
          : hoveredKey === key
          ? `linear-gradient(135deg, ${buttonColor}40 0%, ${buttonColor}20 100%)`
          : backgroundColor;

        return (
          <button
            key={key}
            onClick={() => onSelectLetter(key)}
            disabled={isUsed || disabled}
            onMouseEnter={() => setHoveredKey(key)}
            onMouseLeave={() => setHoveredKey(null)}
            className={`
              relative px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-bold text-sm sm:text-base
              transition-all duration-300 transform
              ${isUsed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'}
              ${hoveredKey === key && !isUsed ? 'scale-110' : ''}
            `}
            style={{
              backgroundColor: backgroundStyle,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: buttonColor,
              color: buttonColor,
              boxShadow: boxShadowStyle
            }}
          >
            {key.toUpperCase()}

            {/* Indicadores visuales */}
            {isActive && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--color-success)] rounded-full text-white text-xs flex items-center justify-center animate-pulse">
                ✓
              </span>
            )}
            {isInactive && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--color-error)] rounded-full text-white text-xs flex items-center justify-center animate-pulse">
                ✗
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};