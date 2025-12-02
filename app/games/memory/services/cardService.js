// app/games/memory/services/cardService.js

const EMOJI_PAIRS = [
  // Frutas y verduras originales
  { emoji: '🍎', name: 'Manzana' },
  { emoji: '🍊', name: 'Naranja' },
  { emoji: '🍌', name: 'Plátano' },
  { emoji: '🍉', name: 'Sandía' },
  { emoji: '🍓', name: 'Fresa' },
  { emoji: '🍒', name: 'Cereza' },
  { emoji: '🍑', name: 'Melocotón' },
  { emoji: '🍍', name: 'Piña' },
  { emoji: '🥝', name: 'Kiwi' },
  { emoji: '🍅', name: 'Tomate' },

  // Comida rápida y dulces originales
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '🍔', name: 'Hamburguesa' },
  { emoji: '🍟', name: 'Papas Fritas' },
  { emoji: '🍰', name: 'Pastel' },
  { emoji: '🍪', name: 'Galleta' },

  // Juegos y deportes originales
  { emoji: '🎮', name: 'Videojuego' },
  { emoji: '🎸', name: 'Guitarra' },
  { emoji: '🎲', name: 'Dado' },
  { emoji: '⚽', name: 'Fútbol' },
  { emoji: '🏀', name: 'Baloncesto' },

  // NUEVAS FRUTAS Y COMIDAS
  { emoji: '🥑', name: 'Aguacate' },
  { emoji: '🌽', name: 'Maíz' },
  { emoji: '🍦', name: 'Helado' },
  { emoji: '🍩', name: 'Donut' },
  { emoji: '🍫', name: 'Chocolate' },

  // ANIMALES (¡super divertidos para niños!)
  { emoji: '🐶', name: 'Perro' },
  { emoji: '🐱', name: 'Gato' },
  { emoji: '🐭', name: 'Ratón' },
  { emoji: '🐰', name: 'Conejo' },
  { emoji: '🦊', name: 'Zorro' },
  { emoji: '🐻', name: 'Oso' },
  { emoji: '🐼', name: 'Panda' },
  { emoji: '🦄', name: 'Unicornio' },
  { emoji: '🐸', name: 'Rana' },
  { emoji: '🦜', name: 'Loro' },

  // VEHÍCULOS
  { emoji: '🚗', name: 'Carro' },
  { emoji: '🚀', name: 'Cohete' },
  { emoji: '✈️', name: 'Avión' },
  { emoji: '🚤', name: 'Barco' },

  // NATURALEZA Y TOQUES VENEZOLANOS
  { emoji: '🌸', name: 'Flor' },
  { emoji: '🌳', name: 'Árbol' },
  { emoji: '☀️', name: 'Sol' },
  { emoji: '🌙', name: 'Luna' },
  { emoji: '⭐', name: 'Estrella' },
  { emoji: '🏖️', name: 'Playa' },
  { emoji: '🌴', name: 'Palmera' },

  // DEPORTES EXTRA (¡con béisbol por Venezuela!)
  { emoji: '⚾', name: 'Béisbol' },
  { emoji: '🎾', name: 'Tenis' },

  // OBJETOS Y NAVIDEÑOS (¡perfecto para diciembre!)
  { emoji: '📱', name: 'Celular' },
  { emoji: '💻', name: 'Computadora' },
  { emoji: '📚', name: 'Libro' },
  { emoji: '🎧', name: 'Audífonos' },
  { emoji: '🎁', name: 'Regalo' },
  { emoji: '🎄', name: 'Árbol Navideño' },
  { emoji: '🔔', name: 'Campana' },
];

export const generateCards = (difficulty) => {
  let pairCount = 3; // Fácil: 6 tarjetas
  
  if (difficulty === 'medium') {
    pairCount = 6; // 12 tarjetas
  } else if (difficulty === 'hard') {
    pairCount = 10; // 20 tarjetas
  } else if (difficulty === 'expert') { // ¡NUEVO NIVEL!
    pairCount = 15; // 30 tarjetas (¡más desafío!)
  }

  const pairs = EMOJI_PAIRS.slice(0, pairCount);
  const cards = [];

  pairs.forEach((pair, index) => {
    cards.push({ id: index, emoji: pair.emoji, name: pair.name });
    cards.push({ id: index, emoji: pair.emoji, name: pair.name });
  });

  return shuffleArray(cards);
};

export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};