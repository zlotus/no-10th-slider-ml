import { useId, type CSSProperties } from 'react'

export function FeatureMap({
  visible,
  focus = [],
  tone = 'generation',
  label,
}: {
  visible: boolean
  focus?: readonly number[]
  tone?: 'generation' | 'transformer'
  label: string
}) {
  return (
    <div className={`feature-map feature-${tone} ${visible ? 'visible' : ''}`} aria-label={label}>
      {Array.from({ length: 24 }, (_, index) => (
        <i
          key={index}
          className={focus.includes(index) ? 'focus' : ''}
          style={{ '--feature-delay': `${index * 18}ms` } as CSSProperties}
        />
      ))}
      <span>{label}</span>
    </div>
  )
}

export function VelocityField({
  visible,
  straightened,
}: {
  visible: boolean
  straightened: boolean
}) {
  const marker = useId().replaceAll(':', '')
  const vectors = Array.from({ length: 45 }, (_, index) => {
    const column = index % 9
    const row = Math.floor(index / 9)
    const x = 92 + column * 61
    const y = 65 + row * 56
    const angle = -18 + row * 7 + Math.sin(column * .8) * 13
    return { x, y, angle, delay: index * 8 }
  })
  return (
    <div className={`velocity-field ${visible ? 'visible' : ''} ${straightened ? 'straightened' : ''}`}>
      <svg viewBox="0 0 660 370" role="img" aria-label="从噪声分布到数据分布的连续速度场">
        <defs>
          <marker id={marker} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10Z" />
          </marker>
        </defs>
        <ellipse className="distribution noise" cx="62" cy="186" rx="44" ry="124" />
        <ellipse className="distribution data" cx="606" cy="186" rx="38" ry="94" />
        {vectors.map(({ x, y, angle, delay }) => (
          <line
            key={`${x}-${y}`}
            className="field-vector"
            x1={x}
            y1={y}
            x2={x + 34}
            y2={y}
            markerEnd={`url(#${marker})`}
            style={{ transformOrigin: `${x}px ${y}px`, transform: `rotate(${angle}deg)`, transitionDelay: `${delay}ms` }}
          />
        ))}
        <path className="flow-path path-a" d={straightened ? 'M64 118 L604 112' : 'M64 118 C178 12 287 282 404 111 S536 86 604 112'} />
        <path className="flow-path path-b" d={straightened ? 'M64 188 L604 186' : 'M64 188 C167 291 295 65 407 205 S542 227 604 186'} />
        <path className="flow-path path-c" d={straightened ? 'M64 255 L604 255' : 'M64 255 C199 338 291 145 414 276 S541 293 604 255'} />
        <text className="field-label" x="20" y="342">NOISE · p₀</text>
        <text className="field-label data-label" x="552" y="314">DATA · p₁</text>
      </svg>
    </div>
  )
}

export function ConvergenceMark({ visible }: { visible: boolean }) {
  return (
    <div className={`convergence-mark ${visible ? 'visible' : ''}`}>
      <svg viewBox="0 0 300 190" aria-hidden="true">
        <path className="route route-transformer" d="M18 38 H119 Q149 38 149 68 V92" />
        <path className="route route-generation" d="M18 152 H119 Q149 152 149 122 V98" />
        <path className="route route-merged" d="M150 95 H282" />
        <circle cx="150" cy="95" r="12" />
      </svg>
      <span>CONVERGENCE</span>
    </div>
  )
}
