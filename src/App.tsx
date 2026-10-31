import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import { PartyScreen } from './PartyScreen'
import { DetailScreen } from './DetailScreen'
import { BadgesScreen } from './BadgesScreen'

const OPENED_KEY = 'pokedex-opened'

function App() {
  const navigate = useNavigate()
  const [lidOpen, setLidOpen] = useState(() => sessionStorage.getItem(OPENED_KEY) === '1')
  // Skip the animation when restoring an already opened Pokédex
  const [instant, setInstant] = useState(lidOpen)

  useEffect(() => {
    const id = requestAnimationFrame(() => setInstant(false))
    return () => cancelAnimationFrame(id)
  }, [])

  const open = () => {
    sessionStorage.setItem(OPENED_KEY, '1')
    setLidOpen(true)
  }

  const close = () => {
    sessionStorage.removeItem(OPENED_KEY)
    setLidOpen(false)
    navigate('/')
  }

  return (
    <div className="device">
      <div className="body">
        <div className="top-bar">
          <div className="lens" />
          <span className="led red" />
          <span className="led yellow" />
          <span className="led green" />
        </div>
        <div className="screen-frame">
          <div className="screen">
            <Routes>
              <Route path="/" element={<PartyScreen />} />
              <Route path="/pokemon/:id" element={<DetailScreen />} />
              <Route path="/orden" element={<BadgesScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
        <div className="controls">
          <span className="btn-round" />
          <button type="button" className="speaker" onClick={close} aria-label="Pokédex schließen">
            <i /><i /><i />
          </button>
          <span className="dpad" />
        </div>
      </div>
      <button
        type="button"
        className={`lid${lidOpen ? ' open' : ''}${instant ? ' instant' : ''}`}
        onClick={open}
        aria-label="Pokédex öffnen"
        tabIndex={lidOpen ? -1 : 0}
      >
        <span className="lid-face">
          <span className="lid-lens" />
          <span className="lid-title">POKÉDEX</span>
          <span className="lid-hint">Tippen zum Öffnen</span>
        </span>
      </button>
    </div>
  )
}

export default App
