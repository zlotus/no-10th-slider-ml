import { AudioLines, Braces, Image, Languages, ScanText, Video } from 'lucide-react'
import { ModalityToken } from '../components/TransformerVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

export function Slide02WhyTransformer({ step }: SlideProps) {
  return (
    <SlideFrame
      number="02"
      eyebrow="TRANSFORMER · FROM NLP TO EVERYTHING"
      title={<>为什么从 <span className="title-transformer">Transformer</span> 开始讲</>}
      tone="transformer"
      source="VASWANI ET AL. · 2017  /  REFERENCE: TRANSFORMER SLIDES 01–03"
      className={`why-transformer slide02-step-${step}`}
    >
      <div className="token-universe">
        <div className={`universe-core ${step >= 1 ? 'visible' : ''}`}>
          <Braces /><small>GENERAL BACKBONE</small><b>Transformer</b><span>RELATIONSHIP ENGINE</span>
        </div>

        <ModalityToken icon={<ScanText />} label="Text" unit="word / subword" active={step >= 0} className="modality-text" />
        <ModalityToken icon={<Languages />} label="Language Model" unit="understand + generate" active={step >= 2} className="modality-language" />
        <ModalityToken icon={<Image />} label="Vision" unit="image patch" active={step >= 3} className="modality-vision" />
        <ModalityToken icon={<AudioLines />} label="Audio" unit="audio frame" active={step >= 4} className="modality-audio" />
        <ModalityToken icon={<Video />} label="Video" unit="space × time" active={step >= 4} className="modality-video" />

        <svg className="universe-links" viewBox="0 0 1500 610" aria-hidden="true">
          <path className={step >= 1 ? 'drawn' : ''} d="M273 304 C420 304 468 304 610 304" />
          <path className={step >= 2 ? 'drawn' : ''} d="M892 304 C1030 304 1086 184 1234 164" />
          <path className={step >= 3 ? 'drawn' : ''} d="M892 304 C1034 304 1090 290 1234 290" />
          <path className={step >= 4 ? 'drawn' : ''} d="M892 304 C1034 304 1092 415 1234 428" />
          <path className={step >= 4 ? 'drawn' : ''} d="M750 425 C750 506 650 530 538 535" />
        </svg>

        <div className={`token-normal-form ${step >= 5 ? 'visible' : ''} ${step >= 6 ? 'focus' : ''}`}>
          <span>TEXT</span><span>IMAGE</span><span>AUDIO</span><span>VIDEO</span><i>→</i><b>TOKEN</b><i>→</i><em>MULTIMODAL / IMAGE GENERATION</em>
          <small>只要能表示成 token，就能进入同一套关系计算</small>
        </div>
      </div>

      <BottomTakeaway visible={step >= 6}>
        <strong>Transformer 从一种 NLP 架构，</strong><span>逐渐演化成通用的信息处理骨架。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
