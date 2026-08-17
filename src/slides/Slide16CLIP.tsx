import { ArrowDown, ArrowRight, Image, Link2, ScanText, Sparkles, WandSparkles } from 'lucide-react'
import { SceneImage, SimilaritySpace } from '../components/GenerationVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

export function Slide16CLIP({ step }: SlideProps) {
  return (
    <SlideFrame
      number="16"
      eyebrow="CLIP · CONTRASTIVE LANGUAGE–IMAGE PRE-TRAINING"
      title={<>CLIP：文图对齐，不是“先看图再分类”，<br />而是进入<span className="title-generation">共同语义空间</span></>}
      tone="generation"
      source="RADFORD ET AL. · 2021  /  REFERENCE: PDF PAGES 12–13"
      className={`clip-slide slide16-step-${step}`}
    >
      <div className="clip-towers">
        <section className="clip-text-tower visible"><div className="clip-input text"><ScanText /><b>“月球上的宇航员猫”</b></div><ArrowDown /><div className="clip-encoder"><span>TEXT ENCODER</span><b>Transformer</b></div><ArrowDown /><div className="clip-embedding"><i>T</i><span>text embedding</span></div></section>
        <section className={`clip-image-tower ${step >= 1 ? 'visible' : ''}`}><SceneImage visible={step >= 1} variant={0} label="PAIRED IMAGE" /><ArrowDown /><div className="clip-encoder"><span>IMAGE ENCODER</span><b>ResNet / ViT</b></div><ArrowDown /><div className="clip-embedding"><i>I</i><span>image embedding</span></div></section>
      </div>

      <div className="clip-space-stage">
        <SimilaritySpace visible={step >= 2} matched={step >= 3} separated={step >= 4} />
        <div className={`contrastive-legend ${step >= 3 ? 'visible' : ''}`}>
          <div><Link2 /><span>MATCHED PAIR</span><b>拉近</b></div>
          <div className={step >= 4 ? 'visible' : ''}><span>UNMATCHED</span><b>推远</b></div>
          <small>一个 batch 内，两两计算相似度</small>
        </div>
      </div>

      <div className={`clip-boundary ${step >= 5 ? 'visible' : ''}`}>
        <b>CLIP ≠ GENERATOR</b><span>它不负责逐步画出像素；它负责把文字与视觉概念放到同一张语义地图上。</span>
      </div>

      <div className={`condition-bridge ${step >= 6 ? 'visible' : ''}`}>
        <div><ScanText /><span>PROMPT</span><b>“月球上的宇航员猫”</b></div><ArrowRight /><div><Sparkles /><span>TEXT CONDITION</span><b>semantic direction</b></div><ArrowRight /><div className="future-generator"><WandSparkles /><span>IMAGE GENERATION</span><b>接下来：怎样稳定地生成？</b></div>
      </div>

      <BottomTakeaway visible={step >= 7}>
        <strong>CLIP 不是负责“画图”，</strong><span>而是让模型理解“文字说的是什么图”。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
