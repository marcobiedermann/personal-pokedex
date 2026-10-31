import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import { PartyScreen } from './PartyScreen'
import { DetailScreen } from './DetailScreen'
import { BadgesScreen } from './BadgesScreen'
import { HalloweenContext } from './halloween'
import { CatchScreen } from './CatchScreen'
import { ScanScreen } from './ScanScreen'
import { Encounter } from './Encounter'
import { Haunt } from './Haunt'
import { playGhostWail, unlockAudio } from './spooky'

const OPENED_KEY = 'pokedex-opened'
const HALLOWEEN_KEY = 'pokedex-halloween'

function App() {
  const navigate = useNavigate()
  const [halloween, setHalloween] = useState(() => localStorage.getItem(HALLOWEEN_KEY) === '1')

  const toggleHalloween = () => {
    const next = !halloween
    localStorage.setItem(HALLOWEEN_KEY, next ? '1' : '0')
    if (next) {
      playGhostWail()
      navigator.vibrate?.([200, 100, 200])
    }
    setHalloween(next)
  }
  const [lidOpen, setLidOpen] = useState(() => sessionStorage.getItem(OPENED_KEY) === '1')
  // Skip the animation when restoring an already opened Pokédex
  const [instant, setInstant] = useState(lidOpen)

  useEffect(unlockAudio, [])

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
    <HalloweenContext value={halloween}>
    <div className={`device${halloween ? ' halloween' : ''}`}>
      <div className="body">
        <div className="top-bar">
          <button type="button" className="lens" onClick={toggleHalloween} aria-label="Halloween" />
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
              <Route path="/fangen" element={<CatchScreen />} />
              <Route path="/scan" element={<ScanScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          {halloween && <Haunt />}
          <Encounter active={lidOpen && halloween} />
        </div>
        <div className="controls">
          <span className="btn-round" />
          <button type="button" className="speaker" onClick={close} aria-label="Pokédex schließen">
            <i /><i /><i />
          </button>
          <a
            className="dpad"
            href="https://open.spotify.com/playlist/225VwKcRFlN0hBBMVW2Cul?si=359a1239fd6d4a48"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pokémon-Musik auf Spotify"
          />
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
    </HalloweenContext>
  )
}

export default App
