import { ConvergenceMark } from '../components/ModernGenerationVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const representation = [
  ['2017', 'Transformer'], ['2018', 'BERT'], ['2019', 'GPT-2'], ['2020', 'ViT'], ['2021', 'CLIP'], ['2022/23', 'DiT'], ['NOW', 'Multimodal'],
] as const
const generation = [
  ['2013', 'VAE'], ['2014', 'GAN'], ['2016+', 'Autoregressive'], ['2020', 'DDPM'], ['2021/22', 'LDM'], ['2022+', 'Flow'], ['NOW', 'Generative AI'],
] as const

export function Slide24Timeline({ step }: SlideProps) {
  const count = step === 0 ? 1 : step === 1 ? 3 : step === 2 ? 5 : representation.length
  return (
    <SlideFrame
      number="24"
      eyebrow="2013 → NOW · TWO TECHNICAL ROUTES"
      title={<>十年演进：<span className="hybrid-title"><i>两条路线</i>，最终汇合</span></>}
      tone="hybrid"
      source="SELECTED MILESTONES · YEARS FOLLOW ORIGINAL PUBLICATION / PREPRINT DATES"
      className={`timeline-slide slide24-step-${step}`}
    >
      <div className="dual-timeline">
        <section className="timeline-track representation-track">
          <header><span>REPRESENTATION</span><b>信息如何表示与交互</b></header>
          <div className="track-line"><i style={{ width: `${((count - 1) / (representation.length - 1)) * 100}%` }} /></div>
          <div className="timeline-nodes">{representation.map(([year, label], index) => <div key={label} className={index < count ? 'visible' : ''}><i /><span>{year}</span><b>{label}</b></div>)}</div>
        </section>
        <section className="timeline-track generation-track">
          <header><span>GENERATION</span><b>样本如何从分布中产生</b></header>
          <div className="track-line"><i style={{ width: `${((count - 1) / (generation.length - 1)) * 100}%` }} /></div>
          <div className="timeline-nodes">{generation.map(([year, label], index) => <div key={label} className={index < count ? 'visible' : ''}><i /><span>{year}</span><b>{label}</b></div>)}</div>
        </section>
      </div>

      <div className={`timeline-crossings ${step >= 4 ? 'visible' : ''}`}>
        <div className="cross-a"><span>DALL·E / VISUAL TOKENS</span><small>language modeling meets images</small></div>
        <div className="cross-b"><span>CLIP + CROSS-ATTENTION</span><small>representation conditions generation</small></div>
        <div className="cross-c"><span>DiT / MMDiT</span><small>Transformer becomes the generator backbone</small></div>
        <svg viewBox="0 0 1540 380" aria-hidden="true"><path d="M510 26 C510 104 414 226 414 352" /><path d="M915 26 C915 126 1012 220 1012 352" /><path d="M1215 26 C1215 128 1332 218 1332 352" /></svg>
      </div>

      <div className={`timeline-convergence ${step >= 5 ? 'visible' : ''}`}><ConvergenceMark visible={step >= 5} /><div><span>THE ROUTES MERGE</span><b>MODERN GENERATIVE AI</b><small>multimodal representation × diffusion / flow generation</small></div></div>

      <BottomTakeaway visible={step >= 6}>
        <strong>十年不是两份算法清单，</strong><span>而是“表示”与“生成”不断互相借力、最终汇合。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
