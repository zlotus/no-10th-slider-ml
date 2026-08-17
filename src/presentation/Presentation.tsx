import { useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'
import { Stage } from './Stage'
import { slides } from './slides'
import { usePresentation } from './usePresentation'

export function Presentation() {
  const runtime = usePresentation()
  const [editingPage, setEditingPage] = useState(false)
  const [pageInput, setPageInput] = useState('')
  const CurrentSlide = runtime.current.component
  const stepShare = runtime.step / Math.max(1, runtime.current.maxStep + 1)
  const progress = ((runtime.index + stepShare) / slides.length) * 100

  const submitPage = () => {
    const page = Number(pageInput)
    if (Number.isInteger(page) && page >= 1 && page <= slides.length) runtime.go(page - 1)
    setEditingPage(false)
    setPageInput('')
  }

  return (
    <main
      className={`presentation-shell tone-${runtime.current.tone}`}
      onPointerMove={runtime.showControls}
    >
      <Stage>
        <CurrentSlide step={runtime.step} />
      </Stage>

      <nav
        className={`runtime-controls ${runtime.controlsVisible ? '' : 'controls-hidden'}`}
        aria-label="演示控制"
      >
        <button onClick={runtime.backward} aria-label="上一步"><ChevronLeft /></button>
        <button className="page-indicator" title="点击跳到下一页" onClick={() => runtime.go((runtime.index + 1) % slides.length)}>
          {editingPage ? (
            <input
              className="page-jump-input"
              aria-label="跳转到样板页"
              type="number"
              min={1}
              max={slides.length}
              value={pageInput}
              autoFocus
              onFocus={(event) => event.currentTarget.select()}
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => setPageInput(event.target.value)}
              onBlur={() => {
                setEditingPage(false)
                setPageInput('')
              }}
              onKeyDown={(event) => {
                event.stopPropagation()
                if (event.key === 'Enter') submitPage()
                if (event.key === 'Escape') {
                  setEditingPage(false)
                  setPageInput('')
                }
              }}
            />
          ) : (
            <span
              className="page-current"
              title="点击输入样板页序号"
              onClick={(event) => {
                event.stopPropagation()
                setPageInput(String(runtime.index + 1))
                setEditingPage(true)
              }}
            >
              {String(runtime.index + 1).padStart(2, '0')}
            </span>
          )}
          <i>/</i>
          <span>{String(slides.length).padStart(2, '0')}</span>
          <small>SLIDE {String(runtime.current.number).padStart(2, '0')} · STEP {String(runtime.step).padStart(2, '0')}</small>
        </button>
        <button onClick={runtime.forward} aria-label="下一步"><ChevronRight /></button>
        <button onClick={() => void runtime.toggleFullscreen()} aria-label="切换全屏">
          {runtime.isFullscreen ? <Minimize2 /> : <Maximize2 />}
        </button>
      </nav>

      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
    </main>
  )
}
