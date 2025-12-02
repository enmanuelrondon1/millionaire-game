//app/games/millionaire/components/WinScreen.js
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function WinScreen({ onReset }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // Generar confetti
    const generateConfetti = () => {
      const items = [];
      for (let i = 0; i < 50; i++) {
        items.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 0.5,
          duration: 2 + Math.random() * 1,
          emoji: ["🎉", "🎊", "🏆", "💰", "⭐", "🌟"][
            Math.floor(Math.random() * 6)
          ],
        });
      }
      setConfetti(items);
    };
    generateConfetti();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[var(--color-dark-bg)] via-[#1E3A8A] to-[var(--color-dark-bg)] p-4 relative overflow-hidden">
      {/* Confetti */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {confetti.map((item) => (
          <div
            key={item.id}
            className="absolute text-3xl animate-fall"
            style={{
              left: `${item.left}%`,
              top: "-50px",
              animation: `fall ${item.duration}s linear ${item.delay}s infinite`,
              opacity: 0.8,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Partículas de luz */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-radial from-[var(--color-accent)] opacity-20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-radial from-[var(--color-secondary)] opacity-15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-[var(--color-primary)] opacity-10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-2xl w-full relative z-10 animate-in fade-in scale-in duration-700">
        {/* Icono de victoria */}
        <div className="text-center mb-8">
          <div
            className="text-9xl mb-4 animate-bounce"
            style={{ animationDuration: "0.6s" }}
          >
            🏆
          </div>
          <h1 className="text-6xl sm:text-7xl font-black mb-4 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent leading-tight">
            ¡¡GANASTE!!
          </h1>
          <p className="text-2xl text-[rgba(241,245,249,0.9)] font-bold">
            🎉 ¡Eres Millonario! 🎉
          </p>
        </div>

        {/* Tarjeta de premio */}
        <div
          className="rounded-2xl p-8 sm:p-12 backdrop-blur-md border mb-8 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(109,40,217,0.2) 0%, rgba(6,182,212,0.15) 50%, rgba(251,191,36,0.1) 100%)",
            borderColor: "rgba(251,191,36,0.5)",
          }}
        >
          {/* Efecto de brillo animado */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-pulse"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            }}
          />

          <div className="relative z-10">
            {/* Premio */}
            <div className="text-center">
              <p className="text-sm font-semibold text-[var(--color-accent)] mb-4 uppercase tracking-widest">
                🎯 Premio Final
              </p>
              <div className="mb-6">
                <p
                  className="text-7xl sm:text-8xl font-black mb-2"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-accent) 0%, var(--color-secondary) 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 40px rgba(251,191,36,0.5)",
                  }}
                >
                  €1,000,000
                </p>
                <p className="text-xl text-[rgba(241,245,249,0.8)]">
                  ¡Un millón de euros!
                </p>
              </div>

              {/* Línea decorativa */}
              <div className="h-1 w-32 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-secondary)] to-[var(--color-primary)] mx-auto rounded-full mb-6" />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-3 rounded-lg bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)]">
                  <p className="text-xs text-[var(--color-success)] font-semibold mb-1">
                    PREGUNTAS RESPONDIDAS
                  </p>
                  <p className="text-2xl font-bold text-white">9/9</p>
                </div>
                <div className="p-3 rounded-lg bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.3)]">
                  <p className="text-xs text-[var(--color-accent)] font-semibold mb-1">
                    PRECISIÓN
                  </p>
                  <p className="text-2xl font-bold text-white">100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Jugar de nuevo */}
          <button
            onClick={onReset}
            className="group relative px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden text-white"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
              boxShadow: "0 15px 40px rgba(109,40,217,0.5)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-pulse" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>🔄 Jugar de Nuevo</span>
            </div>
          </button>

          {/* Ir a Home */}
          <Link href="/">
            <button
              className="w-full group relative px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden border-2"
              style={{
                background: "rgba(251,191,36,0.1)",
                borderColor: "var(--color-accent)",
                color: "var(--color-accent)",
              }}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span>🏠 Ir a Home</span>
              </div>
            </button>
          </Link>
        </div>

        {/* Celebración */}
        <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          <p className="text-lg font-bold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            🌟 ¡FELICIDADES! 🌟
          </p>
          <p className="text-sm text-[rgba(241,245,249,0.7)]">
            Has demostrado ser un verdadero campeón. ¡Comparte tu victoria con
            el mundo!
          </p>
        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(360deg);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(251, 191, 36, 0.8));
          }
        }
      `}</style>
    </div>
  );
}
