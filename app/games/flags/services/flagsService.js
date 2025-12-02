// app/games/flags/services/flagsService.js

export const countries = [
  // América
  { name: 'Argentina', code: 'AR', continent: 'América', capital: 'Buenos Aires', difficulty: 'easy' },
  { name: 'Brasil', code: 'BR', continent: 'América', capital: 'Brasilia', difficulty: 'easy' },
  { name: 'Canadá', code: 'CA', continent: 'América', capital: 'Ottawa', difficulty: 'easy' },
  { name: 'Chile', code: 'CL', continent: 'América', capital: 'Santiago', difficulty: 'easy' },
  { name: 'Colombia', code: 'CO', continent: 'América', capital: 'Bogotá', difficulty: 'easy' },
  { name: 'Estados Unidos', code: 'US', continent: 'América', capital: 'Washington D.C.', difficulty: 'easy' },
  { name: 'México', code: 'MX', continent: 'América', capital: 'Ciudad de México', difficulty: 'easy' },
  { name: 'Perú', code: 'PE', continent: 'América', capital: 'Lima', difficulty: 'easy' },
  { name: 'Uruguay', code: 'UY', continent: 'América', capital: 'Montevideo', difficulty: 'medium' },
  { name: 'Venezuela', code: 'VE', continent: 'América', capital: 'Caracas', difficulty: 'medium' },
  { name: 'Ecuador', code: 'EC', continent: 'América', capital: 'Quito', difficulty: 'medium' },
  { name: 'Bolivia', code: 'BO', continent: 'América', capital: 'La Paz', difficulty: 'medium' },
  { name: 'Paraguay', code: 'PY', continent: 'América', capital: 'Asunción', difficulty: 'medium' },
  { name: 'Costa Rica', code: 'CR', continent: 'América', capital: 'San José', difficulty: 'medium' },
  { name: 'Panamá', code: 'PA', continent: 'América', capital: 'Ciudad de Panamá', difficulty: 'medium' },
  { name: 'Cuba', code: 'CU', continent: 'América', capital: 'La Habana', difficulty: 'medium' },
  { name: 'Jamaica', code: 'JM', continent: 'América', capital: 'Kingston', difficulty: 'hard' },
  
  // Europa
  { name: 'España', code: 'ES', continent: 'Europa', capital: 'Madrid', difficulty: 'easy' },
  { name: 'Francia', code: 'FR', continent: 'Europa', capital: 'París', difficulty: 'easy' },
  { name: 'Italia', code: 'IT', continent: 'Europa', capital: 'Roma', difficulty: 'easy' },
  { name: 'Alemania', code: 'DE', continent: 'Europa', capital: 'Berlín', difficulty: 'easy' },
  { name: 'Reino Unido', code: 'GB', continent: 'Europa', capital: 'Londres', difficulty: 'easy' },
  { name: 'Portugal', code: 'PT', continent: 'Europa', capital: 'Lisboa', difficulty: 'easy' },
  { name: 'Países Bajos', code: 'NL', continent: 'Europa', capital: 'Ámsterdam', difficulty: 'medium' },
  { name: 'Bélgica', code: 'BE', continent: 'Europa', capital: 'Bruselas', difficulty: 'medium' },
  { name: 'Suiza', code: 'CH', continent: 'Europa', capital: 'Berna', difficulty: 'medium' },
  { name: 'Grecia', code: 'GR', continent: 'Europa', capital: 'Atenas', difficulty: 'easy' },
  { name: 'Suecia', code: 'SE', continent: 'Europa', capital: 'Estocolmo', difficulty: 'medium' },
  { name: 'Noruega', code: 'NO', continent: 'Europa', capital: 'Oslo', difficulty: 'medium' },
  { name: 'Dinamarca', code: 'DK', continent: 'Europa', capital: 'Copenhague', difficulty: 'medium' },
  { name: 'Finlandia', code: 'FI', continent: 'Europa', capital: 'Helsinki', difficulty: 'medium' },
  { name: 'Polonia', code: 'PL', continent: 'Europa', capital: 'Varsovia', difficulty: 'medium' },
  { name: 'Austria', code: 'AT', continent: 'Europa', capital: 'Viena', difficulty: 'medium' },
  { name: 'Irlanda', code: 'IE', continent: 'Europa', capital: 'Dublín', difficulty: 'medium' },
  { name: 'Rusia', code: 'RU', continent: 'Europa', capital: 'Moscú', difficulty: 'easy' },
  { name: 'Ucrania', code: 'UA', continent: 'Europa', capital: 'Kiev', difficulty: 'medium' },
  { name: 'Croacia', code: 'HR', continent: 'Europa', capital: 'Zagreb', difficulty: 'hard' },
  
  // Asia
  { name: 'China', code: 'CN', continent: 'Asia', capital: 'Pekín', difficulty: 'easy' },
  { name: 'Japón', code: 'JP', continent: 'Asia', capital: 'Tokio', difficulty: 'easy' },
  { name: 'India', code: 'IN', continent: 'Asia', capital: 'Nueva Delhi', difficulty: 'easy' },
  { name: 'Corea del Sur', code: 'KR', continent: 'Asia', capital: 'Seúl', difficulty: 'easy' },
  { name: 'Tailandia', code: 'TH', continent: 'Asia', capital: 'Bangkok', difficulty: 'medium' },
  { name: 'Vietnam', code: 'VN', continent: 'Asia', capital: 'Hanói', difficulty: 'medium' },
  { name: 'Indonesia', code: 'ID', continent: 'Asia', capital: 'Yakarta', difficulty: 'medium' },
  { name: 'Filipinas', code: 'PH', continent: 'Asia', capital: 'Manila', difficulty: 'medium' },
  { name: 'Malasia', code: 'MY', continent: 'Asia', capital: 'Kuala Lumpur', difficulty: 'medium' },
  { name: 'Singapur', code: 'SG', continent: 'Asia', capital: 'Singapur', difficulty: 'medium' },
  { name: 'Turquía', code: 'TR', continent: 'Asia', capital: 'Ankara', difficulty: 'medium' },
  { name: 'Israel', code: 'IL', continent: 'Asia', capital: 'Jerusalén', difficulty: 'medium' },
  { name: 'Arabia Saudita', code: 'SA', continent: 'Asia', capital: 'Riad', difficulty: 'medium' },
  { name: 'Emiratos Árabes', code: 'AE', continent: 'Asia', capital: 'Abu Dabi', difficulty: 'medium' },
  { name: 'Pakistán', code: 'PK', continent: 'Asia', capital: 'Islamabad', difficulty: 'medium' },
  { name: 'Bangladesh', code: 'BD', continent: 'Asia', capital: 'Daca', difficulty: 'hard' },
  
  // África
  { name: 'Sudáfrica', code: 'ZA', continent: 'África', capital: 'Pretoria', difficulty: 'easy' },
  { name: 'Egipto', code: 'EG', continent: 'África', capital: 'El Cairo', difficulty: 'easy' },
  { name: 'Nigeria', code: 'NG', continent: 'África', capital: 'Abuya', difficulty: 'medium' },
  { name: 'Kenia', code: 'KE', continent: 'África', capital: 'Nairobi', difficulty: 'medium' },
  { name: 'Marruecos', code: 'MA', continent: 'África', capital: 'Rabat', difficulty: 'medium' },
  { name: 'Etiopía', code: 'ET', continent: 'África', capital: 'Adís Abeba', difficulty: 'medium' },
  { name: 'Ghana', code: 'GH', continent: 'África', capital: 'Acra', difficulty: 'hard' },
  { name: 'Argelia', code: 'DZ', continent: 'África', capital: 'Argel', difficulty: 'medium' },
  { name: 'Tanzania', code: 'TZ', continent: 'África', capital: 'Dodoma', difficulty: 'hard' },
  { name: 'Senegal', code: 'SN', continent: 'África', capital: 'Dakar', difficulty: 'hard' },
  
  // Oceanía
  { name: 'Australia', code: 'AU', continent: 'Oceanía', capital: 'Canberra', difficulty: 'easy' },
  { name: 'Nueva Zelanda', code: 'NZ', continent: 'Oceanía', capital: 'Wellington', difficulty: 'medium' },
];

export function getCountriesByDifficulty(difficulty) {
  if (difficulty === 'all') return countries;
  return countries.filter(c => c.difficulty === difficulty);
}

export function getRandomCountries(count, difficulty = 'all') {
  const pool = getCountriesByDifficulty(difficulty);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateOptions(correctCountry, allCountries, count = 4) {
  const options = [correctCountry];
  const otherCountries = allCountries.filter(c => c.code !== correctCountry.code);
  
  while (options.length < count && otherCountries.length > 0) {
    const randomIndex = Math.floor(Math.random() * otherCountries.length);
    const country = otherCountries[randomIndex];
    options.push(country);
    otherCountries.splice(randomIndex, 1);
  }
  
  return options.sort(() => Math.random() - 0.5);
}

export function getFlagUrl(countryCode) {
  return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
}