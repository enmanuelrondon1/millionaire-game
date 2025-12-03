// app/games/math/page.js
import MathGame from './components/MathGame';

export const metadata = {
  title: 'Matemáticas Rápidas - Millionaire Games',
  description: 'Entrena tu mente con operaciones matemáticas',
};

export default function MathPage() {
  return <MathGame />;
}