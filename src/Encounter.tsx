import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { PARTY_SIZE, POKEMON, pickWild, type Pokemon } from './data'
import { playStinger } from './spooky'
import { caughtStore, useStore } from './store'

const delay = (min: number, max: number) => (min + Math.random() * (max - min)) * 1000

export function Encounter({ active }: { active: boolean }) {
  const caught = useStore(caughtStore)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [wild, setWild] = useState<Pokemon | null>(null)
  const [round, setRound] = useState(0)

  const full = POKEMON.length + caught.length >= PARTY_SIZE
  const enabled = active && !full && pathname !== '/fangen' && !wild

  useEffect(() => {
    if (!enabled) return
    const id = window.setTimeout(() => {
      const next = pickWild(caught)
      if (!next) return
      setWild(next)
      playStinger()
      navigator.vibrate?.(150)
    }, delay(30, 60))
    return () => window.clearTimeout(id)
  }, [enabled, caught, round])

  if (!wild || !active) return null

  const dismiss = () => {
    setWild(null)
    setRound((r) => r + 1)
  }

  const fight = () => {
    setWild(null)
    navigate(`/fangen?p=${wild.id}`)
  }

  return (
    <div className="encounter" role="alertdialog">
      <img src={wild.image} alt="" />
      <div className="encounter-text">
        <strong>Ein wildes {wild.name} erscheint!</strong>
        <span>Pikachu, ich wähle dich!</span>
      </div>
      <div className="encounter-actions">
        <button type="button" onClick={fight}>Kampf!</button>
        <button type="button" className="ghost-btn" onClick={dismiss}>Flucht</button>
      </div>
    </div>
  )
}
