// app/page.js
"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [hoveredGame, setHoveredGame] = useState(null);

  const games = [
    {
      id: "millionaire",
      name: "¿Quién Quiere Ser Millonario?",
      icon: "💰",
      description:
        "Responde preguntas de trivia y acumula premios. ¿Podrás llegar al millón?",
      href: "/games/millionaire",
    },
    {
      id: "hangman",
      name: "Ahorcado",
      icon: "🎯",
      description:
        "Adivina la palabra oculta antes de que se acabe el tiempo. Un clásico de siempre.",
      href: "/games/hangman",
    },
    {
      id: "memory",
      name: "Memory",
      icon: "🧠",
      description:
        "Encuentra todos los pares de tarjetas. Pon a prueba tu memoria y concentración.",
      href: "/games/memory",
    },
    {
      id: "trivia-quick",
      name: "Trivia Rápida",
      icon: "⚡",
      description: "Responde rápido y acumula racha. 10 segundos por pregunta.",
      href: "/games/trivia-quick",
    },
    {
      id: "wordle",
      name: "Wordle",
      icon: "🔤",
      description: "Adivina la palabra en 6 intentos. ¡Un desafío diario!",
      href: "/games/wordle",
    },
    {
      id: "simon",
      name: "Simon Dice",
      icon: "🎵",
      description:
        "Memoriza y repite la secuencia de colores. ¿Hasta dónde llegarás?",
      href: "/games/simon",
    },
    {
      id: "flags",
      name: "Quiz de Banderas",
      icon: "🌍",
      description:
        "Identifica banderas de todo el mundo. Dos modos: Normal y Contrarreloj.",
      href: "/games/flags",
      isNew: true,
    },
  ];

  const stats = [
    { label: "Juegos Jugados", value: "0" },
    { label: "Victorias", value: "0" },
    { label: "Tasa de Éxito", value: "0%" },
    { label: "Puntuación Total", value: "0" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-[var(--color-text-light)] overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full px-8 py-6 bg-[rgba(15,23,42,0.95)] backdrop-blur-md z-50 border-b border-[rgba(6,182,212,0.2)]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent flex items-center gap-2">
            🎮 Millionaire
          </div>
          <ul className="hidden md:flex gap-8 list-none">
            <li>
              <a
                href="#games"
                className="text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors font-medium"
              >
                Juegos
              </a>
            </li>
            <li>
              <a
                href="#stats"
                className="text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors font-medium"
              >
                Estadísticas
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Gradiente de fondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-dark-bg)] to-[var(--color-dark-bg)] opacity-20 pointer-events-none" />

        {/* Elementos flotantes decorativos */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-radial from-[var(--color-primary)] opacity-20 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div
          className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-radial from-[var(--color-secondary)] opacity-15 rounded-full blur-3xl animate-pulse pointer-events-none"
          style={{ animationDelay: "2s" }}
        />

        {/* Contenido Hero */}
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent leading-tight animate-in fade-in slide-in-from-top-8 duration-700">
            ¡Bienvenido a Millionaire!
          </h1>
          <p className="text-xl md:text-2xl text-[rgba(241,245,249,0.8)] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Desafía tu mente con juegos clásicos que te mantendrán entretenido.
            ¿Listo para ganar?
          </p>
          <a
            href="#games"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl animate-in fade-in zoom-in duration-700 delay-400 cursor-pointer"
          >
            🚀 ¡Empezar Ahora!
          </a>
        </div>
      </section>

      {/* GAMES SECTION */}
      <section id="games" className="py-24 px-6 bg-[var(--color-dark-bg)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            Elige Tu Juego
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <Link href={game.disabled ? "#" : game.href} key={game.id}>
                <div
                  className={`group relative h-full rounded-2xl p-8 transition-all duration-500 cursor-pointer overflow-hidden ${
                    game.disabled
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:-translate-y-3 hover:shadow-2xl"
                  }`}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(109,40,217,0.1) 0%, rgba(6,182,212,0.1) 100%)",
                    border: "2px solid rgba(109,40,217,0.3)",
                    animation: `fadeInUp 0.6s ease-out ${
                      index * 0.1
                    }s backwards`,
                  }}
                  onMouseEnter={() => !game.disabled && setHoveredGame(game.id)}
                  onMouseLeave={() => setHoveredGame(null)}
                >
                  {/* Badge "Nuevo" */}
                  {game.isNew && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[var(--color-success)] to-[var(--color-secondary)] text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse z-20">
                      ¡NUEVO! 🎉
                    </div>
                  )}

                  {/* Efecto de fondo al hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                  {/* Borde brillante al hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none ${
                      hoveredGame === game.id
                        ? "border-[var(--color-accent)]"
                        : "border-transparent"
                    }`}
                  />

                  {/* Contenido */}
                  <div className="relative z-10">
                    <div className="text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-500">
                      {game.icon}
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-[var(--color-accent)] group-hover:text-white transition-colors duration-300">
                      {game.name}
                    </h3>

                    <p className="text-[rgba(241,245,249,0.7)] mb-6 leading-relaxed group-hover:text-[rgba(241,245,249,0.9)] transition-colors duration-300">
                      {game.description}
                    </p>

                    <button
                      className={`w-full py-3 px-6 rounded-full font-bold text-lg transition-all duration-300 ${
                        game.disabled
                          ? "bg-[rgba(6,182,212,0.2)] text-[var(--color-secondary)] cursor-not-allowed"
                          : "bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-white hover:shadow-xl group-hover:shadow-2xl"
                      }`}
                      disabled={game.disabled}
                    >
                      {game.disabled ? "Próximamente" : "Jugar Ahora"}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section
        id="stats"
        className="py-24 px-6 bg-gradient-to-b from-[var(--color-dark-bg)] via-[#1E3A8A] to-[var(--color-dark-bg)]"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            Tu Progreso
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[rgba(15,23,42,0.6)] p-8 rounded-xl border border-[rgba(251,191,36,0.2)] hover:border-[rgba(251,191,36,0.5)] transition-all duration-300 text-center transform hover:scale-105"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${
                    0.4 + index * 0.1
                  }s backwards`,
                }}
              >
                <div className="text-4xl font-bold text-[var(--color-accent)] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-[rgba(241,245,249,0.7)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-[rgba(109,40,217,0.2)] bg-[rgba(15,23,42,0.5)] text-center text-[rgba(241,245,249,0.6)]">
        <p>
          &copy; 2024 Millionaire Game. Todos los derechos reservados.
          ¡Diviértete jugando!
        </p>
      </footer>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(30px);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}