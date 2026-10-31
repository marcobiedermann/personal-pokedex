import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { STAT_LABELS, STAT_ORDER, TRAINER, calcStats, getParty } from './data'
import { useHalloween } from './halloween'

const MAX_STAT = 200

function pickCry(cries: string[], last: number): number {
  const i = Math.floor(Math.random() * cries.length)
  // Avoid repeating the same cry twice in a row
  return cries.length > 1 && i === last ? (i + 1) % cries.length : i
}

export function DetailScreen() {
  const { id } = useParams()
  const lastCry = useRef(-1)
  const audio = useRef<HTMLAudioElement | null>(null)

  // Stop any playing sound when leaving the page
  useEffect(() => () => audio.current?.pause(), [])

  const play = (src: string) => {
    audio.current?.pause()
    audio.current = new Audio(src)
    audio.current.play()
  }
  const halloween = useHalloween()
  const p = getParty(halloween).find((x) => x.id === id)
  if (!p) return <Navigate to="/" replace />
  const stats = calcStats(p)

  return (
    <div className="page detail">
      <Link to="/" className="back">‹ Zurück</Link>
      <header className="detail-head" style={{ background: `radial-gradient(circle, ${p.color}aa, transparent 70%)` }}>
        <img src={p.image} alt={p.nickname} />
      </header>
      <div className="title-row">
        <h1>{p.nickname}</h1>
        <span className="nr">Nr. {String(p.number).padStart(3, '0')}</span>
      </div>
      <p className="species">{p.name} · {p.species}</p>
      <div className="chips">
        {p.types.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
        <span className="chip level">Lv. {p.level}</span>
      </div>

      {p.cries.length > 0 && (
        <button type="button" className="cry-btn" onClick={() => {
            lastCry.current = pickCry(p.cries, lastCry.current)
            play(p.cries[lastCry.current])
          }}>
          🔊 {p.name} rufen
        </button>
      )}

      <p className="desc">{p.description}</p>

      <dl className="facts">
        <div><dt>Größe</dt><dd>{p.height}</dd></div>
        <div><dt>Gewicht</dt><dd>{p.weight}</dd></div>
        <div><dt>Trainer</dt><dd>{TRAINER}</dd></div>
      </dl>

      <h2>Werte</h2>
      <ul className="stats">
        {STAT_ORDER.map((k) => (
          <li key={k}>
            <span className="stat-label">{STAT_LABELS[k]}</span>
            <span className="stat-value">{stats[k]}</span>
            <span className="stat-bar">
              <span style={{ width: `${Math.min(100, (stats[k] / MAX_STAT) * 100)}%` }} />
            </span>
          </li>
        ))}
      </ul>

      <h2>Attacken</h2>
      <ul className="moves">
        {p.moves.map((m) => (
          <li key={m.name}>
            {m.sound ? (
              <button type="button" className="move playable" onClick={() => play(m.sound!)}>
                <span>{m.name} 🔊</span>
                <span className="chip small">{m.type}</span>
              </button>
            ) : (
              <div className="move">
                <span>{m.name}</span>
                <span className="chip small">{m.type}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
