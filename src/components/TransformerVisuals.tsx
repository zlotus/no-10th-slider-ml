import type { CSSProperties, ReactNode } from 'react'

export function ModalityToken({
  icon,
  label,
  unit,
  active,
  className = '',
}: {
  icon: ReactNode
  label: string
  unit: string
  active: boolean
  className?: string
}) {
  return (
    <div className={`modality-token ${active ? 'visible' : ''} ${className}`}>
      <span>{icon}</span>
      <div><b>{label}</b><small>{unit}</small></div>
    </div>
  )
}

export function PositionWave({ active }: { active: boolean }) {
  return (
    <svg className={`position-wave ${active ? 'visible' : ''}`} viewBox="0 0 620 170" role="img" aria-label="Sinusoidal 位置编码波形">
      <path className="wave-axis" d="M18 86 H602" />
      <path className="wave-sin" d="M18 86 C48 22 78 22 108 86 S168 150 198 86 S258 22 288 86 S348 150 378 86 S438 22 468 86 S528 150 558 86 S588 34 602 48" />
      <path className="wave-cos" d="M18 34 C48 34 58 86 88 124 S148 124 178 86 S238 34 268 34 S328 86 358 124 S418 124 448 86 S508 34 538 34 S588 82 602 108" />
      {[1, 2, 3, 4, 5, 6].map((position, index) => (
        <g key={position} transform={`translate(${64 + index * 94} 0)`}>
          <line y1="18" y2="151" />
          <text y="164">pos {position}</text>
        </g>
      ))}
      <text className="wave-label sin-label" x="24" y="24">sin</text>
      <text className="wave-label cos-label" x="24" y="148">cos</text>
    </svg>
  )
}

export function RotaryPair({
  label,
  position,
  active,
}: {
  label: 'Q' | 'K'
  position: number
  active: boolean
}) {
  const style = { '--rotation': `${position * 27}deg` } as CSSProperties
  return (
    <div className={`rotary-pair ${active ? 'visible' : ''}`} style={style}>
      <div className="rotary-plane">
        <i />
        <span>{label}<sub>{position}</sub></span>
      </div>
      <small>rotate · position {position}</small>
    </div>
  )
}

export type HeadRelation = readonly [number, number, number]

export function MiniAttentionHead({
  name,
  hint,
  tokens,
  relations,
  active,
}: {
  name: string
  hint: string
  tokens: readonly string[]
  relations: readonly HeadRelation[]
  active: boolean
}) {
  const tokenCount = tokens.length
  const slot = 700 / tokenCount
  return (
    <div className={`mini-head ${active ? 'visible' : ''}`}>
      <header><b>{name}</b><small>{hint}</small></header>
      <div className="mini-head-map">
        <svg viewBox="0 0 700 82" aria-hidden="true">
          {relations.map(([from, to, weight], index) => {
            const x1 = slot / 2 + from * slot
            const x2 = slot / 2 + to * slot
            const center = (x1 + x2) / 2
            const rise = 10 + Math.abs(to - from) * 7
            return <path key={`${from}-${to}`} style={{ '--head-delay': `${index * 70}ms`, opacity: weight } as CSSProperties} d={`M${x1} 72 C${center} ${rise} ${center} ${rise} ${x2} 72`} />
          })}
        </svg>
        <div style={{ '--token-count': tokenCount } as CSSProperties}>{tokens.map((token, index) => <span key={`${name}-${index}`}>{token}</span>)}</div>
      </div>
    </div>
  )
}

export function PatchGrid({ active, highlighted }: { active: boolean; highlighted: boolean }) {
  return (
    <div className={`patch-grid ${active ? 'visible' : ''} ${highlighted ? 'highlighted' : ''}`}>
      <svg viewBox="0 0 360 280" role="img" aria-label="图像被切分成四乘四 patch 网格">
        <defs>
          <linearGradient id="patch-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#171d2a" />
            <stop offset="1" stopColor="#5e4f91" />
          </linearGradient>
        </defs>
        <rect width="360" height="280" rx="16" fill="url(#patch-sky)" />
        <circle cx="272" cy="63" r="31" fill="#e6b957" opacity=".9" />
        <path d="M0 230 C62 167 118 176 170 218 C224 151 283 160 360 220 V280 H0Z" fill="#8a75d5" />
        <path d="M0 250 C75 211 126 231 188 249 C250 206 311 216 360 244 V280 H0Z" fill="#2d3047" />
        <path d="M143 280 L182 123 L224 280Z" fill="#d4a74c" />
        {[1, 2, 3].map((line) => <line key={`v-${line}`} x1={line * 90} x2={line * 90} y2="280" />)}
        {[1, 2, 3].map((line) => <line key={`h-${line}`} x2="360" y1={line * 70} y2={line * 70} />)}
        {[2, 5, 10, 11].map((cell) => <rect key={cell} className="patch-focus" x={(cell % 4) * 90 + 3} y={Math.floor(cell / 4) * 70 + 3} width="84" height="64" rx="7" />)}
      </svg>
      <span>4 × 4 PATCHES</span>
    </div>
  )
}
