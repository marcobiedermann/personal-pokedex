import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import QRCode from 'qrcode'

export function ShareScreen() {
  const [qr, setQr] = useState('')
  const url = window.location.origin + import.meta.env.BASE_URL

  useEffect(() => {
    QRCode.toDataURL(url, { margin: 2, width: 480 }).then(setQr)
  }, [url])

  return (
    <div className="page share">
      <Link to="/" className="back">‹ Zurück</Link>
      <header className="page-header">
        <h1>Teilen</h1>
        <p>Scanne den Code, um den Pokédex zu öffnen.</p>
      </header>
      {qr && <img src={qr} alt="QR-Code zum Pokédex" className="qr" />}
      <p className="catch-sub">{url}</p>
    </div>
  )
}
