import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { TRAINER } from './data'
import { badgeStore } from './store'
import { useBadges } from './useParty'

const TAPS_TO_UNLOCK = 3

export function BadgesScreen() {
  const badges = useBadges()
  const earned = badges.filter((b) => b.earned).length
  const taps = useRef<Record<string, number>>({})
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null)

  const tap = (name: string) => {
    taps.current[name] = (taps.current[name] ?? 0) + 1
    if (taps.current[name] >= TAPS_TO_UNLOCK) {
      badgeStore.add(name)
      setJustUnlocked(name)
      navigator.vibrate?.(200)
    }
  }

  return (
    <div className="page">
      <Link to="/" className="back">‹ Zurück</Link>
      <header className="page-header">
        <h1>Orden</h1>
        <p>{TRAINER} · {earned} von {badges.length}</p>
      </header>
      <ul className="badges">
        {badges.map((b) => (
          <li key={b.name}>
            <button
              type="button"
              className={`badge${b.earned ? '' : ' locked'}${justUnlocked === b.name ? ' unlocked' : ''}`}
              onClick={() => !b.earned && tap(b.name)}
            >
              <span className="badge-icon" style={{ background: b.earned ? b.color : undefined }}>
                {b.earned ? b.symbol : '?'}
              </span>
              <span className="badge-name">{b.earned ? b.name : '???'}</span>
              <span className="badge-leader">{b.earned ? b.leader : ''}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
