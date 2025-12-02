// app/games/memory/page.js
import MemoryGame from './components/MemoryGame';

export const metadata = {
  title: 'Memory - Juego de Memoria',
  description: 'Juega Memory y encuentra todos los pares',
};

export default function MemoryPage() {
  return <MemoryGame />;
}