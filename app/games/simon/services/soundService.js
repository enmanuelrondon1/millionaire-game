// app/games/simon/services/soundService.js

// Frecuencias para cada color (simulando el Simon original)
const FREQUENCIES = {
  0: 329.63, // Green - E4
  1: 261.63, // Red - C4
  2: 220.00, // Yellow - A3
  3: 196.00  // Blue - G3
};

let audioContext = null;
let currentOscillator = null;
let currentGain = null;

// Inicializar AudioContext (solo cuando se necesite)
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

// Reproducir sonido para un color específico
export const playSound = (colorId) => {
  try {
    stopAllSounds();
    
    const ctx = getAudioContext();
    const frequency = FREQUENCIES[colorId];
    
    // Crear oscilador (genera el tono)
    currentOscillator = ctx.createOscillator();
    currentGain = ctx.createGain();
    
    currentOscillator.connect(currentGain);
    currentGain.connect(ctx.destination);
    
    // Configurar el sonido
    currentOscillator.type = 'sine';
    currentOscillator.frequency.value = frequency;
    
    // Envelope (ataque y liberación suaves)
    currentGain.gain.setValueAtTime(0, ctx.currentTime);
    currentGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
    currentGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    currentOscillator.start(ctx.currentTime);
    currentOscillator.stop(ctx.currentTime + 0.3);
    
    currentOscillator.onended = () => {
      stopAllSounds();
    };
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

// Detener todos los sonidos
export const stopAllSounds = () => {
  if (currentOscillator) {
    try {
      currentOscillator.stop();
      currentOscillator.disconnect();
    } catch (e) {
      // Ya está detenido
    }
    currentOscillator = null;
  }
  
  if (currentGain) {
    try {
      currentGain.disconnect();
    } catch (e) {
      // Ya está desconectado
    }
    currentGain = null;
  }
};

// Reproducir sonido de error
export const playErrorSound = () => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 100;
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  } catch (error) {
    console.error('Error playing error sound:', error);
  }
};

// Reproducir sonido de victoria
export const playWinSound = () => {
  try {
    const ctx = getAudioContext();
    
    // Secuencia de tonos ascendentes
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    
    notes.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      const startTime = ctx.currentTime + (index * 0.15);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  } catch (error) {
    console.error('Error playing win sound:', error);
  }
};