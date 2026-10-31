import { Link } from 'react-router'
import { PARTY_SIZE, POKEMON, TRAINER, calcStats } from './data'

export function PartyScreen() {
  const slots = Array.from({ length: PARTY_SIZE }, (_, i) => POKEMON[i])

  return (
    <div className="page">
      <header className="page-header">
        <h1>Team</h1>
        <p>Trainer {TRAINER}</p>
      </header>
      <ul className="party">
        {slots.map((p, i) =>
          p ? (
            <li key={p.id}>
              <Link to={`/pokemon/${p.id}`} className="slot filled">
                <img src={p.image} alt="" className="slot-img" />
                <span className="slot-info">
                  <span className="slot-name">{p.nickname}</span>
                  <span className="slot-species">{p.name}</span>
                  <span className="slot-level">Lv. {p.level}</span>
                  <span className="hp-row">
                    <span className="hp-label">KP</span>
                    <span className="hp-bar"><span style={{ width: '100%' }} /></span>
                  </span>
                  <span className="hp-text">
                    {calcStats(p).kp} / {calcStats(p).kp}
                  </span>
                </span>
              </Link>
            </li>
          ) : (
            <li key={`empty-${i}`}>
              <div className="slot empty">
                <span className="empty-ball" />
                <span className="slot-name">—</span>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  )
}
