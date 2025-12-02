// app/games/simon/components/GameBoard.js
'use client';

const COLORS = [
  { id: 0, name: 'green', color: '#10B981', activeColor: '#34D399' },
  { id: 1, name: 'red', color: '#EF4444', activeColor: '#F87171' },
  { id: 2, name: 'yellow', color: '#FBBF24', activeColor: '#FCD34D' },
  { id: 3, name: 'blue', color: '#3B82F6', activeColor: '#60A5FA' }
];

export default function GameBoard({ activeButton, onButtonClick, disabled }) {
  const handleClick = (colorId) => {
    if (disabled) return;
    onButtonClick(colorId);
  };

  return (
    <div className="game-board">
      <div className="board-grid">
        {COLORS.map((color) => (
          <button
            key={color.id}
            className={`color-button ${activeButton === color.id ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={() => handleClick(color.id)}
            disabled={disabled}
            style={{
              '--button-color': color.color,
              '--button-active-color': color.activeColor
            }}
          >
            <div className="button-shine"></div>
          </button>
        ))}
      </div>

      <div className="center-circle">
        <div className="logo">
          <span className="logo-text">SIMON</span>
        </div>
      </div>

      <style jsx>{`
        .game-board {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin: 0 auto 2rem;
          aspect-ratio: 1;
          transition: margin-bottom 0.3s ease;
        }

        .board-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          width: 100%;
          height: 100%;
        }

        .color-button {
          position: relative;
          border: none;
          cursor: pointer;
          background: var(--button-color);
          transition: all 0.15s ease;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .color-button:nth-child(1) {
          border-top-left-radius: 100%;
        }

        .color-button:nth-child(2) {
          border-top-right-radius: 100%;
        }

        .color-button:nth-child(3) {
          border-bottom-left-radius: 100%;
        }

        .color-button:nth-child(4) {
          border-bottom-right-radius: 100%;
        }

        .color-button:not(.disabled):hover {
          transform: scale(1.05);
          filter: brightness(1.2);
        }

        .color-button.active {
          background: var(--button-active-color);
          box-shadow: 0 0 40px var(--button-active-color),
                      0 0 60px var(--button-active-color);
          transform: scale(1.08);
        }

        .color-button.disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .button-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 30%;
          background: linear-gradient(to bottom, 
            rgba(255, 255, 255, 0.3), 
            rgba(255, 255, 255, 0)
          );
          pointer-events: none;
        }

        .center-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30%;
          height: 30%;
          background: var(--color-dark-bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
          border: 4px solid rgba(255, 255, 255, 0.1);
        }

        .logo {
          text-align: center;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          background: var(--gradient-epic);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 640px) {
          .board-grid {
            gap: 0.5rem;
          }

          .logo-text {
            font-size: 1rem;
          }
        }

        @media (min-width: 768px) {
          .game-board {
            margin-bottom: 1.5rem; /* Reducir margen inferior en escritorio */
          }
        }
      `}</style>
    </div>
  );
}