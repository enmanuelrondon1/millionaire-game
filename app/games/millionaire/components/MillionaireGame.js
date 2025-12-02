//app/games/millionaire/components/MillionaireGame.js
'use client';

import { useState, useEffect } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { fetchTriviaQuestions } from '../services/triviaService';
import { DEFAULT_QUESTIONS } from '../services/questions';
import GameHeader from './GameHeader';
import QuestionCard from './QuestionCard';
import GameOverScreen from './GameOverScreen';
import WinScreen from './WinScreen';
import PrizeLadder from './PrizeLadder';
import DifficultyScreen from './DifficultyScreen';
import Link from 'next/link';

export default function MillionaireGame() {
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gameMode, setGameMode] = useState(null); // null, 'simple', 'medium', 'hard'
  const game = useGameLogic(questions);

  useEffect(() => {
    if (gameMode) {
      loadQuestions(gameMode);
    }
  }, [gameMode]);

  const loadQuestions = async (mode) => {
    setIsLoading(true);
    setError(null);
    try {
      if (mode === 'simple') {
        const apiQuestions = await fetchTriviaQuestions(9, 'easy');
        setQuestions(apiQuestions);
      } else if (mode === 'medium' || mode === 'hard') {
        const apiQuestions = await fetchTriviaQuestions(9, mode);
        setQuestions(apiQuestions);
      }
    } catch (err) {
      console.error('Error loading questions:', err);
      setError(`No se pudieron cargar preguntas ${mode}. Usando preguntas por defecto.`);
      
      // Usa preguntas por defecto según el modo
      if (mode === 'simple') {
        setQuestions(DEFAULT_QUESTIONS);
      } else {
        setQuestions(DEFAULT_QUESTIONS);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewGame = () => {
    setGameMode(null);
    game.resetGame();
  };

  // Pantalla de selección de dificultad
  if (!gameMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-4">
        <DifficultyScreen 
          onSelectDifficulty={setGameMode}
          isLoading={isLoading}
        />
        <div className="mt-8 w-full max-w-md text-center">
          <Link href="/" className="btn-secondary w-full sm:w-auto">
            Volver al Menú
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-300 mb-4"></div>
          <p className="text-white text-xl font-bold">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
        {/* Header */}
        <GameHeader userMoney={game.userMoney} />

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-yellow-600 text-white p-3 rounded-lg text-center text-sm">
            {error}
          </div>
        )}

        {/* Main Content */}
        {!game.gameOver && !game.gameWon ? (
          <>
            <QuestionCard
              question={questions[game.currentQuestion].question}
              currentQuestionNum={game.currentQuestion + 1}
              totalQuestions={questions.length}
              answers={questions[game.currentQuestion].answers}
              selectedAnswer={game.selectedAnswer}
              answered={game.answered}
              timeLeft={game.timeLeft}
              timerActive={game.timerActive}
              used5050={game.used5050}
              usedFriend={game.usedFriend}
              usedPublic={game.usedPublic}
              availableAnswers={game.availableAnswers}
              friendAdvice={game.friendAdvice}
              publicVotes={game.publicVotes}
              onAnswer={game.handleAnswer}
              on5050={game.use5050}
              onFriend={game.useFriendLifeline}
              onPublic={game.usePublicLifeline}
              correctAnswer={questions[game.currentQuestion].correct}
            />
          </>
        ) : game.gameWon ? (
          <WinScreen onReset={handleNewGame} />
        ) : (
          <GameOverScreen
            userMoney={game.userMoney}
            safeAmount={game.getSafeAmount()}
            timeUp={game.timeLeft === 0}
            onReset={handleNewGame}
          />
        )}

        {/* Prize Ladder */}
        <PrizeLadder
          questions={questions}
          currentQuestion={game.currentQuestion}
          gameOver={game.gameOver}
          gameWon={game.gameWon}
        />
      </div>
    </div>
  );
}