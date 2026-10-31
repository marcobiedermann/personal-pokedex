import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react'

export interface CameraHandle {
  video: HTMLVideoElement | null
}

export function CameraView({
  facing,
  handle,
  children,
}: {
  facing: 'user' | 'environment'
  handle?: Ref<CameraHandle>
  children?: React.ReactNode
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const error = failed || !navigator.mediaDevices

  useImperativeHandle(handle, () => ({
    get video() {
      return videoRef.current
    },
  }))

  useEffect(() => {
    let stream: MediaStream | undefined
    let cancelled = false

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: facing }, audio: false })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop())
          return
        }
        stream = s
        if (videoRef.current) videoRef.current.srcObject = s
      })
      .catch(() => setFailed(true))

    return () => {
      cancelled = true
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [facing])

  return (
    <div className={`camera${facing === 'user' ? ' mirrored' : ''}`}>
      {error ? (
        <p className="camera-error">Kamera nicht verfügbar. Bitte erlaube den Kamerazugriff in Safari.</p>
      ) : (
        <video ref={videoRef} autoPlay playsInline muted />
      )}
      {children}
    </div>
  )
}
