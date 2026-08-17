import { CoverSample } from '../slides/CoverSample'
import { DiffusionSample } from '../slides/DiffusionSample'
import { Slide02WhyTransformer } from '../slides/Slide02WhyTransformer'
import { Slide03RNN } from '../slides/Slide03RNN'
import { Slide05PositionEncoding } from '../slides/Slide05PositionEncoding'
import { Slide06AttentionIntuition } from '../slides/Slide06AttentionIntuition'
import { Slide07QKV } from '../slides/Slide07QKV'
import { Slide08MultiHead } from '../slides/Slide08MultiHead'
import { Slide09EncoderDecoder } from '../slides/Slide09EncoderDecoder'
import { Slide10TransformerBranches } from '../slides/Slide10TransformerBranches'
import { Slide11ViT } from '../slides/Slide11ViT'
import { Slide12GenerationChallenge } from '../slides/Slide12GenerationChallenge'
import { Slide13VAE } from '../slides/Slide13VAE'
import { Slide14GAN } from '../slides/Slide14GAN'
import { Slide15AutoregressiveImage } from '../slides/Slide15AutoregressiveImage'
import { Slide16CLIP } from '../slides/Slide16CLIP'
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
    number: 2,
    title: '为什么从 Transformer 开始讲',
    maxStep: 6,
    tone: 'transformer',
    component: Slide02WhyTransformer,
  },
  {
    number: 3,
    title: 'Transformer 之前：顺序就是计算本身',
    maxStep: 6,
    tone: 'transformer',
    component: Slide03RNN,
  },
  {
    number: 4,
    title: 'Transformer：把“顺序”与“关系计算”解耦',
    maxStep: 10,
    tone: 'transformer',
    component: TransformerSample,
  },
  {
    number: 5,
    title: '并行之后，顺序从哪里来？',
    maxStep: 7,
    tone: 'transformer',
    component: Slide05PositionEncoding,
  },
  {
    number: 6,
    title: 'Attention：让当前 token 主动寻找信息',
    maxStep: 6,
    tone: 'transformer',
    component: Slide06AttentionIntuition,
  },
  {
    number: 7,
    title: 'Q / K / V：看谁，以及拿什么',
    maxStep: 7,
    tone: 'transformer',
    component: Slide07QKV,
  },
  {
    number: 8,
    title: '一个关系不够：同时从多个视角看',
    maxStep: 6,
    tone: 'transformer',
    component: Slide08MultiHead,
  },
  {
    number: 9,
    title: '完整 Transformer：理解与生成',
    maxStep: 7,
    tone: 'transformer',
    component: Slide09EncoderDecoder,
  },
  {
    number: 10,
    title: '同一架构，分化出三条路线',
    maxStep: 5,
    tone: 'transformer',
    component: Slide10TransformerBranches,
  },
  {
    number: 11,
    title: 'Transformer 走出 NLP：图像也可以是 Token',
    maxStep: 7,
    tone: 'transformer',
    component: Slide11ViT,
  },
  {
    number: 12,
    title: '从“理解图像”到“生成图像”，难度为什么陡增？',
    maxStep: 6,
    tone: 'generation',
    component: Slide12GenerationChallenge,
  },
  {
    number: 13,
    title: 'VAE：把图像压到一个可以采样的潜空间',
    maxStep: 7,
    tone: 'generation',
    component: Slide13VAE,
  },
  {
    number: 14,
    title: 'GAN：生成器与判别器的对抗博弈',
    maxStep: 7,
    tone: 'generation',
    component: Slide14GAN,
  },
  {
    number: 15,
    title: '如果图像也能离散成 Token，就能像写句子一样“写图”',
    maxStep: 7,
    tone: 'generation',
    component: Slide15AutoregressiveImage,
  },
  {
    number: 16,
    title: 'CLIP：文图对齐，不是“先看图再分类”，而是进入共同语义空间',
    maxStep: 7,
    tone: 'generation',
    component: Slide16CLIP,
  },
  {
    number: 17,
    title: 'Diffusion：从噪声里一点一点恢复图像',
    maxStep: 7,
    tone: 'generation',
    component: DiffusionSample,
  },
]
