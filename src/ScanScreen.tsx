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
  { name: 'Wildes Pikachu', type: 'Typ: Elektro', level: 'Lv. 6', text: 'Pikachu begrüßen einander, indem sie ihre Schweife aneinanderreiben und eine Ladung Strom durch diese gleiten lassen.', image: pikachuImg },
  { name: 'Wildes Evoli', type: 'Typ: Normal', level: 'Lv. 31', text: 'Das Erbmaterial dieses besonderen Pokémon ist instabil, weshalb es das Potenzial für viele verschiedene Entwicklungen in sich trägt.', image: evoliImg },
  { name: 'Wildes Nebulak', type: 'Typ: Geist / Gift', level: 'Lv. 12', text: 'Aufgrund seines an Gas erinnernden Körpers kommt es an jeden Ort. Es kann jedoch vom Wind davongeweht werden.', image: nebulakImg },
  { name: 'Wildes Alpollo', type: 'Typ: Geist / Gift', level: 'Lv. 25', text: 'Falls du im Dunkeln das Gefühl hast, beobachtet zu werden, und niemand ist zu sehen, ist es bestimmt Alpollo.', image: alpolloImg },
  { name: 'Wildes Gengar', type: 'Typ: Geist / Gift', level: 'Lv. 38', text: 'Man sagt, es sei aus Dunkelheit entstanden, um denjenigen, die sich in den Bergen verirrt haben, das Leben zu rauben.', image: gengarImg },
  { name: 'Wildes Relaxo', type: 'Typ: Normal', level: 'Lv. 40', text: 'Der Magen dieses Pokémon ist so resistent, dass es sogar Verschimmeltes oder Verdorbenes essen kann.', image: snorlaxImg },
  { name: 'Wildes Irrbis', type: 'Typ: Geist / Pflanze', level: 'Lv. 20', text: 'Blicken Menschen und Pokémon in das Licht, das aus den Löchern seines Kürbisses dringt, werden sie hypnotisiert und von Irrbis kontrolliert.', image: irrbisImg },
  { name: 'Wildes Mimigma', type: 'Typ: Geist / Fee', level: 'Lv. 22', text: 'Es verbirgt sich unter einem Lumpen, der wie ein Pikachu aussieht, damit niemand Angst vor ihm bekommt. Leider wird es dadurch noch gruseliger.', image: mimikyuImg },
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
