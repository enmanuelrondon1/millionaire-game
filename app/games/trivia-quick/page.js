// app/games/trivia-quick/page.js
'use client';

import { useEffect, useState } from 'react';
import TriviaGame from './components/TriviaGame';
import { fetchTriviaQuestions } from './services/triviaService';

export default function TriviaQuickPage() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const loadedQuestions = await fetchTriviaQuestions(10);
        setQuestions(loadedQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--color-dark-bg)] via-[#1E3A8A] to-[var(--color-dark-bg)] flex items-center justify-center">
        <div className="text-center">
          <div
            className="inline-block w-16 h-16 rounded-full animate-spin mb-4"
            style={{
              background: 'conic-gradient(var(--color-primary), var(--color-secondary), var(--color-accent))',
              WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 70%)',
              maskImage: 'radial-gradient(circle, transparent 40%, black 70%)'
            }}
          />
          <p className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Cargando preguntas...
          </p>
        </div>
      </div>
    );
  }

  return <TriviaGame questions={questions} />;
}
