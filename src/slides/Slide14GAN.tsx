import { AlertTriangle, ArrowRight, Gauge, RefreshCw, ScanSearch, Sparkles, Waves } from 'lucide-react'
import { SceneImage } from '../components/GenerationVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

export function Slide14GAN({ step }: SlideProps) {
  return (
    <SlideFrame
      number="14"
      eyebrow="GAN · ADVERSARIAL LEARNING"
      title={<>GAN：生成器与判别器的<span className="title-generation">对抗博弈</span></>}
      tone="generation"
      source="GOODFELLOW ET AL. · 2014  /  REFERENCE: PDF PAGES 06–08"
      className={`gan-slide slide14-step-${step}`}
    >
      <div className="gan-arena">
        <div className="gan-noise"><Waves /><span>z ~ p(z)</span><b>RANDOM NOISE</b></div>
        <ArrowRight className={step >= 1 ? 'visible' : ''} />
        <div className={`gan-network generator ${step >= 1 ? 'visible' : ''}`}><Sparkles /><span>GENERATOR · G</span><b>把噪声伪造成图像</b><small>learn to fool</small></div>
        <ArrowRight className={step >= 2 ? 'visible' : ''} />
        <div className="gan-fake"><SceneImage visible={step >= 2} variant={2} label="FAKE IMAGE" /></div>
        <div className={`gan-real ${step >= 3 ? 'visible' : ''}`}><SceneImage visible={step >= 3} variant={0} label="REAL IMAGE" /></div>
        <div className={`gan-merge ${step >= 3 ? 'visible' : ''}`}><span>REAL</span><i /><span>FAKE</span></div>
        <div className={`gan-network discriminator ${step >= 3 ? 'visible' : ''}`}><ScanSearch /><span>DISCRIMINATOR · D</span><b>判断输入是真是假</b><small>learn to detect</small></div>
        <div className={`gan-verdict ${step >= 3 ? 'visible' : ''}`}><b>REAL?</b><span>0.52</span></div>
        <svg className="gan-flow-lines" viewBox="0 0 1080 560" aria-hidden="true">
          <path className={step >= 2 ? 'drawn' : ''} d="M518 225 H618" />
          <path className={step >= 3 ? 'drawn' : ''} d="M730 225 H826" />
          <path className={step >= 3 ? 'drawn' : ''} d="M730 423 H780 Q826 423 826 354" />
          <path className={`feedback ${step >= 4 ? 'drawn' : ''}`} d="M943 351 C952 520 374 550 370 376" />
        </svg>
        <div className={`gan-feedback ${step >= 4 ? 'visible' : ''}`}><RefreshCw /><span>ALTERNATING UPDATES</span><b>D 变准 → G 被迫变真</b></div>
      </div>

      <div className="gan-tension">
        <div className={`quality-rise ${step >= 5 ? 'visible' : ''}`}>
          <header><Sparkles /><span>IMAGE QUALITY</span><b>锐利度与真实感显著提升</b></header>
          <div><SceneImage visible={step >= 5} variant={0} /><SceneImage visible={step >= 5} variant={1} /><SceneImage visible={step >= 5} variant={2} /></div>
        </div>
        <div className={`training-balance ${step >= 5 ? 'visible' : ''} ${step >= 6 ? 'unstable' : ''}`}>
          <header><Gauge /><span>TRAINING BALANCE</span><b>像走钢丝</b></header>
          <div className="balance-line"><i /><b>G</b><b>D</b></div>
          <small>两方任一过强，都可能让梯度失效或训练振荡</small>
        </div>
        <div className={`mode-collapse ${step >= 6 ? 'visible' : ''}`}><AlertTriangle /><span>MODE COLLAPSE</span><b>少数“安全答案”反复出现，分布覆盖不足</b></div>
      </div>

      <BottomTakeaway visible={step >= 7}>
        <strong>GAN 把图像生成质量拉高了，</strong><span>但训练过程像走钢丝。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
