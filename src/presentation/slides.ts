import { CoverSample } from '../slides/CoverSample'
import { DiffusionSample } from '../slides/DiffusionSample'
import { TransformerSample } from '../slides/TransformerSample'
import type { SlideDefinition } from './types'

export const slides: SlideDefinition[] = [
  {
    number: 1,
    title: '近十年 Transformer 与文图生成算法演进',
    maxStep: 4,
    tone: 'hybrid',
    component: CoverSample,
  },
  {
    number: 4,
    title: 'Transformer：把“顺序”与“关系计算”解耦',
    maxStep: 10,
    tone: 'transformer',
    component: TransformerSample,
  },
  {
    number: 17,
    title: 'Diffusion：从噪声里一点一点恢复图像',
    maxStep: 7,
    tone: 'generation',
    component: DiffusionSample,
  },
]
