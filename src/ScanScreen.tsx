import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { CameraView } from './CameraView'
import pikachuImg from './assets/pokemon/25.png'
import evoliImg from './assets/pokemon/133.png'
import gengarImg from './assets/pokemon/94.png'
import nebulakImg from './assets/pokemon/92.png'
import irrbisImg from './assets/pokemon/710.png'
import mimikyuImg from './assets/pokemon/778.png'
import alpolloImg from './assets/pokemon/93.png'
import snorlaxImg from './assets/pokemon/143.png'

interface Entry {
  name: string
  type: string
  level: string
  text: string
  image: string
}

const ENTRIES: Entry[] = [
  { name: 'Wildes Pikachu', type: 'Typ: Elektro / Party', level: 'Lv. 6', text: 'Ein Mensch im Pikachu-Kostüm. Lädt seine Wangen mit Süßigkeiten auf und entlädt sie auf der Tanzfläche.', image: pikachuImg },
  { name: 'Wildes Evoli', type: 'Typ: Normal / Party', level: 'Lv. 31', text: 'Entwickelt sich je nach Laune in jede Richtung. Besonders gern in Richtung Buffet.', image: evoliImg },
  { name: 'Wildes Partytier', type: 'Typ: Tanz / Spaß', level: 'Lv. 28', text: 'Taucht ab Mitternacht an der Tanzfläche auf. Schwäche: Kater am nächsten Morgen.', image: nebulakImg },
  { name: 'Süßigkeiten-Jäger', type: 'Typ: Zucker', level: 'Lv. 9', text: 'Sammelt Süßes, sonst gibt es Saures. Wird von Schokolade sofort angelockt.', image: irrbisImg },
  { name: 'Verkleidetes Menschlein', type: 'Typ: Normal / Geist', level: 'Lv. 33', text: 'Hat sich als Pokémon verkleidet. Die Verwandlung ist erstaunlich überzeugend.', image: mimikyuImg },
  { name: 'Wilder Gruselfan', type: 'Typ: Geist / Spaß', level: 'Lv. 41', text: 'Lacht über jeden Schreck. Seine Spezialattacke: Selfie mit Kürbis.', image: gengarImg },
  { name: 'Snorlax-Typ', type: 'Typ: Normal', level: 'Lv. 50', text: 'Liegt am liebsten auf dem Sofa. Wacht nur auf, wenn es Pizza gibt.', image: snorlaxImg },
  { name: 'Wilder Trainer', type: 'Typ: Kampf / Freundschaft', level: 'Lv. 30', text: 'Will der Allerbeste werden. Wartet nur noch auf den nächsten Drink.', image: alpolloImg },
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
        {entry && <div className="scan-sprite"><img src={entry.image} alt={entry.name} /></div>}
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
        {scanning ? 'Scanne …' : entry ? '🔍 Nochmal scannen' : '🔍 Scannen'}
      </button>
    </div>
  )
}
