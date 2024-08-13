import { useState } from 'react'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
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
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </main>
      <Footer />
    </>
  )
}

export default App
