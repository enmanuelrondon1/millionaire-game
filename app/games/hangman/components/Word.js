// app/games/hangman/components/Word.js
"use client";

export const Word = ({ wordToGuess, guessedLetters }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {wordToGuess.split("").map((letter, index) => (
        <span
          key={index}
          className={`text-3xl sm:text-4xl font-black h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center rounded-xl transition-all duration-300 transform ${
            guessedLetters.includes(letter) ? "scale-100" : "scale-95"
          }`}
          style={{
            backgroundColor: guessedLetters.includes(letter)
              ? "linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.1) 100%)"
              : "linear-gradient(135deg, rgba(109,40,217,0.2) 0%, rgba(6,182,212,0.1) 100%)",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: guessedLetters.includes(letter)
              ? "rgba(16,185,129,0.5)"
              : "rgba(109,40,217,0.3)",
            color: guessedLetters.includes(letter)
              ? "var(--color-success)"
              : "var(--color-text-light)",
            boxShadow: guessedLetters.includes(letter)
              ? "0 0 20px rgba(16,185,129,0.3)"
              : "none",
          }}
        >
          {guessedLetters.includes(letter) ? letter.toUpperCase() : "_"}
        </span>
      ))}
    </div>
  );
};
