'use client';

import { useState } from 'react';

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Enmanuel Rondón - Creador"
    >
      {/* Logo Box */}
      <div
        className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center font-bold text-white transition-all duration-300 ${
          isHovered ? 'scale-110 shadow-lg' : 'shadow-md'
        }`}
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #7c3aed 0%, #764ba2 100%)',
        }}
      >
        {/* Iniciales - Visible por defecto */}
        <span
          className={`text-xl md:text-2xl font-black transition-all duration-300 ${
            isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
        >
          ER
        </span>

        {/* Nombre completo - Visible al hover */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-lg transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <span className="text-xs md:text-sm font-black">ER</span>
          <span className="text-[10px] md:text-xs font-semibold tracking-widest whitespace-nowrap">
            Enmanuel
          </span>
        </div>

        {/* Shine effect */}
        <div
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-white to-transparent opacity-30 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
          }}
        />
      </div>

      {/* Tooltip - Solo en desktop, posicionado abajo */}
      {isHovered && (
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-full mt-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-40 pointer-events-none">
          Creado por Enmanuel Rondón
          {/* Arrow pointing up */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
    </div>
  );
}