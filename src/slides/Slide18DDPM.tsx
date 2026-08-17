import { ArrowRight, Dices, Equal, Network, Scale } from 'lucide-react'
import { NoiseFrame } from '../components/MLVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

export function Slide18DDPM({ step }: SlideProps) {
  return (
    <SlideFrame
      number="18"
      eyebrow="DDPM · DENOISING OBJECTIVE"
      title={<>DDPM：把“生成”变成一个<span className="title-generation">稳定的去噪学习问题</span></>}
      tone="generation"
      source="HO, JAIN & ABBEEL · 2020  /  REFERENCE: PDF PAGES 14–18"
      className={`ddpm-slide slide18-step-${step}`}
    >
      <div className="ddpm-train-flow">
        <section className="ddpm-sample visible"><NoiseFrame label="x₀" caption="REAL SAMPLE" noise={0} seed={4} visible /></section>
        <ArrowRight className={step >= 1 ? 'visible' : ''} />
        <section className={`ddpm-time ${step >= 1 ? 'visible' : ''}`}><Dices /><span>RANDOM t</span><b>t ~ Uniform(1…T)</b><small>每次只抽一个时间步</small></section>
        <ArrowRight className={step >= 2 ? 'visible' : ''} />
        <section className={`ddpm-noisy ${step >= 2 ? 'visible' : ''}`}><NoiseFrame label="xₜ" caption="NOISY SAMPLE" noise={.62} seed={9} visible={step >= 2} /></section>
        <ArrowRight className={step >= 3 ? 'visible' : ''} />
        <section className={`ddpm-network ${step >= 3 ? 'visible' : ''}`}><Network /><span>εθ(xₜ, t)</span><b>DENOISING NETWORK</b><small>识别混入的噪声</small></section>
        <ArrowRight className={step >= 4 ? 'visible' : ''} />
        <section className={`ddpm-epsilon ${step >= 4 ? 'visible' : ''}`}><i>ε̂</i><span>PREDICTED NOISE</span><b>一步监督信号</b></section>
      </div>

      <div className={`ddpm-shortcut ${step >= 2 ? 'visible' : ''}`}>
        <span>TRAINING SHORTCUT</span><b>x₀ → 任意 xₜ</b><small>前向过程有闭式采样；训练无需真的逐步加噪到 t</small>
      </div>

      <div className={`ddpm-loss ${step >= 5 ? 'visible' : ''}`}>
        <Scale /><span>SIMPLE REGRESSION OBJECTIVE</span><b>‖ ε − εθ(xₜ, t) ‖²</b><small>经典 DDPM 常用 ε-prediction；后续也有 x₀ / v 等参数化</small>
      </div>

      <div className={`ddpm-contrast ${step >= 6 ? 'visible' : ''}`}>
        <section><span>GAN</span><b>Generator ↔ Discriminator</b><small>对抗博弈 · 平衡敏感</small></section>
        <Equal />
        <section><span>DDPM</span><b>Noisy sample → Predict noise</b><small>直接回归 · 训练目标清晰</small></section>
      </div>

      <BottomTakeaway visible={step >= 7}>
        <strong>GAN 学的是“骗过判别器”，</strong><span>DDPM 学的是“每一步该去掉多少噪声”。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
