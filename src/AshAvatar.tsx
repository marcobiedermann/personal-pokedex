export function AshAvatar() {
  return (
    <svg className="avatar" viewBox="0 0 120 120" role="img" aria-label="Avatar von Ash">
      <circle cx="60" cy="60" r="58" fill="#8ecae6" stroke="#2d4a2d" strokeWidth="4" />
      <clipPath id="avatar-clip"><circle cx="60" cy="60" r="56" /></clipPath>
      <g clipPath="url(#avatar-clip)">
        <path d="M10 125c0-28 22-38 50-38s50 10 50 38z" fill="#1e5fbf" />
        <path d="M40 90l20 14 20-14-6-8H46z" fill="#fff" />
        <rect x="52" y="74" width="16" height="16" fill="#f1b98a" />
        <path d="M30 120l10-30M90 120l-10-30" stroke="#fff" strokeWidth="6" />
        <ellipse cx="60" cy="56" rx="26" ry="29" fill="#f1b98a" />
        <ellipse cx="34" cy="58" rx="4" ry="6" fill="#f1b98a" />
        <ellipse cx="86" cy="58" rx="4" ry="6" fill="#f1b98a" />
        <path d="M33 44c-4-14 8-24 27-24s31 10 27 24c-8-8-18-10-27-10s-19 2-27 10z" fill="#1b1b1b" />
        <path d="M36 50c-6 4-8 10-6 16M84 50c6 4 8 10 6 16" stroke="#1b1b1b" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M26 44c0-22 14-32 34-32s34 10 34 32c-6-6-18-10-34-10S32 38 26 44z" fill="#e53935" />
        <path d="M44 14c10-4 22-4 32 0l-2 20c-9-3-19-3-28 0z" fill="#fff" />
        <circle cx="60" cy="24" r="5" fill="#2e9e4f" stroke="#1b5e20" strokeWidth="1.5" />
        <path d="M24 38c14 7 58 7 72 0l1 5c-15 7-59 7-74 0z" fill="#b71c1c" />
        <ellipse cx="49" cy="58" rx="3.5" ry="4.5" fill="#3b2314" />
        <ellipse cx="71" cy="58" rx="3.5" ry="4.5" fill="#3b2314" />
        <path d="M43 52q6-3 12 0M65 52q6-3 12 0" stroke="#1b1b1b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M41 66l3 4M43 64l2 6M79 66l-3 4M77 64l-2 6" stroke="#5a3b24" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M50 72q10 8 20 0" stroke="#7a2e1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}
