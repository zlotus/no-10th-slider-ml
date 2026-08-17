import type { ReactNode } from 'react'

export function SlideFrame({
  number,
  eyebrow,
  title,
  tone,
  source,
  className = '',
  children,
}: {
  number: string
  eyebrow: string
  title: ReactNode
  tone: 'transformer' | 'generation' | 'hybrid'
  source?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section className={`slide-frame slide-tone-${tone} ${className}`}>
      <header className="slide-header">
        <div className="slide-meta">
          <span className="slide-number">{number}</span>
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h1>{title}</h1>
      </header>
      <div className="slide-content">{children}</div>
      {source && <footer className="source-label">{source}</footer>}
    </section>
  )
}

export function BottomTakeaway({ visible, children }: { visible: boolean; children: ReactNode }) {
  return <div className={`bottom-takeaway ${visible ? 'visible' : ''}`}>{children}</div>
}
