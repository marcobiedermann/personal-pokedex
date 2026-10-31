import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { PartyScreen } from './PartyScreen'
import { DetailScreen } from './DetailScreen'

const OPENED_KEY = 'pokedex-opened'

function App() {
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
        <div className="controls">
          <button type="button" className="btn-round" onClick={close} aria-label="Pokédex schließen">
            <span>Schließen</span>
          </button>
          <div className="speaker">
            <i /><i /><i />
          </div>
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
