// app/games/trivia-quick/services/triviaService.js
import allQuestions from './trivia-questions.json';

export const fetchTriviaQuestions = async (count = 10) => {
  try {
    // Baraja todas las preguntas y toma la cantidad solicitada
    const shuffled = shuffleQuestions(allQuestions);
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Error fetching or shuffling trivia questions:', error);
    // Como fallback, baraja y corta las preguntas importadas directamente
    const shuffledFallback = shuffleQuestions(allQuestions);
    return shuffledFallback.slice(0, count);
  }
};

export const shuffleQuestions = (questions) => {
  const shuffled = [...questions];
  // Algoritmo de Fisher-Yates para barajar
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};