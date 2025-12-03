// app/games/math/services/mathService.js

const DIFFICULTY_RANGES = {
  easy: { min: 1, max: 10 },
  medium: { min: 1, max: 50 },
  hard: { min: 1, max: 100 },
};

const OPERATIONS = {
  addition: { symbol: '+', name: 'Suma' },
  subtraction: { symbol: '-', name: 'Resta' },
  multiplication: { symbol: '×', name: 'Multiplicación' },
  division: { symbol: '÷', name: 'División' },
  mixed: { symbol: '🎲', name: 'Mezclado' },
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAddition(difficulty) {
  const { min, max } = DIFFICULTY_RANGES[difficulty];
  const num1 = getRandomNumber(min, max);
  const num2 = getRandomNumber(min, max);
  
  return {
    num1,
    num2,
    operation: '+',
    answer: num1 + num2,
    question: `${num1} + ${num2}`,
  };
}

function generateSubtraction(difficulty) {
  const { min, max } = DIFFICULTY_RANGES[difficulty];
  let num1 = getRandomNumber(min, max);
  let num2 = getRandomNumber(min, max);
  
  // Asegurar que num1 >= num2 para evitar negativos
  if (num1 < num2) {
    [num1, num2] = [num2, num1];
  }
  
  return {
    num1,
    num2,
    operation: '-',
    answer: num1 - num2,
    question: `${num1} - ${num2}`,
  };
}

function generateMultiplication(difficulty) {
  const ranges = {
    easy: { min: 1, max: 10 },
    medium: { min: 2, max: 12 },
    hard: { min: 5, max: 15 },
  };
  
  const { min, max } = ranges[difficulty];
  const num1 = getRandomNumber(min, max);
  const num2 = getRandomNumber(min, max);
  
  return {
    num1,
    num2,
    operation: '×',
    answer: num1 * num2,
    question: `${num1} × ${num2}`,
  };
}

function generateDivision(difficulty) {
  const ranges = {
    easy: { min: 1, max: 10 },
    medium: { min: 2, max: 12 },
    hard: { min: 5, max: 15 },
  };
  
  const { min, max } = ranges[difficulty];
  const divisor = getRandomNumber(min, max);
  const quotient = getRandomNumber(min, max);
  const num1 = divisor * quotient;
  
  return {
    num1,
    num2: divisor,
    operation: '÷',
    answer: quotient,
    question: `${num1} ÷ ${divisor}`,
  };
}

export function generateQuestion(operation, difficulty) {
  let question;
  
  if (operation === 'mixed') {
    const operations = ['addition', 'subtraction', 'multiplication', 'division'];
    const randomOp = operations[Math.floor(Math.random() * operations.length)];
    operation = randomOp;
  }
  
  switch (operation) {
    case 'addition':
      question = generateAddition(difficulty);
      break;
    case 'subtraction':
      question = generateSubtraction(difficulty);
      break;
    case 'multiplication':
      question = generateMultiplication(difficulty);
      break;
    case 'division':
      question = generateDivision(difficulty);
      break;
    default:
      question = generateAddition(difficulty);
  }
  
  return question;
}

export function generateOptions(correctAnswer, count = 4) {
  const options = [correctAnswer];
  const usedNumbers = new Set([correctAnswer]);
  
  while (options.length < count) {
    // Generar opciones cercanas a la respuesta correcta
    const offset = Math.floor(Math.random() * 20) - 10;
    let option = correctAnswer + offset;
    
    // Asegurar que la opción sea positiva y no repetida
    if (option >= 0 && !usedNumbers.has(option)) {
      options.push(option);
      usedNumbers.add(option);
    }
  }
  
  // Mezclar las opciones
  return options.sort(() => Math.random() - 0.5);
}

export { OPERATIONS };