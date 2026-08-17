import type { ComponentType } from 'react'

export type SlideProps = { step: number }

export type SlideDefinition = {
  number: number
  title: string
  maxStep: number
  tone: 'transformer' | 'generation' | 'hybrid'
  component: ComponentType<SlideProps>
}
