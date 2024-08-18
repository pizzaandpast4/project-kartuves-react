import { useState, useEffect } from 'react'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { randomWord } from './components/wordgenerator/WordGenerator'
import './App.css'


const App = () => { 
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [lives, setLives] = useState(6);

  useEffect(() => {
    startNewGame();
  }, []);

   useEffect(() => {
    if (wrongGuesses >= lives) {
      setGameOver(true);
      setLosses(losses + 1);
    }
    if (word.split('').every(letter => guessedLetters.includes(letter))) {
      setGameWon(true);
      setWins(wins + 1);
    }
  }, [wrongGuesses, guessedLetters, word, lives, losses, wins]);

  const startNewGame = () => {
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setGameWon(false);
    setLives(6);
  }

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter) && !gameOver && !gameWon) {
      setGuessedLetters((prev) => [...prev, letter]);
      if (!word.includes(letter)) {
        setWrongGuesses((prev) => prev + 1);
      }
    }
  };

  const checkGameStatus = () => {
    if (wrongGuesses >= lives) {
      setGameOver(true);
      setLosses((prev) => prev + 1);
    }
    if (word.split('').every(letter => guessedLetters.includes(letter))) {
      setGameWon(true);
      setWins((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (guessedLetters.length > 0) {
      checkGameStatus();
    }
  }, [guessedLetters, wrongGuesses]); 

  return (
    <>
      <Header />
      <main>
        <div>
          {word}
        </div>

        <div>
          
        </div>

        <div>
          <p>Lives: {lives - wrongGuesses}</p>
          <p>Wins: {wins} | Losses: {losses}</p>
      </div>
      </main>
      <Footer />
    </>
  )
}

export default App
