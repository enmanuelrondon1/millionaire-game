'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    // Registrar Service Worker para offline
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(reg => {
          console.log('✅ Service Worker registrado correctamente');
          
          // Detectar actualizaciones
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'activated') {
                  console.log('🔄 Nueva versión disponible');
                  // Recargar la página para obtener la última versión
                  window.location.reload();
                }
              });
            }
          });
        })
        .catch(err => {
          console.error('❌ Error al registrar Service Worker:', err);
        });
    }
  }, []);

  return null;
}