import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { TRAINER, TRAINER_INFO } from './data'
import { CameraView, type CameraHandle } from './CameraView'
import { useBadges } from './useParty'

const W = 900
const H = 1200

export function PhotoScreen() {
  const camera = useRef<CameraHandle>(null)
  const badges = useBadges()
  const [photo, setPhoto] = useState<{ url: string; blob: Blob } | null>(null)

  const shoot = () => {
    const video = camera.current?.video
    if (!video || !video.videoWidth) return
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const g = canvas.getContext('2d')!

    // Cover-crop the (mirrored) video into the portrait frame
    const scale = Math.max(W / video.videoWidth, H / video.videoHeight)
    const vw = video.videoWidth * scale
    const vh = video.videoHeight * scale
    g.save()
    g.translate(W, 0)
    g.scale(-1, 1)
    g.drawImage(video, (W - vw) / 2, (H - vh) / 2, vw, vh)
    g.restore()

    g.lineWidth = 36
    g.strokeStyle = '#e53935'
    g.strokeRect(18, 18, W - 36, H - 36)

    g.fillStyle = 'rgba(20, 20, 30, 0.82)'
    g.fillRect(18, H - 300, W - 36, 282)
    g.fillStyle = '#fff'
    g.font = '700 64px -apple-system, Helvetica, sans-serif'
    g.fillText(`Trainer ${TRAINER}`, 60, H - 215)
    g.font = '500 40px -apple-system, Helvetica, sans-serif'
    g.fillText(TRAINER_INFO.map((i) => i.value).join(' · '), 60, H - 150)
    g.font = '60px sans-serif'
    g.fillText(
      badges.map((b) => (b.earned ? b.symbol : '·')).join(' '),
      60,
      H - 70,
    )

    g.fillStyle = '#fff'
    g.strokeStyle = '#222'
    g.lineWidth = 8
    g.beginPath()
    g.arc(W - 110, 110, 50, 0, Math.PI * 2)
    g.fill()
    g.stroke()
    g.fillStyle = '#e53935'
    g.beginPath()
    g.arc(W - 110, 110, 46, Math.PI, 0)
    g.fill()
    g.beginPath()
    g.moveTo(W - 160, 110)
    g.lineTo(W - 60, 110)
    g.stroke()

    canvas.toBlob((blob) => {
      if (blob) setPhoto({ url: URL.createObjectURL(blob), blob })
    }, 'image/jpeg', 0.92)
  }

  const save = async () => {
    if (!photo) return
    const file = new File([photo.blob], 'pokedex-trainer.jpg', { type: 'image/jpeg' })
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file] }).catch(() => undefined)
      return
    }
    const a = document.createElement('a')
    a.href = photo.url
    a.download = file.name
    a.click()
  }

  const retake = () => {
    if (photo) URL.revokeObjectURL(photo.url)
    setPhoto(null)
  }

  return (
    <div className="page photo">
      <Link to="/" className="back">‹ Zurück</Link>
      {photo ? (
        <>
          <img src={photo.url} alt="Trainer-Foto" className="photo-result" />
          <div className="two-buttons">
            <button type="button" className="cry-btn" onClick={save}>Teilen / Sichern</button>
            <button type="button" className="cry-btn ghost-btn" onClick={retake}>Nochmal</button>
          </div>
        </>
      ) : (
        <>
          <CameraView facing="user" handle={camera}>
            <div className="photo-frame">
              <span className="photo-name">Trainer {TRAINER}</span>
            </div>
          </CameraView>
          <button type="button" className="cry-btn" onClick={shoot}>📸 Foto aufnehmen</button>
        </>
      )}
    </div>
  )
}
