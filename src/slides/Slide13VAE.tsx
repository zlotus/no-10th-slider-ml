import { ArrowRight, CircleDotDashed, Combine, Image, Sigma, Sparkles } from 'lucide-react'
import { LatentCloud, SceneImage } from '../components/GenerationVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'
import { Math } from '../components/Math'

export function Slide13VAE({ step }: SlideProps) {
  return (
    <SlideFrame
      number="13"
      eyebrow="VAE · PROBABILISTIC LATENT VARIABLES"
      title={<>VAE：把图像压到一个<span className="title-generation">可以采样的潜空间</span></>}
      tone="generation"
      source="KINGMA & WELLING · 2013  /  REFERENCE: PDF PAGES 02–05"
      className={`vae-slide slide13-step-${step}`}
    >
      <div className="vae-pipeline">
        <div className="vae-input"><SceneImage visible variant={0} label="x · IMAGE" /></div>
        <ArrowRight className={step >= 1 ? 'visible' : ''} />
        <div className={`vae-network encoder ${step >= 1 ? 'visible' : ''}`}><Image /><span>ENCODER</span><b>高维像素 → 紧凑表示</b></div>
        <ArrowRight className={step >= 2 ? 'visible' : ''} />
        <div className={`vae-parameters ${step >= 2 ? 'visible' : ''}`}>
          <Math className="attention-formula-math">
            {String.raw`q_φ\left(z | x\right)`}
          </Math>
          <div><b>μ</b><small>center</small></div><div><b>σ</b><small>spread</small></div>
          <em>不是一个固定点，而是一片概率区域</em>
        </div>
        <ArrowRight className={step >= 3 ? 'visible' : ''} />
        <div className={`vae-sample ${step >= 3 ? 'visible' : ''}`}><CircleDotDashed />
          <span>SAMPLE</span>
          <b>z = μ + σ ⊙ ε</b>
          <Math className="attention-formula-math">
            {String.raw`\varepsilon \sim \mathcal{N}(0, I)`}
          </Math>
        </div>
        <ArrowRight className={step >= 3 ? 'visible' : ''} />
        <div className={`vae-network decoder ${step >= 3 ? 'visible' : ''}`}><Combine /><span>DECODER</span><b>潜变量 → 图像</b></div>
        <ArrowRight className={step >= 3 ? 'visible' : ''} />
        <div className="vae-output"><SceneImage visible={step >= 3} variant={1} label="x̂ · RECONSTRUCT" /></div>
      </div>

      <div className="vae-latent-stage">
        <LatentCloud visible={step >= 2} sampled={step >= 5} regularized={step >= 4} />
        <div className={`kl-intuition ${step >= 4 ? 'visible' : ''}`}><Sigma /><span>KL REGULARIZATION</span><b>让每个后验分布不要散得太乱</b><small>向简单先验 N(0, I) 靠拢，保留可采样区域</small></div>
        <div className={`latent-sampling ${step >= 5 ? 'visible' : ''}`}>
          <Sparkles /><span>RANDOM z</span><b>同一片连续空间，可以采样出不同结果</b>
          <div><SceneImage visible={step >= 5} variant={0} /><SceneImage visible={step >= 5} variant={1} /><SceneImage visible={step >= 5} variant={2} /></div>
        </div>
      </div>

      <div className={`vae-tradeoff ${step >= 6 ? 'visible' : ''}`}>
        <div><b>CONTRIBUTION</b><span>压缩表示 + 概率生成</span></div><i />
        <div><b>LIMIT</b><span>像素重建目标常牺牲高频细节</span></div><small>下一步：怎样让图像更锐利、更像真的？</small>
      </div>

      <BottomTakeaway visible={step >= 7}>
        <strong>VAE 让潜空间不只“能压缩”，</strong><span>还能够从中采样并生成新图像。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
