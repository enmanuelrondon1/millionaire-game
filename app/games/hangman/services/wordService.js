//app/games/hangman/services/wordService.js
const words = [
  "react",
  "javascript",
  "componente",
  "estado",
  "propiedad",
  "servidor",
  "cliente",
  "variable",
  "funcion",
  "objeto",
  "array",
  "clase",
  "estilo",
  "depuracion",
  "compilador",
  "interprete",
  "algoritmo",
  "promesa",
  "asincrono",
  "sincrono",
];

export const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

export const getRandomQuestion = async () => {
  try {
    const response = await fetch('/hangman-questions.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const questions = await response.json();
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  } catch (error) {
    console.error('Failed to fetch hangman questions:', error);
    // Return a default question in case of error
    return { question: 'Error al cargar', answer: 'error' };
  }
};