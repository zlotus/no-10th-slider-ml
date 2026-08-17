import { useEffect, useRef, useState, type ReactNode } from 'react'

export const STAGE_WIDTH = 1920
export const STAGE_HEIGHT = 1080

export function Stage({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const element = host.current
    if (!element) return

    const resize = () => {
      setScale(Math.min(element.clientWidth / STAGE_WIDTH, element.clientHeight / STAGE_HEIGHT))
    }
    const observer = new ResizeObserver(resize)
    observer.observe(element)
    resize()
    return () => observer.disconnect()
  }, [])

  return (
    <div className="stage-host" ref={host} data-testid="stage-host">
      <div
        className="stage"
        style={{ transform: `scale(${scale})` }}
        data-stage-width={STAGE_WIDTH}
        data-stage-height={STAGE_HEIGHT}
      >
        {children}
      </div>
    </div>
  )
}
