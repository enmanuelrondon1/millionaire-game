// app/games/trivia-quick/components/GameOverScreen.js
'use client';

import Link from 'next/link';

export const GameOverScreen = ({ score, streak, totalQuestions, onReset }) => {
  const formatScore = (points) => {
    return points.toLocaleString('es-ES');
  };

  const getPerformanceMessage = () => {
    if (score >= totalQuestions * 300) return '🌟 ¡EXCELENTE! ¡Eres imparable!';
    if (score >= totalQuestions * 200) return '⭐ ¡MUY BIEN! ¡Sigue así!';
    if (score >= totalQuestions * 100) return '👍 ¡BIEN! Puedes mejorar';
    return '💪 ¡SIGUE INTENTANDO!';
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[var(--color-dark-bg)] via-[#1E3A8A] to-[var(--color-dark-bg)] p-4 relative overflow-hidden">
      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-radial from-[var(--color-primary)] opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-gradient-radial from-[var(--color-secondary)] opacity-15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-2xl w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Ícono de Fin */}
        <div className="text-center mb-8">
          <div className="text-9xl mb-4 animate-bounce">
            🏁
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-4 text-white">
            ¡Juego Terminado!
          </h1>
          <p className="text-xl text-[rgba(241,245,249,0.8)] mb-8">
            {getPerformanceMessage()}
          </p>
        </div>

        {/* Tarjeta de Resultados */}
        <div
          className="rounded-2xl p-8 sm:p-10 backdrop-blur-md border mb-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 100%)',
            borderColor: 'rgba(251,191,36,0.3)'
          }}
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10">
            {/* Puntuación Principal */}
            <div className="text-center mb-8 pb-8 border-b border-[rgba(241,245,249,0.1)]">
              <p className="text-sm font-semibold text-[rgba(241,245,249,0.7)] mb-2">
                PUNTUACIÓN FINAL
              </p>
              <p className="text-6xl sm:text-7xl font-black bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                {formatScore(score)}
              </p>
            </div>

            {/* Grid de Estadísticas */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-lg bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)]">
                <p className="text-xs font-semibold text-[var(--color-success)] mb-2 uppercase">
                  🔥 Racha Máxima
                </p>
                <p className="text-3xl font-bold text-white">
                  {streak}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.3)]">
                <p className="text-xs font-semibold text-[var(--color-accent)] mb-2 uppercase">
                  ✅ Preguntas
                </p>
                <p className="text-3xl font-bold text-white">
                  {totalQuestions}
                </p>
              </div>
            </div>

            {/* Promedio por Pregunta */}
            <div className="p-4 rounded-lg bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)]">
              <p className="text-xs font-semibold text-[var(--color-info)] mb-2 uppercase">
                📊 Promedio por Pregunta
              </p>
              <p className="text-3xl font-bold text-white">
                {formatScore(Math.round(score / totalQuestions))} pts
              </p>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
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
              <span>🔄 Jugar de Nuevo</span>
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

        {/* Motivación */}
        <div className="text-center">
          <p className="text-sm text-[rgba(241,245,249,0.7)]">
            💪 ¡Vuelve a intentar para mejorar tu puntuación!
          </p>
        </div>
      </div>
    </div>
  );
};