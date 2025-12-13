const CACHE_VERSION = 'v3';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const FLAGS_CACHE = `flags-${CACHE_VERSION}`;

// Archivos esenciales para cachear durante la instalación
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-256x256.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/trivia-questions-es.json',
  '/hangman-questions.json'
];

// Instalar Service Worker y cachear assets estáticos
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Precaching static assets');
        // Cachear archivos uno por uno para evitar fallos
        return Promise.all(
          STATIC_ASSETS.map(url => {
            return cache.add(url).catch(err => {
              console.warn(`[SW] Failed to cache ${url}:`, err);
            });
          })
        );
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
      .catch((err) => console.error('[SW] Installation failed:', err))
  );
});

// Activar Service Worker y limpiar caches antiguas
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE && cache !== IMAGE_CACHE && cache !== FLAGS_CACHE) {
            console.log('[SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Estrategia: Network First con fallback a Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requests que no sean GET
  if (request.method !== 'GET') return;
  
  // Ignorar Chrome extensions y devtools
  if (url.protocol === 'chrome-extension:' || url.protocol === 'devtools:') return;

  // Estrategia ESPECIAL para banderas de flagcdn.com: Cache First
  if (url.hostname === 'flagcdn.com') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          console.log('[SW] Flag from cache:', url.pathname);
          return cached;
        }
        
        console.log('[SW] Fetching flag:', url.pathname);
        return fetch(request).then(response => {
          if (response && response.status === 200) {
            return caches.open(FLAGS_CACHE).then(cache => {
              cache.put(request, response.clone());
              return response;
            });
          }
          return response;
        }).catch(err => {
          console.log('[SW] Flag fetch failed:', err);
          return cached;
        });
      })
    );
    return;
  }

  // Ignorar requests a APIs externas (excepto flagcdn que ya manejamos)
  if (url.origin !== self.location.origin) return;

  // Estrategia para imágenes locales: Cache First
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        
        return fetch(request).then(response => {
          return caches.open(IMAGE_CACHE).then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        }).catch(() => cached);
      })
    );
    return;
  }

  // Estrategia para assets estáticos (CSS, JS, JSON): Cache First
  if (
    url.pathname.endsWith('.css') || 
    url.pathname.endsWith('.js') || 
    url.pathname.endsWith('.json') ||
    url.pathname.includes('/_next/static/')
  ) {
    event.respondWith(
      caches.match(request).then(cached => {
        return cached || fetch(request).then(response => {
          return caches.open(STATIC_CACHE).then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // Estrategia para navegación: Network First con fallback a Cache
  if (request.mode === 'navigate' || url.pathname.startsWith('/games/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Solo cachear respuestas exitosas
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Si falla, buscar en cache
          return caches.match(request).then(cached => {
            return cached || caches.match('/');
          });
        })
    );
    return;
  }

  // Estrategia por defecto: Cache First con actualización en background
  event.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(response => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      });

      return cached || fetchPromise;
    })
  );
});