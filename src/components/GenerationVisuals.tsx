import { useId, type CSSProperties } from 'react'

export function SceneImage({
  visible,
  variant = 0,
  muted = false,
  label,
}: {
  visible: boolean
  variant?: number
  muted?: boolean
  label?: string
}) {
  const uid = useId().replaceAll(':', '')
  const shifts = [0, 16, -12, 8]
  const shift = shifts[variant % shifts.length]
  return (
    <figure className={`scene-image ${visible ? 'visible' : ''} ${muted ? 'muted' : ''}`}>
      <svg viewBox="0 0 280 190" role="img" aria-label={label ?? '生成图像示意'}>
        <defs>
          <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={variant % 2 ? '#19162d' : '#151c29'} />
            <stop offset="1" stopColor={variant % 2 ? '#634c8d' : '#493e76'} />
          </linearGradient>
          <radialGradient id={`${uid}-planet`} cx="35%" cy="30%">
            <stop offset="0" stopColor="#d7c6ff" />
            <stop offset="1" stopColor="#7765ba" />
          </radialGradient>
        </defs>
        <rect width="280" height="190" fill={`url(#${uid}-sky)`} />
        <circle cx={221 + shift / 3} cy="42" r="27" fill={`url(#${uid}-planet)`} />
        <circle cx={214 + shift / 3} cy="36" r="5" fill="#3d315f" opacity=".45" />
        <path d={`M0 148 C54 ${119 + shift / 3} 101 136 144 151 C193 124 235 128 280 145 V190 H0Z`} fill="#4c446d" />
        <path d={`M0 166 C60 142 112 154 160 167 C210 145 246 151 280 162 V190 H0Z`} fill="#26283b" />
        <g transform={`translate(${118 + shift} 61)`}>
          <path d="M16 38 L2 69 L15 76 L30 49Z" fill="#c5b6f7" />
          <path d="M57 39 L73 69 L60 77 L43 49Z" fill="#c5b6f7" />
          <rect x="15" y="27" width="44" height="73" rx="19" fill="#e7e6ed" />
          <rect x="20" y="43" width="34" height="24" rx="7" fill="#6b5da5" />
          <circle cx="37" cy="21" r="25" fill="#ece9f1" />
          <path d="M18 8 L26 -2 L32 9 M43 8 L50 -2 L57 10" fill="#ece9f1" stroke="#ece9f1" strokeWidth="5" strokeLinejoin="round" />
          <ellipse cx="37" cy="22" rx="18" ry="14" fill="#d9b277" />
          <circle cx="31" cy="20" r="2.5" fill="#24222b" /><circle cx="44" cy="20" r="2.5" fill="#24222b" />
          <path d="M34 27 Q38 31 42 27" fill="none" stroke="#4d3b36" strokeWidth="2" strokeLinecap="round" />
          <path d="M19 99 L15 124 M55 99 L61 124" stroke="#e7e6ed" strokeWidth="13" strokeLinecap="round" />
          <rect x="28" y="72" width="18" height="15" rx="4" fill="#9a83ff" />
        </g>
        <g fill="#e6b957" opacity=".74">
          <circle cx="38" cy="38" r="1.8" /><circle cx="72" cy="63" r="1.2" /><circle cx="97" cy="27" r="1.4" />
        </g>
      </svg>
      {label && <figcaption>{label}</figcaption>}
    </figure>
  )
}

export function LatentCloud({
  visible,
  sampled,
  regularized,
}: {
  visible: boolean
  sampled: boolean
  regularized: boolean
}) {
  return (
    <div className={`latent-cloud ${visible ? 'visible' : ''} ${sampled ? 'sampled' : ''} ${regularized ? 'regularized' : ''}`}>
      <svg viewBox="0 0 430 300" role="img" aria-label="连续且可采样的潜变量分布">
        <ellipse className="prior-ring" cx="215" cy="150" rx="160" ry="112" />
        <ellipse className="cloud cloud-a" cx="169" cy="128" rx="91" ry="68" />
        <ellipse className="cloud cloud-b" cx="262" cy="171" rx="93" ry="70" />
        <path className="latent-axis" d="M36 251 H394 M69 277 V32" />
        <text x="382" y="269">z₁</text><text x="49" y="43">z₂</text>
        {[[130, 99], [174, 144], [226, 113], [275, 184], [315, 157], [205, 203]].map(([x, y], index) => (
          <circle key={`${x}-${y}`} className={`sample sample-${index}`} cx={x} cy={y} r={index === 3 ? 7 : 4} />
        ))}
        <text className="mu" x="138" y="120">μ</text><text className="sigma" x="284" y="214">σ</text>
        <text className="prior-label" x="265" y="40">N(0, I)</text>
      </svg>
      <small>CONTINUOUS LATENT SPACE</small>
    </div>
  )
}

const tokenPalette = ['#9a83ff', '#7663d0', '#c7a557', '#5f78a7', '#b76f9f', '#6c946e']

export function VisualTokenGrid({
  visible,
  filled = 16,
  compact = false,
}: {
  visible: boolean
  filled?: number
  compact?: boolean
}) {
  return (
    <div className={`visual-token-grid ${visible ? 'visible' : ''} ${compact ? 'compact' : ''}`} aria-label="四乘四离散视觉 token 网格">
      {Array.from({ length: 16 }, (_, index) => (
        <i
          key={index}
          className={index < filled ? 'filled' : ''}
          style={{ '--token-color': tokenPalette[(index * 5 + Math.floor(index / 4)) % tokenPalette.length], '--token-delay': `${index * 42}ms` } as CSSProperties}
        ><span>{index < filled ? String((index * 17 + 3) % 97).padStart(2, '0') : '?'}</span></i>
      ))}
    </div>
  )
}

export function SimilaritySpace({
  visible,
  matched,
  separated,
}: {
  visible: boolean
  matched: boolean
  separated: boolean
}) {
  const texts = [['宇航员猫', 92, 81], ['月球车', 306, 76], ['海边', 334, 224]] as const
  const images = [['CAT', 132, 130], ['ROVER', 270, 120], ['SEA', 288, 246]] as const
  return (
    <div className={`similarity-space ${visible ? 'visible' : ''} ${matched ? 'matched' : ''} ${separated ? 'separated' : ''}`}>
      <svg viewBox="0 0 440 310" role="img" aria-label="图文共享语义空间">
        <path className="space-axis" d="M39 271 H411 M58 291 V31" />
        {texts.map(([label, x, y]) => <g className="text-point" key={label} transform={`translate(${x} ${y})`}><circle r="13" /><text y="-20">{label}</text></g>)}
        {images.map(([label, x, y]) => <g className="image-point" key={label} transform={`translate(${x} ${y})`}><rect x="-13" y="-13" width="26" height="26" rx="6" /><text y="27">{label}</text></g>)}
        <path className="match-link link-a" d="M92 81 Q112 103 132 130" />
        <path className="match-link link-b" d="M306 76 Q286 97 270 120" />
        <path className="match-link link-c" d="M334 224 Q312 232 288 246" />
        <path className="negative-link" d="M92 81 Q205 39 271 123" />
      </svg>
      <small>SHARED EMBEDDING SPACE</small>
    </div>
  )
}
