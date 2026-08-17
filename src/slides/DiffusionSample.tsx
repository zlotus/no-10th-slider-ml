import { ArrowDown, Sparkles } from 'lucide-react'
import { NoiseFrame, ProcessArrow } from '../components/MLVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const forwardFrames = [
  ['x₀', 'Image', 0],
  ['x₁', 'light noise', .22],
  ['xₜ', 'structure fades', .48],
  ['xₜ₋₁', 'almost noise', .74],
  ['xₜ', 'Noise', .98],
] as const

const reverseFrames = [
  ['xₜ', 'Noise', .98],
  ['xₜ₋₁', 'structure', .74],
  ['xₜ₋₂', 'outline', .48],
  ['x₁', 'details', .22],
  ['x₀', 'Image', 0],
] as const

export function DiffusionSample({ step }: SlideProps) {
  const forwardCount = step === 0 ? 1 : step === 1 ? 3 : forwardFrames.length
  const reverseCount = step < 4 ? 0 : step === 4 ? 1 : reverseFrames.length

  return (
    <SlideFrame
      number="17"
      eyebrow="DIFFUSION · GENERATIVE PROCESS"
      title={<>从噪声里<span className="title-generation">一点一点</span>恢复图像</>}
      tone="generation"
      source="HO ET AL. · DDPM · 2020  /  REFERENCE: PDF PAGES 15–16"
      className={`diffusion-sample diffusion-step-${step}`}
    >
      <div className="diffusion-stage">
        <section className={`diffusion-lane forward-lane ${step === 3 ? 'focus' : ''} ${step >= 4 ? 'dimmed' : ''}`}>
          <header><span>01</span><b>FORWARD PROCESS</b><small>q(xₜ | xₜ₋₁) · 逐步加入高斯噪声</small></header>
          <div className="image-strip">
            {forwardFrames.map(([label, caption, noise], index) => (
              <div className="strip-item" key={`${label}-${caption}`}>
                <NoiseFrame label={label} caption={caption} noise={noise} seed={index + 3} visible={index < forwardCount} focus={step === 3} />
                {index < forwardFrames.length - 1 && <ProcessArrow active={index + 1 < forwardCount} />}
              </div>
            ))}
          </div>
          <div className={`lane-caption ${step >= 2 ? 'visible' : ''}`}><span>DATA</span><i /><strong>NOISE</strong></div>
        </section>

        <div className={`process-pivot ${step >= 4 ? 'visible' : ''}`}>
          <ArrowDown /><span>LEARN THE REVERSE</span><b>εθ(xₜ, t)</b><small>模型学习每一步应去掉什么噪声</small>
        </div>

        <section className={`diffusion-lane reverse-lane ${step >= 4 ? 'visible' : ''} ${step >= 6 ? 'focus' : ''}`}>
          <header><span>02</span><b>REVERSE PROCESS</b><small>pθ(xₜ₋₁ | xₜ) · 逐步预测并去除噪声</small></header>
          <div className="image-strip">
            {reverseFrames.map(([label, caption, noise], index) => (
              <div className="strip-item" key={`${label}-${caption}`}>
                <NoiseFrame label={label} caption={caption} noise={noise} seed={8 - index} visible={index < reverseCount} focus={step >= 6} />
                {index < reverseFrames.length - 1 && <ProcessArrow active={index + 1 < reverseCount} />}
              </div>
            ))}
          </div>
          <div className={`lane-caption ${step >= 5 ? 'visible' : ''}`}><span>NOISE</span><i /><strong>DATA</strong></div>
        </section>

        <div className={`diffusion-insight ${step >= 6 ? 'visible' : ''}`}><Sparkles /><span>generation is a <b>trajectory</b>, not a single draw</span></div>
      </div>

      <BottomTakeaway visible={step >= 7}>
        <strong>模型不是一次“画出”图片，</strong><span>而是在学习如何让噪声逐步走向真实图像。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
