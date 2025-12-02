// app/games/trivia-quick/components/StreakCounter.js
'use client';

export const StreakCounter = ({ streak, score, currentQuestion, totalQuestions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Puntuación */}
      <div
        className="rounded-2xl p-6 backdrop-blur-md border text-center animate-in fade-in"
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 100%)',
          borderColor: 'rgba(251,191,36,0.3)'
        }}
      >
        <p className="text-sm font-semibold text-[var(--color-accent)] uppercase mb-2">
          Puntuación
        </p>
        <p className="text-4xl font-black text-white">
          {score}
        </p>
      </div>

      {/* Racha */}
      <div
        className="rounded-2xl p-6 backdrop-blur-md border text-center animate-in fade-in delay-100"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)',
          borderColor: 'rgba(16,185,129,0.3)'
        }}
      >
        <p className="text-sm font-semibold text-[var(--color-success)] uppercase mb-2">
          🔥 Racha
        </p>
        <p className="text-4xl font-black text-white">
          {streak}
        </p>
      </div>

      {/* Progreso */}
      <div
        className="rounded-2xl p-6 backdrop-blur-md border text-center animate-in fade-in delay-200"
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)',
          borderColor: 'rgba(59,130,246,0.3)'
        }}
      >
        <p className="text-sm font-semibold text-[var(--color-info)] uppercase mb-2">
          Progreso
        </p>
        <p className="text-4xl font-black text-white">
          {currentQuestion}/{totalQuestions}
        </p>
      </div>
    </div>
  );
};