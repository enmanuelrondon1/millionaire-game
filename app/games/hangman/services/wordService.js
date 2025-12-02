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

import questions from './questions.json';

export const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};