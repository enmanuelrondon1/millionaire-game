//app/games/millionaire/components/GameOverScreen.js
'use client';

import Link from 'next/link';

export default function GameOverScreen({ userMoney, safeAmount, timeUp, onReset }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[var(--color-dark-bg)] via-[#1E3A8A] to-[var(--color-dark-bg)] p-4 relative overflow-hidden">
      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-radial from-[var(--color-error)] opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-gradient-radial from-[var(--color-primary)] opacity-15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-2xl w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Icono de derrota */}
        <div className="text-center mb-8">
          <div className="text-9xl mb-4 animate-bounce">
            {timeUp ? '⏰' : '❌'}
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-4 text-white">
            {timeUp ? '¡Tiempo!' : '¡Juego Terminado!'}
          </h1>
          <p className="text-xl text-[rgba(241,245,249,0.8)] mb-8">
            {timeUp 
              ? 'Se acabó el tiempo para esta pregunta' 
              : 'Respuesta incorrecta. Mejor suerte la próxima vez.'}
          </p>
        </div>

        {/* Tarjeta de resultados */}
        <div
          className="rounded-2xl p-8 sm:p-10 backdrop-blur-md border mb-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.05) 100%)',
            borderColor: 'rgba(239,68,68,0.3)'
          }}
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-error)]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10">
            {/* Premio ganado */}
            <div className="text-center mb-8 pb-8 border-b border-[rgba(241,245,249,0.1)]">
              <p className="text-sm font-semibold text-[rgba(241,245,249,0.7)] mb-2">
                DINERO ACUMULADO
              </p>
              <p className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-[var(--color-error)] to-[var(--color-warning)] bg-clip-text text-transparent">
                {formatCurrency(userMoney)}
              </p>
            </div>

            {/* Información de seguridad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)]">
                <p className="text-xs font-semibold text-[var(--color-success)] mb-2 uppercase">
                  Mínimo Garantizado
                </p>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(safeAmount)}
                </p>
                <p className="text-xs text-[rgba(241,245,249,0.6)] mt-2">
                  🔒 Dinero asegurado
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)]">
                <p className="text-xs font-semibold text-[var(--color-error)] mb-2 uppercase">
                  Perdido en Esta Pregunta
                </p>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(userMoney - safeAmount)}
                </p>
                <p className="text-xs text-[rgba(241,245,249,0.6)] mt-2">
                  😢 No ganado
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Reintentar */}
          <button
            onClick={onReset}
            className="group relative px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden text-white"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
              boxShadow: '0 10px 30px rgba(109,40,217,0.4)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>🔄 Reintentar</span>
            </div>
          </button>

          {/* Ir a Home */}
          <Link href="/">
            <button
              className="w-full group relative px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden text-white border-2"
              style={{
                background: 'rgba(6,182,212,0.1)',
                borderColor: 'var(--color-secondary)',
                color: 'var(--color-secondary)'
              }}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span>🏠 Ir a Home</span>
              </div>
            </button>
          </Link>
        </div>

        {/* Mensajes motivadores */}
        <div className="text-center">
          <p className="text-sm text-[rgba(241,245,249,0.7)]">
            💪 ¡No te rindas! Cada intento te acerca más al millón.
          </p>
        </div>
      </div>

      {/* Estilos */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(-100px) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(300px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}