//app/games/millionaire/components/GameHeader.js
"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';

export default function GameHeader({ userMoney }) {
  const [displayMoney, setDisplayMoney] = useState(userMoney);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (userMoney !== displayMoney) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setDisplayMoney(userMoney);
        setAnimate(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [userMoney]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <header className="w-full mb-8">
      <div
        className="relative py-6 px-4 sm:px-8 rounded-2xl text-center backdrop-blur-md border"
        style={{
          background:
            "linear-gradient(135deg, rgba(109,40,217,0.2) 0%, rgba(6,182,212,0.15) 100%)",
          borderColor: "rgba(109,40,217,0.3)",
        }}
      >
        {/* Contenedor Flex para el header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:relative">
          {/* Botón de Volver */}
          <div className="sm:absolute sm:left-0 mb-4 sm:mb-0">
            <Link href="/" className="btn-secondary">
              &larr; Volver
            </Link>
          </div>

          {/* Contenido Principal */}
          <div className="flex-grow">
            {/* Título */}
            <h1 className="text-2xl sm:text-3xl font-black mb-3 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
              💰 Dinero Acumulado
            </h1>

            {/* Dinero */}
            <div
              className={`transition-all duration-600 ${
                animate ? "scale-110" : "scale-100"
              }`}
            >
              <p
                className="text-4xl sm:text-5xl font-black transition-colors duration-300"
                style={{
                  color: animate
                    ? "var(--color-accent)"
                    : "var(--color-secondary)",
                  textShadow: "0 0 20px rgba(6,182,212,0.5)",
                }}
              >
                {formatCurrency(displayMoney)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Línea decorativa (opcional, se puede centrar si es necesario) */}
        <div className="mt-4 h-1 w-40 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] mx-auto rounded-full opacity-70" />

      </div>
    </header>
  );
}