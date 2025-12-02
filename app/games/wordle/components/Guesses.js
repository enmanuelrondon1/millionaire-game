// app/games/wordle/components/Guesses.js
'use client';

export const Guesses = ({ guesses, currentGuess, word, getLetterColor, maxGuesses }) => {
  const getColorClass = (color) => {
    switch (color) {
      case 'correct':
        return {
          bg: 'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.1) 100%)',
          border: 'rgba(16,185,129,0.6)',
          text: 'var(--color-success)',
          glow: '0 0 15px rgba(16,185,129,0.4)'
        };
      case 'present':
        return {
          bg: 'linear-gradient(135deg, rgba(251,191,36,0.3) 0%, rgba(251,191,36,0.1) 100%)',
          border: 'rgba(251,191,36,0.6)',
          text: 'var(--color-accent)',
          glow: '0 0 15px rgba(251,191,36,0.4)'
        };
      default:
        return {
          bg: 'linear-gradient(135deg, rgba(107,114,128,0.2) 0%, rgba(107,114,128,0.1) 100%)',
          border: 'rgba(107,114,128,0.3)',
          text: 'rgba(241,245,249,0.5)',
          glow: 'none'
        };
    }
  };

  const renderGuessRow = (guess, index) => {
    return (
      <div
        key={index}
        className="flex gap-2 sm:gap-3 justify-center mb-4 animate-in fade-in"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {guess.split('').map((letter, letterIndex) => {
          const color = getLetterColor(letter, letterIndex, guess);
          const colorClass = getColorClass(color);

          return (
            <div
              key={letterIndex}
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-lg font-black text-xl sm:text-2xl border-2 transition-all duration-300 transform"
              style={{
                background: colorClass.bg,
                borderColor: colorClass.border,
                color: colorClass.text,
                boxShadow: colorClass.glow,
                animationDelay: `${letterIndex * 50}ms`
              }}
            >
              {letter}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* Intentos anteriores */}
      {guesses.map((guess, index) => renderGuessRow(guess, index))}

      {/* Guess actual */}
      {guesses.length < maxGuesses && (
        <div className="flex gap-2 sm:gap-3 justify-center mb-4">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-lg font-black text-xl sm:text-2xl border-2 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(109,40,217,0.2) 0%, rgba(6,182,212,0.1) 100%)',
                borderColor: index < currentGuess.length ? 'var(--color-secondary)' : 'rgba(109,40,217,0.3)',
                color: 'var(--color-text-light)',
                boxShadow: index < currentGuess.length ? '0 0 15px rgba(6,182,212,0.4)' : 'none',
                transform: index < currentGuess.length ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {currentGuess[index] || ''}
            </div>
          ))}
        </div>
      )}

      {/* Espacios vacíos para intentos restantes */}
      {guesses.length < maxGuesses && guesses.length > 0 && (
        <>
          {[...Array(maxGuesses - guesses.length - 1)].map((_, rowIndex) => (
            <div key={`empty-${rowIndex}`} className="flex gap-2 sm:gap-3 justify-center mb-4">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg border-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(109,40,217,0.1) 0%, rgba(6,182,212,0.05) 100%)',
                    borderColor: 'rgba(109,40,217,0.2)'
                  }}
                />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};