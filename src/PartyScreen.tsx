import { Link } from 'react-router'
import { useHalloween } from './halloween'
import { useBadges, useParty } from './useParty'
import ashImg from './assets/ash.png'
import { PARTY_SIZE, TRAINER, TRAINER_INFO, calcStats } from './data'

export function PartyScreen() {
  const party = useParty()
  const badges = useBadges()
  const halloween = useHalloween()
  const slots = Array.from({ length: PARTY_SIZE }, (_, i) => party[i])

  return (
    <div className="page">
      <header className="page-header">
        <h1>Team</h1>
        <p>Trainer {TRAINER}</p>
      </header>
      <div className="trainer-card">
        <img src={ashImg} alt="Avatar von Ash" className="avatar" />
        <dl className="facts trainer">
          {TRAINER_INFO.map((i) => (
            <div key={i.label}><dt>{i.label}</dt><dd>{i.value}</dd></div>
          ))}
        </dl>
      </div>
      <ul className="party">
        {slots.map((p, i) =>
          p ? (
            <li key={p.id}>
              <Link to={`/pokemon/${p.id}`} className="slot filled">
                <img src={p.image} alt="" className="slot-img" />
                <span className="slot-info">
                  <span className="slot-name">{p.nickname}</span>
                  {p.nickname !== p.name && <span className="slot-species">{p.name}</span>}
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
      <Link to="/orden" className="badges-link">
        <span>Orden</span>
        <span>{badges.filter((b) => b.earned).length} / {badges.length} ›</span>
      </Link>
      {halloween && (
        <div className="tools">
          <Link to="/fangen" className="tool"><span>🎯</span>Fangen</Link>
          <Link to="/scan" className="tool"><span>🔍</span>Scan</Link>
        </div>
      )}
    </div>
  )
}
