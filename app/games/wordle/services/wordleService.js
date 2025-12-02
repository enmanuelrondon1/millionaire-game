import words from './words.json';

// Función para obtener una palabra aleatoria del listado
export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase();
};

// Función para verificar si una palabra es válida (existe en nuestra lista)
export const isValidWord = (word) => {
  return words.includes(word.toLowerCase());
};

// Función para obtener la "palabra del día" de forma consistente
export const getWordOfDay = () => {
  const today = new Date();
  // Genera un índice basado en la fecha actual
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % words.length;
  return words[index].toUpperCase();
};