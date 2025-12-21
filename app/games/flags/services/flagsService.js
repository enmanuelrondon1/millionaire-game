// app/games/flags/services/flagsService.js

export const countries = [
  // América
  {
    name: "Argentina",
    code: "AR",
    continent: "América",
    capital: "Buenos Aires",
    difficulty: "easy",
  },
  {
    name: "Brasil",
    code: "BR",
    continent: "América",
    capital: "Brasilia",
    difficulty: "easy",
  },
  {
    name: "Canadá",
    code: "CA",
    continent: "América",
    capital: "Ottawa",
    difficulty: "easy",
  },
  {
    name: "Chile",
    code: "CL",
    continent: "América",
    capital: "Santiago",
    difficulty: "easy",
  },
  {
    name: "Colombia",
    code: "CO",
    continent: "América",
    capital: "Bogotá",
    difficulty: "easy",
  },
  {
    name: "Estados Unidos",
    code: "US",
    continent: "América",
    capital: "Washington D.C.",
    difficulty: "easy",
  },
  {
    name: "México",
    code: "MX",
    continent: "América",
    capital: "Ciudad de México",
    difficulty: "easy",
  },
  {
    name: "Perú",
    code: "PE",
    continent: "América",
    capital: "Lima",
    difficulty: "easy",
  },
  {
    name: "Uruguay",
    code: "UY",
    continent: "América",
    capital: "Montevideo",
    difficulty: "medium",
  },
  {
    name: "Venezuela",
    code: "VE",
    continent: "América",
    capital: "Caracas",
    difficulty: "medium",
  },
  {
    name: "Ecuador",
    code: "EC",
    continent: "América",
    capital: "Quito",
    difficulty: "medium",
  },
  {
    name: "Bolivia",
    code: "BO",
    continent: "América",
    capital: "La Paz",
    difficulty: "medium",
  },
  {
    name: "Paraguay",
    code: "PY",
    continent: "América",
    capital: "Asunción",
    difficulty: "medium",
  },
  {
    name: "Costa Rica",
    code: "CR",
    continent: "América",
    capital: "San José",
    difficulty: "medium",
  },
  {
    name: "Panamá",
    code: "PA",
    continent: "América",
    capital: "Ciudad de Panamá",
    difficulty: "medium",
  },
  {
    name: "Cuba",
    code: "CU",
    continent: "América",
    capital: "La Habana",
    difficulty: "medium",
  },
  {
    name: "Jamaica",
    code: "JM",
    continent: "América",
    capital: "Kingston",
    difficulty: "hard",
  },

  // Europa
  {
    name: "España",
    code: "ES",
    continent: "Europa",
    capital: "Madrid",
    difficulty: "easy",
  },
  {
    name: "Francia",
    code: "FR",
    continent: "Europa",
    capital: "París",
    difficulty: "easy",
  },
  {
    name: "Italia",
    code: "IT",
    continent: "Europa",
    capital: "Roma",
    difficulty: "easy",
  },
  {
    name: "Alemania",
    code: "DE",
    continent: "Europa",
    capital: "Berlín",
    difficulty: "easy",
  },
  {
    name: "Reino Unido",
    code: "GB",
    continent: "Europa",
    capital: "Londres",
    difficulty: "easy",
  },
  {
    name: "Portugal",
    code: "PT",
    continent: "Europa",
    capital: "Lisboa",
    difficulty: "easy",
  },
  {
    name: "Países Bajos",
    code: "NL",
    continent: "Europa",
    capital: "Ámsterdam",
    difficulty: "medium",
  },
  {
    name: "Bélgica",
    code: "BE",
    continent: "Europa",
    capital: "Bruselas",
    difficulty: "medium",
  },
  {
    name: "Suiza",
    code: "CH",
    continent: "Europa",
    capital: "Berna",
    difficulty: "medium",
  },
  {
    name: "Grecia",
    code: "GR",
    continent: "Europa",
    capital: "Atenas",
    difficulty: "easy",
  },
  {
    name: "Suecia",
    code: "SE",
    continent: "Europa",
    capital: "Estocolmo",
    difficulty: "medium",
  },
  {
    name: "Noruega",
    code: "NO",
    continent: "Europa",
    capital: "Oslo",
    difficulty: "medium",
  },
  {
    name: "Dinamarca",
    code: "DK",
    continent: "Europa",
    capital: "Copenhague",
    difficulty: "medium",
  },
  {
    name: "Finlandia",
    code: "FI",
    continent: "Europa",
    capital: "Helsinki",
    difficulty: "medium",
  },
  {
    name: "Polonia",
    code: "PL",
    continent: "Europa",
    capital: "Varsovia",
    difficulty: "medium",
  },
  {
    name: "Austria",
    code: "AT",
    continent: "Europa",
    capital: "Viena",
    difficulty: "medium",
  },
  {
    name: "Irlanda",
    code: "IE",
    continent: "Europa",
    capital: "Dublín",
    difficulty: "medium",
  },
  {
    name: "Rusia",
    code: "RU",
    continent: "Europa",
    capital: "Moscú",
    difficulty: "easy",
  },
  {
    name: "Ucrania",
    code: "UA",
    continent: "Europa",
    capital: "Kiev",
    difficulty: "medium",
  },
  {
    name: "Croacia",
    code: "HR",
    continent: "Europa",
    capital: "Zagreb",
    difficulty: "hard",
  },

  // Asia
  {
    name: "China",
    code: "CN",
    continent: "Asia",
    capital: "Pekín",
    difficulty: "easy",
  },
  {
    name: "Japón",
    code: "JP",
    continent: "Asia",
    capital: "Tokio",
    difficulty: "easy",
  },
  {
    name: "India",
    code: "IN",
    continent: "Asia",
    capital: "Nueva Delhi",
    difficulty: "easy",
  },
  {
    name: "Corea del Sur",
    code: "KR",
    continent: "Asia",
    capital: "Seúl",
    difficulty: "easy",
  },
  {
    name: "Tailandia",
    code: "TH",
    continent: "Asia",
    capital: "Bangkok",
    difficulty: "medium",
  },
  {
    name: "Vietnam",
    code: "VN",
    continent: "Asia",
    capital: "Hanói",
    difficulty: "medium",
  },
  {
    name: "Indonesia",
    code: "ID",
    continent: "Asia",
    capital: "Yakarta",
    difficulty: "medium",
  },
  {
    name: "Filipinas",
    code: "PH",
    continent: "Asia",
    capital: "Manila",
    difficulty: "medium",
  },
  {
    name: "Malasia",
    code: "MY",
    continent: "Asia",
    capital: "Kuala Lumpur",
    difficulty: "medium",
  },
  {
    name: "Singapur",
    code: "SG",
    continent: "Asia",
    capital: "Singapur",
    difficulty: "medium",
  },
  {
    name: "Turquía",
    code: "TR",
    continent: "Asia",
    capital: "Ankara",
    difficulty: "medium",
  },
  {
    name: "Israel",
    code: "IL",
    continent: "Asia",
    capital: "Jerusalén",
    difficulty: "medium",
  },
  {
    name: "Arabia Saudita",
    code: "SA",
    continent: "Asia",
    capital: "Riad",
    difficulty: "medium",
  },
  {
    name: "Emiratos Árabes",
    code: "AE",
    continent: "Asia",
    capital: "Abu Dabi",
    difficulty: "medium",
  },
  {
    name: "Pakistán",
    code: "PK",
    continent: "Asia",
    capital: "Islamabad",
    difficulty: "medium",
  },
  {
    name: "Bangladesh",
    code: "BD",
    continent: "Asia",
    capital: "Daca",
    difficulty: "hard",
  },

  // África
  {
    name: "Sudáfrica",
    code: "ZA",
    continent: "África",
    capital: "Pretoria",
    difficulty: "easy",
  },
  {
    name: "Egipto",
    code: "EG",
    continent: "África",
    capital: "El Cairo",
    difficulty: "easy",
  },
  {
    name: "Nigeria",
    code: "NG",
    continent: "África",
    capital: "Abuya",
    difficulty: "medium",
  },
  {
    name: "Kenia",
    code: "KE",
    continent: "África",
    capital: "Nairobi",
    difficulty: "medium",
  },
  {
    name: "Marruecos",
    code: "MA",
    continent: "África",
    capital: "Rabat",
    difficulty: "medium",
  },
  {
    name: "Etiopía",
    code: "ET",
    continent: "África",
    capital: "Adís Abeba",
    difficulty: "medium",
  },
  {
    name: "Ghana",
    code: "GH",
    continent: "África",
    capital: "Acra",
    difficulty: "hard",
  },
  {
    name: "Argelia",
    code: "DZ",
    continent: "África",
    capital: "Argel",
    difficulty: "medium",
  },
  {
    name: "Tanzania",
    code: "TZ",
    continent: "África",
    capital: "Dodoma",
    difficulty: "hard",
  },
  {
    name: "Senegal",
    code: "SN",
    continent: "África",
    capital: "Dakar",
    difficulty: "hard",
  },

  // Oceanía
  {
    name: "Australia",
    code: "AU",
    continent: "Oceanía",
    capital: "Canberra",
    difficulty: "easy",
  },
  {
    name: "Nueva Zelanda",
    code: "NZ",
    continent: "Oceanía",
    capital: "Wellington",
    difficulty: "medium",
  },
  {
    name: "Fiji",
    code: "FJ",
    continent: "Oceanía",
    capital: "Suva",
    difficulty: "hard",
  },
  {
    name: "Samoa",
    code: "WS",
    continent: "Oceanía",
    capital: "Apia",
    difficulty: "hard",
  },

  // Países adicionales difíciles
  {
    name: "Líbano",
    code: "LB",
    continent: "Asia",
    capital: "Beirut",
    difficulty: "hard",
  },
  {
    name: "Camboya",
    code: "KH",
    continent: "Asia",
    capital: "Phnom Penh",
    difficulty: "hard",
  },
  {
    name: "Laos",
    code: "LA",
    continent: "Asia",
    capital: "Vientián",
    difficulty: "hard",
  },
  {
    name: "Myanmar",
    code: "MM",
    continent: "Asia",
    capital: "Naipyidó",
    difficulty: "hard",
  },
  {
    name: "Luxemburgo",
    code: "LU",
    continent: "Europa",
    capital: "Luxemburgo",
    difficulty: "hard",
  },
  {
    name: "Malta",
    code: "MT",
    continent: "Europa",
    capital: "La Valeta",
    difficulty: "hard",
  },
  {
    name: "Chipre",
    code: "CY",
    continent: "Europa",
    capital: "Nicosia",
    difficulty: "hard",
  },
  {
    name: "Montenegro",
    code: "ME",
    continent: "Europa",
    capital: "Podgorica",
    difficulty: "hard",
  },
  {
    name: "Bosnia y Herzegovina",
    code: "BA",
    continent: "Europa",
    capital: "Sarajevo",
    difficulty: "hard",
  },
  {
    name: "Moldavia",
    code: "MD",
    continent: "Europa",
    capital: "Chisináu",
    difficulty: "hard",
  },
  {
    name: "Mauricio",
    code: "MU",
    continent: "África",
    capital: "Port Louis",
    difficulty: "hard",
  },
  {
    name: "Ruanda",
    code: "RW",
    continent: "África",
    capital: "Kigali",
    difficulty: "hard",
  },
  {
    name: "Costa de Marfil",
    code: "CI",
    continent: "África",
    capital: "Yamoussoukro",
    difficulty: "hard",
  },
  {
    name: "Camerún",
    code: "CM",
    continent: "África",
    capital: "Yaundé",
    difficulty: "hard",
  },
  {
    name: "Gabón",
    code: "GA",
    continent: "África",
    capital: "Libreville",
    difficulty: "hard",
  },
  {
    name: "Namibia",
    code: "NA",
    continent: "África",
    capital: "Windhoek",
    difficulty: "hard",
  },
  {
    name: "Botsuana",
    code: "BW",
    continent: "África",
    capital: "Gaborone",
    difficulty: "hard",
  },
  {
    name: "Zambia",
    code: "ZM",
    continent: "África",
    capital: "Lusaka",
    difficulty: "hard",
  },
  {
    name: "Zimbabue",
    code: "ZW",
    continent: "África",
    capital: "Harare",
    difficulty: "hard",
  },
  {
    name: "Kirguistán",
    code: "KG",
    continent: "Asia",
    capital: "Biskek",
    difficulty: "hard",
  },
  {
    name: "Tayikistán",
    code: "TJ",
    continent: "Asia",
    capital: "Dusambé",
    difficulty: "hard",
  },
  {
    name: "Uzbekistán",
    code: "UZ",
    continent: "Asia",
    capital: "Taskent",
    difficulty: "hard",
  },
  {
    name: "Turkmenistán",
    code: "TM",
    continent: "Asia",
    capital: "Asjabad",
    difficulty: "hard",
  },
  ];

export function getCountriesByDifficulty(difficulty) {
  if (difficulty === "all") return countries;
  return countries.filter((c) => c.difficulty === difficulty);
}

export function getRandomCountries(count, difficulty = "all") {
  const pool = getCountriesByDifficulty(difficulty);
  const shuffled = [...pool];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
}

export function generateOptions(correctCountry, allCountries, count = 4) {
  const options = [correctCountry];
  const otherCountries = allCountries.filter(
    (c) => c.code !== correctCountry.code
  );

  while (options.length < count && otherCountries.length > 0) {
    const randomIndex = Math.floor(Math.random() * otherCountries.length);
    const country = otherCountries[randomIndex];
    options.push(country);
    otherCountries.splice(randomIndex, 1);
  }

  // Fisher-Yates shuffle algorithm
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return options;
}

export function getFlagUrl(countryCode) {
  return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
}
