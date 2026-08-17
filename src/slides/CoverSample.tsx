import { ArrowRight, Combine } from 'lucide-react'
import { SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const transformerNodes = ['2017 · TRANSFORMER', 'VIT', 'REPRESENTATION']
const generationNodes = ['2013 · VAE', 'GAN', 'DDPM', 'LDM']

export function CoverSample({ step }: SlideProps) {
  return (
    <SlideFrame
      number="01"
      eyebrow="ML SYSTEMS · SAMPLE A"
      tone="hybrid"
      title={
        <>
          近十年 <span className="title-transformer">Transformer</span>
          <br />与<span className="title-generation">文图生成</span>算法演进
        </>
      }
      className={`cover-sample cover-step-${step}`}
    >
      <div className={`cover-subtitle reveal-up ${step >= 1 ? 'visible' : ''}`}>
        从 <b>Attention</b> 到 <b>Diffusion</b>，再到多模态生成
      </div>

      <div className="cover-routes" aria-label="Transformer 与图像生成两条技术路线最终汇合">
        <div className={`route-label transformer-label ${step >= 2 ? 'visible' : ''}`}>
          <span>01</span><b>REPRESENTATION</b><small>信息如何交互</small>
        </div>
        <div className={`route-label generation-label ${step >= 3 ? 'visible' : ''}`}>
          <span>02</span><b>GENERATION</b><small>样本如何产生</small>
        </div>

        <svg className="route-lines" viewBox="0 0 1530 370" aria-hidden="true">
          <path className={`transformer-route ${step >= 2 ? 'drawn' : ''}`} d="M218 102 H1120 C1210 102 1238 154 1290 185" />
          <path className={`generation-route ${step >= 3 ? 'drawn' : ''}`} d="M218 270 H1120 C1210 270 1238 216 1290 185" />
          <path className={`merge-route ${step >= 4 ? 'drawn' : ''}`} d="M1290 185 H1432" />
        </svg>

        <div className={`route-nodes transformer-nodes ${step >= 2 ? 'visible' : ''}`}>
          {transformerNodes.map((node, index) => <span key={node} style={{ transitionDelay: `${index * 70}ms` }}>{node}{index < transformerNodes.length - 1 && <ArrowRight />}</span>)}
        </div>
        <div className={`route-nodes generation-nodes ${step >= 3 ? 'visible' : ''}`}>
          {generationNodes.map((node, index) => <span key={node} style={{ transitionDelay: `${index * 60}ms` }}>{node}{index < generationNodes.length - 1 && <ArrowRight />}</span>)}
        </div>

        <div className={`merge-node ${step >= 4 ? 'visible' : ''}`}>
          <Combine />
          <div><span>MULTIMODAL</span><b>Generation</b><small>表示 × 生成过程</small></div>
        </div>
      </div>

      <div className={`cover-thesis ${step >= 4 ? 'visible' : ''}`}>
        两条技术路线不断演进，<strong>最终在现代多模态生成系统中汇合。</strong>
      </div>
    </SlideFrame>
  )
}
