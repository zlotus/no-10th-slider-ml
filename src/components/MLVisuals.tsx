import { useId, type CSSProperties, type ReactNode } from 'react'

export type VisualTone = 'transformer' | 'generation' | 'neutral'

export function Token({
  children,
  tone = 'transformer',
  active = true,
  compact = false,
}: {
  children: ReactNode
  tone?: VisualTone
  active?: boolean
  compact?: boolean
}) {
  return <span className={`ml-token token-${tone} ${active ? 'active' : ''} ${compact ? 'compact' : ''}`}>{children}</span>
}

export function TokenRow({
  tokens,
  label,
  tone = 'transformer',
  active = true,
  compact = false,
}: {
  tokens: readonly string[]
  label?: string
  tone?: VisualTone
  active?: boolean
  compact?: boolean
}) {
  return (
    <div className={`token-row ${compact ? 'compact' : ''}`}>
      {label && <b>{label}</b>}
      <div>{tokens.map((token) => <Token key={`${label ?? 'token'}-${token}`} tone={tone} active={active} compact={compact}>{token}</Token>)}</div>
    </div>
  )
}

const attention = [
  [.84, .21, .31, .09, .12, .18, .27],
  [.18, .71, .76, .20, .14, .22, .17],
  [.09, .56, .88, .34, .18, .31, .22],
  [.24, .15, .29, .79, .68, .61, .42],
  [.19, .12, .20, .72, .86, .74, .49],
  [.15, .17, .26, .63, .72, .91, .81],
  [.22, .13, .19, .44, .58, .83, .89],
]

export function AttentionMatrix({
  tokens,
  revealed,
  highlighted,
}: {
  tokens: readonly string[]
  revealed: boolean
  highlighted: boolean
}) {
  return (
    <div className={`attention-matrix ${revealed ? 'revealed' : ''} ${highlighted ? 'highlighted' : ''}`} aria-label="7 乘 7 Attention Matrix">
      <span className="matrix-axis axis-k">Kᵀ</span>
      <span className="matrix-axis axis-q">Q</span>
      <div className="matrix-corner">QKᵀ</div>
      <div className="matrix-column-labels">{tokens.map((token) => <span key={`col-${token}`}>{token}</span>)}</div>
      <div className="matrix-row-labels">{tokens.map((token) => <span key={`row-${token}`}>{token}</span>)}</div>
      <div className="matrix-grid" role="img" aria-label="每个格子表示两个 token 的相关程度">
        {attention.flatMap((row, rowIndex) => row.map((value, columnIndex) => {
          const focus = highlighted && (rowIndex === 2 || columnIndex === 5)
          const style = {
            backgroundColor: `rgba(234, 185, 78, ${0.08 + value * 0.84})`,
            transitionDelay: revealed ? `${rowIndex * 52 + columnIndex * 8}ms` : '0ms',
          } as CSSProperties
          return <i key={`${rowIndex}-${columnIndex}`} className={focus ? 'focus' : ''} style={style} />
        }))}
      </div>
      <small>7 × 7 · pairwise relations</small>
    </div>
  )
}

export function ProcessArrow({
  active,
  reverse = false,
  tone = 'generation',
}: {
  active: boolean
  reverse?: boolean
  tone?: VisualTone
}) {
  const marker = useId().replaceAll(':', '')
  return (
    <svg className={`process-arrow arrow-${tone} ${active ? 'active' : ''}`} viewBox="0 0 70 24" aria-hidden="true">
      <defs>
        <marker id={marker} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <path d={reverse ? 'M64 12 H7' : 'M6 12 H63'} markerEnd={`url(#${marker})`} />
    </svg>
  )
}

export function NoiseFrame({
  label,
  caption,
  noise,
  visible,
  focus = false,
  seed = 1,
}: {
  label: string
  caption: string
  noise: number
  visible: boolean
  focus?: boolean
  seed?: number
}) {
  const uid = useId().replaceAll(':', '')
  const blur = Math.round(noise * 7)
  return (
    <figure className={`noise-frame ${visible ? 'visible' : ''} ${focus ? 'focus' : ''}`}>
      <div className="noise-image">
        <svg viewBox="0 0 240 150" role="img" aria-label={`${caption}，噪声强度 ${Math.round(noise * 100)}%`}>
          <defs>
            <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#211b42" />
              <stop offset="1" stopColor="#514199" />
            </linearGradient>
            <filter id={`${uid}-noise`} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed={seed} />
              <feColorMatrix type="saturate" values="0.8" />
            </filter>
            <filter id={`${uid}-blur`}><feGaussianBlur stdDeviation={blur} /></filter>
          </defs>
          <rect width="240" height="150" fill={`url(#${uid}-sky)`} />
          <g opacity={Math.max(.08, 1 - noise * .9)} filter={`url(#${uid}-blur)`}>
            <circle cx="173" cy="42" r="21" fill="#f2bd55" />
            <path d="M0 122 C42 83 68 92 102 111 C137 75 175 78 240 119 V150 H0Z" fill="#8a70df" />
            <path d="M0 132 C48 107 91 116 128 127 C169 101 207 108 240 126 V150 H0Z" fill="#32295e" />
            <path d="M89 150 L118 73 L146 150Z" fill="#e7b24d" />
            <rect x="112" y="99" width="12" height="51" fill="#f0cf79" />
          </g>
          <rect width="240" height="150" filter={`url(#${uid}-noise)`} opacity={noise * .96} />
          <rect width="240" height="150" fill="#9182ff" opacity={noise * .16} />
        </svg>
      </div>
      <figcaption><b>{label}</b><span>{caption}</span></figcaption>
      <i style={{ width: `${Math.round(noise * 100)}%` }} />
    </figure>
  )
}
