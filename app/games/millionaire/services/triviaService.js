// app/games/millionaire/services/triviaService.js

/**
 * Obtiene preguntas de trivia en español desde archivo JSON local
 * @param {number} amount - Cantidad de preguntas (1-50)
 * @param {string} difficulty - Dificultad: 'easy', 'medium', 'hard', 'random'
 * @param {string} category - Categoría (opcional)
 * @returns {Promise<Array>} Array de preguntas formateadas
 */
export const fetchTriviaQuestions = async (amount = 9, difficulty = 'medium', category = null) => {
  try {
    // Cargar el JSON desde la carpeta public
    const response = await fetch('/trivia-questions-es.json');
    
    if (!response.ok) {
      throw new Error(`Error cargando archivo: ${response.status}`);
    }

    const data = await response.json();
    let questions = data.questions;

    // Filtrar por dificultad si no es 'random'
    if (difficulty && difficulty !== 'random') {
      questions = questions.filter(q => q.difficulty === difficulty);
    }

    // Filtrar por categoría si se especifica
    if (category) {
      questions = questions.filter(q => q.category === category);
    }

    // Si no hay suficientes preguntas, retornar todas
    if (questions.length < amount) {
      console.warn(`Solo hay ${questions.length} preguntas disponibles para los filtros especificados`);
      return questions;
    }

    // Mezclar y seleccionar la cantidad solicitada
    const shuffled = shuffleArray(questions);
    const selected = shuffled.slice(0, amount);

    // Mapear al formato esperado por el juego
    const formattedQuestions = selected.map((q, index) => ({
      question: q.question,
      answers: q.answers,
      correct: q.correct,
      prize: getPrizeByDifficulty(q.difficulty, index),
      difficulty: q.difficulty,
      category: q.category,
    }));

    return formattedQuestions;
  } catch (error) {
    console.error('Error fetching trivia:', error);
    throw error;
  }
};

/**
 * Obtiene las categorías disponibles
 * @returns {Promise<Array>} Array de categorías
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch('/trivia-questions-es.json');
    
    if (!response.ok) {
      throw new Error(`Error cargando archivo: ${response.status}`);
    }

    const data = await response.json();
    
    // Extraer categorías únicas
    const categories = [...new Set(data.questions.map(q => q.category))];
    
    return categories.map(name => ({
      id: null,
      name: name
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Categorías predefinidas para acceso rápido (en español)
 */
export const QUICK_CATEGORIES = {
  general: { id: null, name: 'General' },
  ciencia: { id: null, name: 'Ciencia' },
  deportes: { id: null, name: 'Deportes' },
  historia: { id: null, name: 'Historia' },
  geografia: { id: null, name: 'Geografía' },
  entretenimiento: { id: null, name: 'Entretenimiento' },
  peliculas: { id: null, name: 'Películas' },
  musica: { id: null, name: 'Música' },
  libros: { id: null, name: 'Libros' },
  tecnologia: { id: null, name: 'Tecnología' },
  arte: { id: null, name: 'Arte' },
  naturaleza: { id: null, name: 'Naturaleza' },
  videojuegos: { id: null, name: 'Videojuegos' },
  comics: { id: null, name: 'Cómics' },
};

// ============= FUNCIONES AUXILIARES =============

/**
 * Mezcla un array (Fisher-Yates)
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Mapea dificultad a premio en función de la pregunta
 */
const getPrizeByDifficulty = (difficulty, questionIndex) => {
  const easyPrizes = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000];
  const mediumPrizes = [2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000];
  const hardPrizes = [64000, 125000, 250000, 500000, 1000000, 2000000, 4000000, 8000000, 16000000];

  const index = Math.min(questionIndex, 8);

  if (difficulty === 'easy') return easyPrizes[index];
  if (difficulty === 'medium') return mediumPrizes[index];
  if (difficulty === 'hard') return hardPrizes[index];
  
  return mediumPrizes[index];
};