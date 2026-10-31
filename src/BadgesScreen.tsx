import { Link } from 'react-router'
import { BADGES, TRAINER } from './data'

export function BadgesScreen() {
  const earned = BADGES.filter((b) => b.earned).length

  return (
    <div className="page">
      <Link to="/" className="back">‹ Zurück</Link>
      <header className="page-header">
        <h1>Orden</h1>
        <p>{TRAINER} · {earned} von {BADGES.length}</p>
      </header>
      <ul className="badges">
        {BADGES.map((b) => (
          <li key={b.name} className={`badge${b.earned ? '' : ' locked'}`}>
            <span className="badge-icon" style={{ background: b.earned ? b.color : undefined }}>
              {b.earned ? b.symbol : '?'}
            </span>
            <span className="badge-name">{b.earned ? b.name : '???'}</span>
            <span className="badge-leader">{b.earned ? b.leader : ''}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
