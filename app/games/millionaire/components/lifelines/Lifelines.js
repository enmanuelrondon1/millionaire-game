//app/games/millionaire/components/lifelines/Lifelines.js
'use client';

import { useState } from 'react';
import FriendAdvice from './FriendAdvice';
import PublicVotes from './PublicVotes';

export default function Lifelines({
  used5050,
  usedFriend,
  usedPublic,
  answered,
  friendAdvice,
  publicVotes,
  availableAnswers,
  on5050,
  onFriend,
  onPublic,
}) {
  const [hoveredLifeline, setHoveredLifeline] = useState(null);

  const lifelines = [
    {
      id: '50/50',
      name: '50/50',
      icon: '🔄',
      description: 'Elimina 2 respuestas',
      used: used5050,
      onClick: on5050,
      color: '#3B82F6',
      bgGradient: 'from-blue-500/20 to-blue-600/10'
    },
    {
      id: 'friend',
      name: 'Llamada Amigo',
      icon: '📞',
      description: 'Tu amigo sugiere',
      used: usedFriend,
      onClick: onFriend,
      color: '#A855F7',
      bgGradient: 'from-purple-500/20 to-purple-600/10'
    },
    {
      id: 'public',
      name: 'Votación Público',
      icon: '📊',
      description: 'El público vota',
      used: usedPublic,
      onClick: onPublic,
      color: '#FBBF24',
      bgGradient: 'from-amber-500/20 to-amber-600/10'
    }
  ];

  return (
    <div className="w-full space-y-4">
      {/* Botones de Comodines */}
      <div className="w-full rounded-2xl p-6 sm:p-8 backdrop-blur-md border animate-in fade-in duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(109,40,217,0.1) 0%, rgba(6,182,212,0.05) 100%)',
          borderColor: 'rgba(109,40,217,0.2)'
        }}
      >
        <h3 className="text-lg font-bold mb-6 text-[var(--color-accent)]">
          🆘 Tus Comodines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lifelines.map((lifeline) => (
            <button
              key={lifeline.id}
              onClick={lifeline.onClick}
              disabled={lifeline.used || answered}
              onMouseEnter={() => setHoveredLifeline(lifeline.id)}
              onMouseLeave={() => setHoveredLifeline(null)}
              className={`group relative p-4 sm:p-5 rounded-xl transition-all duration-300 border-2 overflow-hidden ${
                lifeline.used || answered ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
              }`}
              style={{
                background: lifeline.used
                  ? 'rgba(107, 114, 128, 0.1)'
                  : `linear-gradient(135deg, ${lifeline.color}20 0%, ${lifeline.color}10 100%)`,
                borderColor: lifeline.used ? 'rgba(107, 114, 128, 0.3)' : `${lifeline.color}40`,
                boxShadow: hoveredLifeline === lifeline.id && !lifeline.used
                  ? `0 0 20px ${lifeline.color}60`
                  : 'none'
              }}
            >
              {/* Efecto de brillo al hover */}
              {!lifeline.used && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${lifeline.color}30 0%, transparent 70%)`
                  }}
                />
              )}

              {/* Contenido */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl sm:text-4xl">{lifeline.icon}</span>
                  
                  {/* Indicador de usado */}
                  {lifeline.used && (
                    <span className="text-xl">✅</span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white mb-1 text-left">
                  {lifeline.name}
                </h4>

                <p className="text-xs text-[rgba(241,245,249,0.7)] text-left leading-tight">
                  {lifeline.description}
                </p>

                {/* Estado */}
                <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.1)]">
                  <p className="text-xs font-semibold" style={{ color: lifeline.color }}>
                    {lifeline.used ? 'Ya Usado' : 'Disponible'}
                  </p>
                </div>
              </div>

              {/* Borde brillante en hover */}
              {!lifeline.used && (
                <div
                  className={`absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  style={{
                    borderColor: lifeline.color
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Información */}
        <div className="mt-6 p-4 rounded-lg bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)]">
          <p className="text-xs sm:text-sm text-[rgba(241,245,249,0.8)]">
            <span className="font-bold text-[var(--color-accent)]">💡 Tip:</span> Usa tus comodines estratégicamente. 
            Una vez usado, no podrás volver a utilizarlo. ¡Elige sabiamente!
          </p>
        </div>
      </div>

      {/* Friend Advice */}
      {friendAdvice !== null && friendAdvice !== undefined && (
        <FriendAdvice advice={friendAdvice} />
      )}

      {/* Public Votes */}
      {publicVotes !== null && publicVotes !== undefined && (
        <PublicVotes votes={publicVotes} availableAnswers={availableAnswers} />
      )}
    </div>
  );
}