import { CircleDotDashed, Plus, RotateCw } from 'lucide-react'
import { PositionWave, RotaryPair } from '../components/TransformerVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import { TokenRow } from '../components/MLVisuals'
import type { SlideProps } from '../presentation/types'

const first = ['我', '爱', '你']
const second = ['你', '爱', '我']

export function Slide05PositionEncoding({ step }: SlideProps) {
  return (
    <SlideFrame
      number="05"
      eyebrow="POSITION · ORDER AFTER PARALLELISM"
      title={<>并行之后，<span className="title-transformer">顺序从哪里来？</span></>}
      tone="transformer"
      source="VASWANI ET AL. · 2017  /  SU ET AL. · RoFormer · 2021"
      className={`position-slide slide05-step-${step}`}
    >
      <div className="order-contrast">
        <div><TokenRow tokens={first} active label="A" /><small>我 → 爱 → 你</small></div>
        <span>≠</span>
        <div className={step >= 1 ? 'visible' : ''}><TokenRow tokens={second} active label="B" /><small>你 → 爱 → 我</small></div>
        <p className={step >= 1 ? 'visible' : ''}>同样的 token，不同位置会改变含义。</p>
      </div>

      <section className={`sinusoidal-panel ${step >= 2 ? 'visible' : ''}`}>
        <header><span>2017 · ORIGINAL TRANSFORMER</span><b>Sinusoidal Positional Encoding</b></header>
        <div className="position-sum">
          <span>TOKEN<br />EMBEDDING</span><Plus /><span>POSITION<br />ENCODING</span><b>→</b><strong>TRANSFORMER INPUT</strong>
        </div>
        <PositionWave active={step >= 3} />
        <small className={`position-input-note ${step >= 4 ? 'visible' : ''}`}>位置向量在进入 Attention 前与 token embedding 相加</small>
      </section>

      <section className={`rope-panel ${step >= 5 ? 'visible' : ''}`}>
        <header><RotateCw /><span>LATER · RoPE</span><b>旋转 Q / K，而不是让模型获得并行能力</b></header>
        <div className="rotary-grid">
          <RotaryPair label="Q" position={1} active={step >= 5} />
          <RotaryPair label="Q" position={2} active={step >= 5} />
          <RotaryPair label="K" position={1} active={step >= 6} />
          <RotaryPair label="K" position={2} active={step >= 6} />
        </div>
        <div className={`rope-score ${step >= 6 ? 'visible' : ''}`}><CircleDotDashed /><span>Q<sub>rope</sub> K<sub>rope</sub>ᵀ</span><small>相对位置进入 Attention Score</small></div>
      </section>

      <BottomTakeaway visible={step >= 7}>
        <span><b>Attention：</b>谁和谁相关</span><i /><strong><b>Position：</b>它们在哪里、相隔多远</strong>
      </BottomTakeaway>
    </SlideFrame>
  )
}
