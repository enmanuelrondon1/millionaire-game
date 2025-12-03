//app/components/InstallPWA.js
'use client';

import { useState, useEffect } from 'react';

export default function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setInstallPrompt(null);
      });
    }
  };

  if (!installPrompt) {
    return null;
  }

  return (
    <button
      className="install-pwa-btn"
      onClick={handleInstallClick}
      title="Instalar aplicación"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span>Instalar</span>
      <style jsx>{`
        .install-pwa-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: var(--gradient-epic);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(109, 40, 217, 0.4);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .install-pwa-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 30px rgba(109, 40, 217, 0.5);
        }

        @media (max-width: 640px) {
          .install-pwa-btn {
            bottom: 1rem;
            right: 1rem;
            padding: 0.75rem 1rem;
          }
          .install-pwa-btn span {
            display: none;
          }
          .install-pwa-btn svg {
            margin-right: 0;
          }
        }
      `}</style>
    </button>
  );
}