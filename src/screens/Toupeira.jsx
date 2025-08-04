import { useEffect, useState, useRef } from 'react'
import { Button } from '../components/Button'
import coral1 from '../assets/coral1.png'
import coral2 from '../assets/coral2.png'
import coral3 from '../assets/coral3.png'
import { Link } from 'react-router-dom';

const coralImages = [coral1, coral2, coral3]
const WINNING_SCORE = 5
const INITIAL_TIME = 30

export default function Mole() {
  const [grid, setGrid] = useState(Array(9).fill(null))
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)
  const [activeIndex, setActiveIndex] = useState(null)
  const [flashIndex, setFlashIndex] = useState(null)
  const [gameRunning, setGameRunning] = useState(false)

  const gameLoopTimeout = useRef(null)

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  useEffect(() => {
    if (timeLeft > 0) {
      setGameRunning(true)
      runGameLoop()
    }
    return () => {
      setGameRunning(false)
      clearTimeout(gameLoopTimeout.current)
    }
  }, [timeLeft])

  const runGameLoop = () => {
    if (!gameRunning || timeLeft <= 0) return

    const waitBefore = randomBetween(500, 1500)
    gameLoopTimeout.current = setTimeout(() => {
      if (!gameRunning || timeLeft <= 0) return

      const idx = Math.floor(Math.random() * 9)
      const img = coralImages[Math.floor(Math.random() * coralImages.length)]
      const newGrid = Array(9).fill(null)
      newGrid[idx] = img
      setGrid(newGrid)
      setActiveIndex(idx)

      const visibleFor = randomBetween(1200, 3000)
      gameLoopTimeout.current = setTimeout(() => {
        setGrid(Array(9).fill(null))
        setActiveIndex(null)

        runGameLoop()
      }, visibleFor)
    }, waitBefore)
  }

  const handleClick = (i) => {
    if (timeLeft <= 0) return

    if (i === activeIndex) {
      setScore(s => s + 1)
      setGrid(Array(9).fill(null))
      setActiveIndex(null)
      setFlashIndex(i)

      clearTimeout(gameLoopTimeout.current) // cancela o timeout de sumir
      setTimeout(() => {
        setFlashIndex(null)
        runGameLoop()
      }, 200)
    } else {
      setScore(s => Math.max(0, s - 1))
    }
  }

  const restart = () => {
    clearTimeout(gameLoopTimeout.current)
    setScore(0)
    setTimeLeft(INITIAL_TIME)
    setGrid(Array(9).fill(null))
    setActiveIndex(null)
    setFlashIndex(null)
    setGameRunning(true)
    runGameLoop()
  }

  return (
    <div className="quiz-container">
      <h1>🪸 Coral-Sol Mole</h1>
      <p>Tempo restante: {timeLeft}s</p>
      <p>Pontuação: {score}</p>

      <div
        className="options-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gap: '10px',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        {grid.map((img, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            onDragStart={e => e.preventDefault()}
            className={flashIndex === i ? 'flash' : ''}
            style={{
              width: '100px',
              height: '100px',
              background: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            {img && <img src={img} alt="Coral" style={{ maxWidth: '80px', maxHeight: '80px', pointerEvents: 'none' }} />}
          </div>
        ))}
      </div>

      {timeLeft <= 0 && (
        <div style={{ marginTop: '1rem' }}>
          {score >= WINNING_SCORE ? (
            <p>🎉 Você venceu com {score} pontos!</p>
          ) : (
            <p>❌ Você perdeu! Fez apenas {score} pontos (mínimo {WINNING_SCORE})</p>
          )}
          <Button onClick={restart}>🔁 Jogar Novamente</Button>
        </div>
      )}
      <div style={{ marginTop: '2rem' }}>
        <Link to="/">
          <button className="default">Voltar</button>
        </Link>
      </div>
    </div>
  )
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
