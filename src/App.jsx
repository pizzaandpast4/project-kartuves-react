import { useState, useEffect } from 'react'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { randomWord } from './components/wordgenerator/WordGenerator'
import './App.css'


function App() {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  function startNewGame() {
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setGameWon(false);
  }

  return (
    <>
      <Header />
      <main>
        <div>
          {word}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
