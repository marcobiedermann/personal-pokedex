const GHOSTS = [
  { emoji: '🦇', left: 8, delay: 0, duration: 11 },
  { emoji: '👻', left: 30, delay: 3, duration: 14 },
  { emoji: '🦇', left: 55, delay: 6, duration: 10 },
  { emoji: '👻', left: 78, delay: 1, duration: 16 },
  { emoji: '🦇', left: 90, delay: 8, duration: 12 },
]

export function Haunt() {
  return (
    <div className="haunt" aria-hidden="true">
      {GHOSTS.map((g, i) => (
        <span
          key={i}
          className="ghost"
          style={{ left: `${g.left}%`, animationDelay: `${g.delay}s`, animationDuration: `${g.duration}s` }}
        >
          {g.emoji}
        </span>
      ))}
      <div className="lightning" />
    </div>
  )
}
