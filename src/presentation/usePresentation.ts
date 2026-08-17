import { useCallback, useEffect, useState } from 'react'
import { slides } from './slides'

function parseHash() {
  const match = window.location.hash.match(/^#\/(\d+)(?:\/(\d+))?$/)
  const requested = Number(match?.[1] ?? slides[0].number)
  const found = slides.findIndex((slide) => slide.number === requested)
  const index = found >= 0 ? found : 0
  const requestedStep = Number(match?.[2] ?? 0)
  const step = Number.isFinite(requestedStep)
    ? Math.max(0, Math.min(requestedStep, slides[index].maxStep))
    : 0
  return { index, step }
}

export function usePresentation() {
  const [state, setState] = useState(parseHash)
  const [isFullscreen, setFullscreen] = useState(Boolean(document.fullscreenElement))
  const [controlsVisible, setControlsVisible] = useState(true)
  const current = slides[state.index]

  const go = useCallback((index: number, step = 0) => {
    const safeIndex = Math.max(0, Math.min(index, slides.length - 1))
    const safeStep = Math.max(0, Math.min(step, slides[safeIndex].maxStep))
    window.location.hash = `#/${slides[safeIndex].number}/${safeStep}`
    setState({ index: safeIndex, step: safeStep })
  }, [])

  const forward = useCallback(() => {
    if (state.step < current.maxStep) go(state.index, state.step + 1)
    else if (state.index < slides.length - 1) go(state.index + 1)
  }, [current.maxStep, go, state])

  const backward = useCallback(() => {
    if (state.step > 0) go(state.index, state.step - 1)
    else if (state.index > 0) go(state.index - 1)
  }, [go, state])

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) await document.exitFullscreen()
    else await document.documentElement.requestFullscreen()
  }, [])

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', `#/${slides[0].number}/0`)
    }
    const onHash = () => setState(parseHash())
    const onFullscreen = () => setFullscreen(Boolean(document.fullscreenElement))
    window.addEventListener('hashchange', onHash)
    document.addEventListener('fullscreenchange', onFullscreen)
    return () => {
      window.removeEventListener('hashchange', onHash)
      document.removeEventListener('fullscreenchange', onFullscreen)
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return

      if (['ArrowRight', ' ', 'PageDown'].includes(event.key)) {
        event.preventDefault()
        forward()
      } else if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        backward()
      } else if (event.key === 'Home') {
        event.preventDefault()
        go(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        go(slides.length - 1)
      } else if (event.key.toLowerCase() === 'f') {
        event.preventDefault()
        void toggleFullscreen()
      } else if (event.key === 'Escape') {
        if (document.fullscreenElement) void document.exitFullscreen()
        else setControlsVisible(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [backward, forward, go, toggleFullscreen])

  return {
    ...state,
    current,
    go,
    forward,
    backward,
    toggleFullscreen,
    isFullscreen,
    controlsVisible,
    showControls: () => setControlsVisible(true),
  }
}
