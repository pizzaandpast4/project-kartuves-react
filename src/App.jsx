import { useState } from 'react'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { randomWord } from './components/wordgenerator/WordGenerator'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          {randomWord}
        </p>
      </main>
      <Footer />
    </>
  )
}

export default App
