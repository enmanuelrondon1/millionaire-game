//app/games/millionaire/components/lifelines/PublicVotes.js
'use client';

export default function PublicVotes({ votes, availableAnswers }) {
  if (!votes || !availableAnswers) return null;

  return (
    <div
      className="mb-4 sm:mb-6 rounded-xl p-4 sm:p-5 border backdrop-blur-md relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{
        background: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 100%)',
        borderColor: 'rgba(251,191,36,0.4)'
      }}
    >
      {/* Efecto de brillo */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at center, rgba(251,191,36,0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <p className="font-bold text-white text-sm sm:text-base">
            Votación del Público
          </p>
        </div>

        {/* Votos Grid */}
        <div className="grid grid-cols-4 gap-3">
          {availableAnswers.map((idx) => {
            const percentage = votes[idx] || 0;
            const isHighest = Math.max(...availableAnswers.map(i => votes[i] || 0)) === percentage;

            return (
              <div key={idx} className="text-center">
                {/* Letra */}
                <div
                  className={`text-sm sm:text-base font-black rounded-lg p-2 mb-2 transition-all ${
                    isHighest ? 'scale-110' : ''
                  }`}
                  style={{
                    background: isHighest
                      ? 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)'
                      : 'linear-gradient(135deg, rgba(251,191,36,0.3) 0%, rgba(251,191,36,0.1) 100%)',
                    color: isHighest ? '#1F2937' : '#FBBF24',
                    boxShadow: isHighest ? '0 0 15px rgba(251,191,36,0.6)' : 'none',
                    border: `2px solid ${isHighest ? '#FBBF24' : 'rgba(251,191,36,0.3)'}`
                  }}
                >
                  {String.fromCharCode(65 + idx)}
                </div>

                {/* Barra de progreso */}
                <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden mb-2 border border-[rgba(251,191,36,0.2)]">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-warning)] transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      boxShadow: percentage > 0 ? '0 0 10px rgba(251,191,36,0.6)' : 'none'
                    }}
                  />
                </div>

                {/* Porcentaje */}
                <p className="text-xs sm:text-sm font-bold text-white">
                  {percentage}%
                </p>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-3 pt-3 border-t border-[rgba(251,191,36,0.2)]">
          <p className="text-xs text-[rgba(241,245,249,0.7)]">
            <span className="text-[var(--color-accent)] font-semibold">💡 Tip:</span> El público suele acertar en 80% de los casos
          </p>
        </div>
      </div>
    </div>
  );
}