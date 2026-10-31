import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { CameraView } from './CameraView'

interface Entry {
  name: string
  type: string
  level: string
  text: string
}

const ENTRIES: Entry[] = [
  { name: 'Wildes Partytier', type: 'Typ: Tanz / Spaß', level: 'Lv. 28', text: 'Taucht ab Mitternacht an der Tanzfläche auf. Schwäche: Kater am nächsten Morgen.' },
  { name: 'Süßigkeiten-Jäger', type: 'Typ: Zucker', level: 'Lv. 9', text: 'Sammelt Süßes, sonst gibt es Saures. Wird von Schokolade sofort angelockt.' },
  { name: 'Verkleidetes Menschlein', type: 'Typ: Normal / Geist', level: 'Lv. 33', text: 'Hat sich als Pokémon verkleidet. Die Verwandlung ist erstaunlich überzeugend.' },
  { name: 'Wilder Gruselfan', type: 'Typ: Geist / Spaß', level: 'Lv. 41', text: 'Lacht über jeden Schreck. Seine Spezialattacke: Selfie mit Kürbis.' },
  { name: 'Snorlax-Typ', type: 'Typ: Normal', level: 'Lv. 50', text: 'Liegt am liebsten auf dem Sofa. Wacht nur auf, wenn es Pizza gibt.' },
  { name: 'Wilder Trainer', type: 'Typ: Kampf / Freundschaft', level: 'Lv. 30', text: 'Will der Allerbeste werden. Wartet nur noch auf den nächsten Drink.' },
]

const pickEntry = (last: number) => {
  const i = Math.floor(Math.random() * ENTRIES.length)
  return i === last ? (i + 1) % ENTRIES.length : i
}

export function ScanScreen() {
  const [scanning, setScanning] = useState(false)
  const [index, setIndex] = useState<number | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const scan = () => {
    if (scanning) return
    setScanning(true)
    setIndex(null)
    timer.current = window.setTimeout(() => {
      setIndex((last) => pickEntry(last ?? -1))
      setScanning(false)
      navigator.vibrate?.(100)
    }, 2200)
  }

  const entry = index === null ? null : ENTRIES[index]

  return (
    <div className="page scan">
      <Link to="/" className="back">‹ Zurück</Link>
      <CameraView facing="environment">
        <div className={`reticle${scanning ? ' scanning' : ''}`}>
          <i /><i /><i /><i />
          <span className="scan-line" />
        </div>
      </CameraView>
      {entry && (
        <div className="scan-result">
          <strong>{entry.name}</strong>
          <span>{entry.type} · {entry.level}</span>
          <p>{entry.text}</p>
        </div>
      )}
      <button type="button" className="cry-btn" onClick={scan} disabled={scanning}>
        {scanning ? 'Scanne …' : '🔍 Scannen'}
      </button>
    </div>
  )
}
