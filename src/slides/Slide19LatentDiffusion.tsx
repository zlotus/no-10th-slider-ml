import { ArrowRight, Box, Cpu, Image, Layers3, Sparkles } from 'lucide-react'
import { LatentCloud, SceneImage } from '../components/GenerationVisuals'
import { FeatureMap } from '../components/ModernGenerationVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

export function Slide19LatentDiffusion({ step }: SlideProps) {
  return (
    <SlideFrame
      number="19"
      eyebrow="LATENT DIFFUSION · PRACTICAL SCALE"
      title={<>Stable Diffusion：不在像素空间去噪，<span className="title-generation">而是在潜空间里做</span></>}
      tone="generation"
      source="ROMBACH ET AL. · 2021  /  REFERENCE: PDF PAGES 21–25 · MEDIA IMAGE-019"
      className={`ldm-slide slide19-step-${step}`}
    >
      <div className={`pixel-cost ${step >= 0 ? 'visible' : ''}`}><Image /><span>PIXEL SPACE</span><b>512 × 512 × 3</b><small>每一步都在高维像素上计算</small><em>EXPENSIVE × N STEPS</em></div>

      <div className="ldm-pipeline">
        <SceneImage visible={step >= 1} variant={0} label="x · PIXELS" />
        <ArrowRight className={step >= 1 ? 'visible' : ''} />
        <div className={`ldm-module vae-encoder ${step >= 1 ? 'visible' : ''}`}><Box /><span>VAE ENCODER</span><b>E(x)</b><small>感知压缩</small></div>
        <ArrowRight className={step >= 2 ? 'visible' : ''} />
        <div className={`ldm-latent ${step >= 2 ? 'visible' : ''}`}><FeatureMap visible={step >= 2} focus={[3, 8, 14, 19]} label="LATENT z" /><small>更小的表示空间</small></div>
        <ArrowRight className={step >= 3 ? 'visible' : ''} />
        <div className={`ldm-module denoiser ${step >= 3 ? 'visible' : ''}`}><Layers3 /><span>LATENT DIFFUSION</span><b>zₜ → z₀</b><small>反复去噪发生在这里</small></div>
        <ArrowRight className={step >= 4 ? 'visible' : ''} />
        <div className={`ldm-module vae-decoder ${step >= 4 ? 'visible' : ''}`}><Box /><span>VAE DECODER</span><b>D(z₀)</b><small>一次回到像素</small></div>
        <ArrowRight className={step >= 4 ? 'visible' : ''} />
        <SceneImage visible={step >= 4} variant={1} label="x̃ · IMAGE" />
      </div>

      <div className={`vae-callback ${step >= 2 ? 'visible' : ''}`}>
        <LatentCloud visible sampled={false} regularized />
        <div><span>CALLBACK · SLIDE 13</span><b>VAE 学到的潜空间，</b><strong>在这里成为 Diffusion 降低成本的工作区。</strong></div>
      </div>

      <div className={`ldm-equation ${step >= 5 ? 'visible' : ''}`}>
        <b>STABLE DIFFUSION</b><i>=</i><span>VAE</span><i>+</i><span>LATENT DIFFUSION</span><i>+</i><span>TEXT CONDITIONING</span>
      </div>

      <div className={`ldm-impact ${step >= 6 ? 'visible' : ''}`}>
        <Cpu /><div><span>LOWER COMPUTE</span><b>高分辨率生成更实际</b></div><Sparkles /><div><span>OPEN ECOSYSTEM</span><b>微调与控制生态扩展</b></div>
      </div>

      <BottomTakeaway visible={step >= 7}>
        <strong>Stable Diffusion 的关键不是发明去噪，</strong><span>而是让去噪进入一个更便宜的潜空间。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
