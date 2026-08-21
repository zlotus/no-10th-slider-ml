import { ArrowRight, Boxes, Braces, Network, ScanLine } from 'lucide-react'
import { PatchGrid } from '../components/TransformerVisuals'
import { FeatureMap } from '../components/ModernGenerationVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

export function Slide21DiT({ step }: SlideProps) {
  return (
    <SlideFrame
      number="21"
      eyebrow="DIFFUSION TRANSFORMER · BACKBONE SHIFT"
      title={<>Diffusion Transformer：连生成骨干也开始<span className="hybrid-title"><i>Transformer 化</i></span></>}
      tone="hybrid"
      source="PEEBLES & XIE · 2022/23  /  REFERENCE: PDF PAGES 28–30 · MEDIA IMAGE-022"
      className={`dit-slide slide21-step-${step}`}
    >
      <section className={`backbone-panel unet-panel ${step >= 0 ? 'visible' : ''} ${step >= 5 ? 'dimmed' : ''}`}>
        <header><span>CLASSIC DIFFUSION</span><b>U-NET BACKBONE</b></header>
        <FeatureMap visible focus={[2, 5, 9, 16]} label="NOISY LATENT" />
        <ArrowRight /><div className="unet-shape"><Network /><i /><b>U-NET</b><small>multi-scale + <br></br>skip connections</small></div>
        <ArrowRight /><div className="backbone-output"><span>ε / v</span><small>PREDICTION</small></div>
      </section>

      <section className={`backbone-panel dit-panel ${step >= 1 ? 'visible' : ''} ${step >= 5 ? 'dominant' : ''}`}>
        <header><span>DIFFUSION TRANSFORMER</span><b>TRANSFORMER BACKBONE</b></header>
        <div className="dit-patch-source"><PatchGrid active={step >= 2} highlighted={step >= 2} /><span>NOISY LATENT</span></div>
        <ArrowRight className={step >= 2 ? 'visible' : ''} />
        <div className={`dit-token-column ${step >= 3 ? 'visible' : ''}`}>{['p₁', 'p₂', 'p₃', '…', 'pₙ'].map((token) => <i key={token}>{token}</i>)}<span>PATCH TOKENS</span></div>
        <ArrowRight className={step >= 3 ? 'visible' : ''} />
        <div className={`dit-blocks ${step >= 4 ? 'visible' : ''}`}><Braces /><span>TRANSFORMER BLOCK × N</span><b>Self-Attention + MLP</b><small>t / condition 被注入块内</small></div>
        <ArrowRight className={step >= 4 ? 'visible' : ''} />
        <div className={`backbone-output ${step >= 4 ? 'visible' : ''}`}><span>ε / v</span><small>PREDICTION</small></div>
      </section>

      <div className={`dit-callback ${step >= 5 ? 'visible' : ''}`}><ScanLine /><span>CALLBACK · SLIDE 11</span><b>ViT：Image → Patch → Transformer</b><i>→</i><strong>DiT：Noisy Latent → Patch → Transformer</strong></div>
      <div className={`dit-route ${step >= 6 ? 'visible' : ''}`}><Boxes /><span>AN ARCHITECTURE FAMILY</span><b>DiT · PixArt · MMDiT · …</b><small>DiT 是重要路线代表，不等于所有现代 Transformer 生图架构</small></div>

      <BottomTakeaway visible={step >= 7}>
        <strong>Transformer 从条件编码器，</strong><span>进一步走进了生成模型本体。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
