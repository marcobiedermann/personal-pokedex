import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { pickWild } from './data'
import { caughtStore, useStore } from './store'

type Phase = 'idle' | 'throwing' | 'caught' | 'broke' | 'fled'

const MAX_TRIES = 3
const CATCH_CHANCE = 0.55

const rollCatch = () => Math.random() < CATCH_CHANCE

export function CatchScreen() {
  const caught = useStore(caughtStore)
  const [params] = useSearchParams()
  const [wild, setWild] = useState(() => pickWild(caught, params.get('p')))
  const [phase, setPhase] = useState<Phase>('idle')
  const [tries, setTries] = useState(0)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const throwBall = () => {
    if (!wild || phase === 'throwing') return
    setPhase('throwing')
    timer.current = window.setTimeout(() => {
      if (rollCatch()) {
        caughtStore.add(wild.id)
        navigator.vibrate?.([100, 60, 100])
        setPhase('caught')
        return
      }
      const used = tries + 1
      setTries(used)
      setPhase(used >= MAX_TRIES ? 'fled' : 'broke')
    }, 2200)
  }

  const next = () => {
    setWild(pickWild(caught))
    setTries(0)
    setPhase('idle')
  }

  if (!wild) {
    return (
      <div className="page catch">
        <Link to="/" className="back">‹ Zurück</Link>
        <p className="catch-msg">Du hast alle wilden Pokémon gefangen! Dein Team ist komplett.</p>
      </div>
    )
  }

  const messages: Record<Phase, string> = {
    idle: `Ein wildes ${wild.name} erscheint!`,
    throwing: 'Pokéball geworfen …',
    caught: `Gotcha! ${wild.name} wurde gefangen!`,
    broke: `Oh nein! ${wild.name} ist ausgebrochen!`,
    fled: `${wild.name} ist geflohen!`,
  }

  return (
    <div className="page catch">
      <Link to="/" className="back">‹ Zurück</Link>
      <div className={`wild${phase === 'caught' ? ' hidden' : ''}${phase === 'throwing' ? ' sucked' : ''}`}>
        <img src={wild.image} alt={wild.name} />
      </div>
      {(phase === 'throwing' || phase === 'caught') && (
        <div className={`ball${phase === 'throwing' ? ' shaking' : ''}`} aria-hidden="true" />
      )}
      <p className="catch-msg">{messages[phase]}</p>
      <p className="catch-sub">{wild.name} · Lv. {wild.level} · Versuche: {tries} / {MAX_TRIES}</p>

      {(phase === 'idle' || phase === 'broke') && (
        <button type="button" className="cry-btn" onClick={throwBall}>Pokéball werfen</button>
      )}
      {phase === 'caught' && (
        <Link to={`/pokemon/${wild.id}`} className="cry-btn link-btn">Zum Team-Eintrag ›</Link>
      )}
      {phase === 'fled' && (
        <button type="button" className="cry-btn" onClick={next}>Anderes Pokémon suchen</button>
      )}
    </div>
  )
}
