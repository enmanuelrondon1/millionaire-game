// app/games/memory/components/GameStats.js
'use client';

export const GameStats = ({ attempts, matched, totalPairs, timeElapsed }) => {
  const accuracy = totalPairs > 0 ? Math.round((matched / totalPairs) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {/* Intentos */}
      <div
        className="rounded-xl p-4 backdrop-blur-md border text-center animate-in fade-in"
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)',
          borderColor: 'rgba(59,130,246,0.3)'
        }}
      >
        <p className="text-xs font-semibold text-[var(--color-info)] uppercase mb-2">
          Intentos
        </p>
        <p className="text-3xl font-black text-white">
          {attempts}
        </p>
      </div>

      {/* Pares Encontrados */}
      <div
        className="rounded-xl p-4 backdrop-blur-md border text-center animate-in fade-in delay-100"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)',
          borderColor: 'rgba(16,185,129,0.3)'
        }}
      >
        <p className="text-xs font-semibold text-[var(--color-success)] uppercase mb-2">
          Pares
        </p>
        <p className="text-3xl font-black text-white">
          {matched}/{totalPairs}
        </p>
      </div>

      {/* Precisión */}
      <div
        className="rounded-xl p-4 backdrop-blur-md border text-center animate-in fade-in delay-200"
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 100%)',
          borderColor: 'rgba(251,191,36,0.3)'
        }}
      >
        <p className="text-xs font-semibold text-[var(--color-accent)] uppercase mb-2">
          Precisión
        </p>
        <p className="text-3xl font-black text-white">
          {accuracy}%
        </p>
      </div>

      {/* Tiempo */}
      <div
        className="rounded-xl p-4 backdrop-blur-md border text-center animate-in fade-in delay-300"
        style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0.05) 100%)',
          borderColor: 'rgba(168,85,247,0.3)'
        }}
      >
        <p className="text-xs font-semibold text-[var(--color-primary)] uppercase mb-2">
          Tiempo
        </p>
        <p className="text-3xl font-black text-white">
          {timeElapsed}s
        </p>
      </div>
    </div>
  );
};