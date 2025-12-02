//app/games/millionaire/components/lifelines/FriendAdvice.js
'use client';

export default function FriendAdvice({ advice }) {
  return (
    <div
      className="mb-4 sm:mb-6 rounded-xl p-4 sm:p-5 border backdrop-blur-md relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{
        background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0.05) 100%)',
        borderColor: 'rgba(168,85,247,0.4)'
      }}
    >
      {/* Efecto de brillo */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at center, rgba(168,85,247,0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">💬</span>
          <p className="font-bold text-white text-sm sm:text-base">
            Consejo de tu Amigo
          </p>
        </div>

        {/* Respuesta sugerida */}
        <div className="flex items-center justify-between bg-[rgba(168,85,247,0.1)] rounded-lg p-3 sm:p-4 border border-[rgba(168,85,247,0.3)]">
          <p className="text-white font-semibold">
            Creo que es la respuesta:
          </p>
          <div
            className="text-3xl sm:text-4xl font-black rounded-lg w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-white transition-transform hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
              boxShadow: '0 0 20px rgba(168,85,247,0.6)'
            }}
          >
            {String.fromCharCode(65 + advice)}
          </div>
        </div>

        {/* Confianza */}
        <div className="mt-3 pt-3 border-t border-[rgba(168,85,247,0.2)]">
          <p className="text-xs sm:text-sm text-[rgba(241,245,249,0.7)]">
            <span className="text-[rgba(168,85,247,0.9)] font-semibold">📊 Confianza:</span> 75%
          </p>
        </div>
      </div>
    </div>
  );
}