// src/components/Math.tsx
import katex from 'katex'
import 'katex/dist/katex.min.css'

export function Math({
  children,
  displayMode = false,
  className = '',
}: {
  children: string
  displayMode?: boolean
  className?: string
}) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(children, {
          displayMode,
          throwOnError: false,
        }),
      }}
    />
  )
}