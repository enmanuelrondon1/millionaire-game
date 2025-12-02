// app/games/wordle/page.js
import WordleGame from './components/WordleGame';

export const metadata = {
  title: 'Wordle - Adivina la Palabra',
  description: 'Juega Wordle y adivina la palabra en 6 intentos',
};

export default function WordlePage() {
  return <WordleGame />;
}