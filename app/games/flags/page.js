// app/games/flags/page.js
import FlagsGame from './components/FlagsGame';

export const metadata = {
  title: 'Quiz de Banderas - Millionaire Games',
  description: 'Pon a prueba tus conocimientos de geografía mundial',
};

export default function FlagsPage() {
  return <FlagsGame />;
}