import { ArrowRight, Route, Waves } from 'lucide-react'
import { VelocityField } from '../components/ModernGenerationVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

export function Slide22FlowMatching({ step }: SlideProps) {
  return (
    <SlideFrame
      number="22"
      eyebrow="FLOW MATCHING · DISTRIBUTION TRANSPORT"
      title={<>从 Diffusion 到 Flow：不只学“怎么去噪”，而是学<span className="title-generation">“怎么走过去”</span></>}
      tone="generation"
      source="LIPMAN ET AL. · 2022  /  LIU, GONG & LIU · RECTIFIED FLOW · 2022"
      className={`flow-slide slide22-step-${step}`}
    >
      <div className={`diffusion-path-sketch ${step >= 0 ? 'visible' : ''}`}>
        <header><Waves /><span>DIFFUSION VIEW</span><b>many local denoising steps</b></header>
        <svg viewBox="0 0 610 170" aria-hidden="true"><circle cx="30" cy="84" r="24" /><path d="M55 85 C110 15 160 155 220 80 S326 22 384 92 S486 155 570 85" /><circle className="end" cx="580" cy="84" r="24" /></svg>
        <small>NOISE</small><small>IMAGE</small>
      </div>

      <div className={`flow-reframe ${step >= 1 ? 'visible' : ''}`}><span>REFRAME</span><b>去掉什么？</b><ArrowRight /><strong>此刻该往哪里移动？</strong></div>

      <div className={`flow-field-stage ${step >= 2 ? 'visible' : ''}`}>
        <VelocityField visible={step >= 2} straightened={step >= 5} />
        <div className={`flow-equation ${step >= 3 ? 'visible' : ''}`}><span>VELOCITY FIELD</span><b>dx / dt = vθ(x, t)</b><small>模型学习随时间变化的移动方向</small></div>
      </div>

      <div className={`flow-matching-note ${step >= 4 ? 'visible' : ''}`}><Route /><span>FLOW MATCHING</span><b>回归一条概率路径上的向量场</b><small>Diffusion path 可以包含在更一般的概率路径家族中</small></div>
      <div className={`rectified-note ${step >= 5 ? 'visible' : ''}`}><span>RECTIFIED FLOW</span><b>目标：让运输路径更直接、更易用粗步长逼近</b><small>“更直”是学习目标与经验结果，不保证每条实际轨迹完美直线</small></div>
      <div className={`flow-implication ${step >= 6 ? 'visible' : ''}`}><b>SIMPLER PATH</b><i>→</i><span>potentially fewer sampling steps</span><small>重要发展路线，而非对所有 Diffusion 的绝对替代</small></div>

      <BottomTakeaway visible={step >= 7}>
        <strong>生成问题正在从“逐步去噪”，</strong><span>进一步抽象成“如何把一个分布运输到另一个分布”。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
