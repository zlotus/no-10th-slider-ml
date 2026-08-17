import { ArrowRight, Boxes, Image, ScanSearch, Sparkles, Type } from 'lucide-react'
import { SceneImage } from '../components/GenerationVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const generationChallenges = [
  ['HIGH-DIMENSIONAL', '百万级像素共同组成输出', Boxes],
  ['MULTI-MODAL', '同一句话有许多合理答案', Sparkles],
  ['COHERENCE', '全局结构与局部纹理都要成立', Image],
  ['ALIGNMENT', '还要准确响应文本条件', Type],
] as const

export function Slide12GenerationChallenge({ step }: SlideProps) {
  return (
    <SlideFrame
      number="12"
      eyebrow="IMAGE GENERATION · THE PROBLEM"
      title={<>从“理解图像”到“生成图像”，<span className="title-generation">难度为什么陡增？</span></>}
      tone="generation"
      source="REFERENCE: PDF PAGE 01 · PROJECT REDRAW"
      className={`generation-challenge slide12-step-${step}`}
    >
      <div className="challenge-comparison">
        <section className="recognition-panel visible">
          <header><span>01</span><b>RECOGNITION</b><small>在给定图像上做判断</small></header>
          <div className="recognition-flow">
            <SceneImage visible variant={0} muted label="INPUT IMAGE" />
            <ArrowRight />
            <div className="label-output"><ScanSearch /><span>LABEL</span><b>宇航员猫</b><small>one answer</small></div>
          </div>
          <p>输入已经存在，模型只需找到决策边界。</p>
        </section>

        <div className={`challenge-vs ${step >= 1 ? 'visible' : ''}`}><span>VS</span></div>

        <section className={`generation-panel ${step >= 1 ? 'visible' : ''}`}>
          <header><span>02</span><b>GENERATION</b><small>从分布中造出一个合理答案</small></header>
          <div className="generation-flow">
            <div className="condition-stack"><i>ε</i><i>z</i><i>“月球上的宇航员猫”</i></div>
            <ArrowRight />
            <div className="candidate-images">
              <SceneImage visible={step >= 1} variant={0} label="SAMPLE A" />
              <SceneImage visible={step >= 3} variant={1} label="SAMPLE B" />
              <SceneImage visible={step >= 3} variant={2} label="SAMPLE C" />
            </div>
          </div>
          <p>没有唯一标准答案；每个样本都要真实、完整并符合条件。</p>
        </section>
      </div>

      <div className={`challenge-spectrum ${step >= 2 ? 'visible' : ''}`}>
        {generationChallenges.map(([label, copy, Icon], index) => (
          <div key={label} className={step >= Math.min(4, index + 2) ? 'visible' : ''}>
            <Icon /><span>{label}</span><b>{copy}</b>
          </div>
        ))}
      </div>

      <div className={`distribution-question ${step >= 5 ? 'visible' : ''}`}>
        <span>NEXT QUESTION</span><b>怎样学习一个“会出图”的分布？</b><small>VAE 从一个更紧凑、可采样的空间开始。</small>
      </div>

      <BottomTakeaway visible={step >= 6}>
        <strong>理解是在已有图像上做判断；</strong><span>生成是在巨大可能空间里“造出一个合理答案”。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
