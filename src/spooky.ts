let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  ctx ??= new Ctor()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

// iOS only allows audio after a user gesture, so unlock on the first touch
export function unlockAudio() {
  const unlock = () => {
    getCtx()
    window.removeEventListener('pointerdown', unlock)
  }
  window.addEventListener('pointerdown', unlock)
}

function tone(c: AudioContext, start: number, from: number, to: number, duration: number, volume: number, wobble = 0) {
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(from, start)
  osc.frequency.exponentialRampToValueAtTime(to, start + duration)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + duration * 0.3)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  if (wobble) {
    const lfo = c.createOscillator()
    const depth = c.createGain()
    lfo.frequency.value = wobble
    depth.gain.value = from * 0.04
    lfo.connect(depth).connect(osc.frequency)
    lfo.start(start)
    lfo.stop(start + duration)
  }
  osc.connect(gain).connect(c.destination)
  osc.start(start)
  osc.stop(start + duration)
}

export function playGhostWail() {
  const c = getCtx()
  if (!c) return
  const t = c.currentTime
  tone(c, t, 520, 180, 2.2, 0.25, 6)
  tone(c, t + 0.1, 780, 270, 2.0, 0.12, 7)
  tone(c, t, 55, 45, 2.4, 0.3)
}

export function playStinger() {
  const c = getCtx()
  if (!c) return
  const t = c.currentTime
  tone(c, t, 880, 660, 0.25, 0.2)
  tone(c, t + 0.25, 660, 440, 0.25, 0.2)
  tone(c, t + 0.5, 440, 220, 0.5, 0.25, 8)
}
