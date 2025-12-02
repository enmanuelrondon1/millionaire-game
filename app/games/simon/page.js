// app/games/simon/page.js
import SimonGame from './components/SimonGame';

export const metadata = {
  title: 'Simon Dice - Millionaire Games',
  description: 'Pon a prueba tu memoria con el clásico juego Simon Dice',
};

export default function SimonPage() {
  return <SimonGame />;
}