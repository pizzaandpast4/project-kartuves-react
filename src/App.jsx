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
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
  startNewGame();
}, []);

useEffect(() => {
    if (gameStarted) { 
      if (wrongGuesses >= lives) {
        setGameOver(true);
        setLosses((prev) => prev + 1);
      }
      if (word.split('').every((letter) => guessedLetters.includes(letter))) {
        setGameWon(true);
        setWins((prev) => prev + 1);
      }
    }
  }, [wrongGuesses, guessedLetters, word, lives, gameStarted]);

  const startNewGame = () => {
    setWord(randomWord());
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setGameWon(false);
    setLives(6);
    setGameStarted(true);
  }

  const handleGuess = (letter) => {
  if (!guessedLetters.includes(letter) && !gameOver && !gameWon) {
    setGuessedLetters((prev) => [...prev, letter]);
    if (!word.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
    }
  }
};

   const handleKeyPress = (event) => {
    const letter = event.key.toLowerCase();
    if (/[a-z]/.test(letter)) {
      handleGuess(letter);
    }
  };

   const renderWord = () => {
    return word.split('').map((letter, index) => (
      <span key={index} style={{ margin: '0 5px' }}>
        {guessedLetters.includes(letter) ? letter : '_'}
      </span>
    ));
  };

   const renderKeyboard = () => {
    return Array.from('abcdefghijklmnopqrstuvwxyz').map((letter) => (
      <button
        key={letter}
        onClick={() => handleGuess(letter)}
        disabled={guessedLetters.includes(letter) || gameOver || gameWon}
        style={{
          backgroundColor: guessedLetters.includes(letter) && !word.includes(letter) ? 'red' : 
                          guessedLetters.includes(letter) && word.includes(letter) ? 'green' : '',
        }}
      >
        {letter}
      </button>
    ));
  };

useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [guessedLetters, gameOver, gameWon]);

  const renderHangman = () => {
    return (
      <img
        src={`./src/assets/img/hangman-${wrongGuesses}.jpg`}
        alt={`hangman stage ${wrongGuesses}`}
        style={{ width: '200px', margin: '10px' }}
      />
    );
  };

  return (
    <>
      <Header />
      <main>
        <div>
          <p>Lives left: {lives - wrongGuesses}</p>
          <p>Lives lost: {wrongGuesses}</p>
          <p>Wins: {wins} | Losses: {losses}</p>
        </div>
      {renderHangman()}
      <div style={{ fontSize: '24px', margin: '20px' }}>
        {renderWord()}
      </div>
      <div>
        {renderKeyboard()}
      </div>
        {gameOver && (
        <div>
          <h2>You lost! The word was: {word}</h2>
          <button onClick={startNewGame}>Start a new game</button>
        </div>
      )}
        {gameWon && (
        <div>
          <h2>You won! The word was: {word}</h2>
          <button onClick={startNewGame}>Start a new game</button>
        </div>
      )}
      </main>
      <Footer />
    </>
  )
}

export default App
