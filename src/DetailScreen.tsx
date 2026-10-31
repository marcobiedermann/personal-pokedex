import { Link, Navigate, useParams } from 'react-router'
import { POKEMON, STAT_LABELS, STAT_ORDER, TRAINER, calcStats } from './data'

const MAX_STAT = 200

export function DetailScreen() {
  const { id } = useParams()
  const p = POKEMON.find((x) => x.id === id)
  if (!p) return <Navigate to="/" replace />
  const stats = calcStats(p)

  return (
    <div className="page detail">
      <Link to="/" className="back">‹ Zurück</Link>
      <header className="detail-head" style={{ background: `radial-gradient(circle, ${p.color}aa, transparent 70%)` }}>
        <img src={p.image} alt={p.name} />
      </header>
      <div className="title-row">
        <h1>{p.name}</h1>
        <span className="nr">Nr. {String(p.number).padStart(3, '0')}</span>
      </div>
      <p className="species">{p.species}</p>
      <div className="chips">
        {p.types.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
        <span className="chip level">Lv. {p.level}</span>
      </div>

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
            <span>{m.name}</span>
            <span className="chip small">{m.type}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
