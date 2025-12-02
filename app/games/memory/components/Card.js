// app/games/memory/components/Card.js
'use client';

export const Card = ({ card, isFlipped, isMatched, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isMatched}
      className={`
        relative w-full h-24 sm:h-28 rounded-xl font-bold text-4xl sm:text-5xl
        transition-all duration-300 transform
        ${isFlipped || isMatched ? 'scale-100' : 'hover:scale-110'}
        ${isMatched ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Dorso de la tarjeta */}
      <div
        className={`
          absolute inset-0 rounded-xl flex items-center justify-center font-black text-2xl
          transition-all duration-500
          ${isFlipped || isMatched ? 'opacity-0' : 'opacity-100'}
        `}
        style={{
          background: isMatched
            ? 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.1) 100%)'
            : 'linear-gradient(135deg, rgba(109,40,217,0.3) 0%, rgba(6,182,212,0.2) 100%)',
          border: `2px solid ${isMatched ? 'rgba(16,185,129,0.5)' : 'rgba(109,40,217,0.5)'}`,
          boxShadow: `0 0 15px ${isMatched ? 'rgba(16,185,129,0.3)' : 'rgba(109,40,217,0.3)'}`
        }}
      >
        ?
      </div>

      {/* Frente de la tarjeta */}
      <div
        className={`
          absolute inset-0 rounded-xl flex items-center justify-center
          transition-all duration-500
          ${isFlipped || isMatched ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.3) 0%, rgba(251,191,36,0.2) 100%)',
          border: '2px solid rgba(6,182,212,0.5)',
          boxShadow: '0 0 20px rgba(6,182,212,0.4)'
        }}
      >
        {card.emoji}
      </div>

      {/* Efecto de match */}
      {isMatched && (
        <div className="absolute inset-0 rounded-xl flex items-center justify-center text-3xl animate-bounce">
          ✨
        </div>
      )}
    </button>
  );
};