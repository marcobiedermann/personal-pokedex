import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { PartyScreen } from './PartyScreen'
import { DetailScreen } from './DetailScreen'

const OPENED_KEY = 'pokedex-opened'

function App() {
  const [opened, setOpened] = useState(() => sessionStorage.getItem(OPENED_KEY) === '1')
  const [lidOpen, setLidOpen] = useState(opened)

  const open = () => {
    if (lidOpen) return
    setLidOpen(true)
    setTimeout(() => {
      sessionStorage.setItem(OPENED_KEY, '1')
      setOpened(true)
    }, 1100)
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
          <span className="btn-round" />
          <div className="speaker">
            <i /><i /><i />
          </div>
          <span className="dpad" />
        </div>
      </div>
      {!opened && (
        <button
          type="button"
          className={`lid${lidOpen ? ' open' : ''}`}
          onClick={open}
          aria-label="Pokédex öffnen"
        >
          <span className="lid-face">
            <span className="lid-lens" />
            <span className="lid-title">POKÉDEX</span>
            <span className="lid-hint">Tippen zum Öffnen</span>
          </span>
        </button>
      )}
    </div>
  )
}

export default App
