import { Combine, EqualApproximately } from 'lucide-react'
import { MiniAttentionHead } from '../components/TransformerVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const tokens = ['小明', '把', '苹果', '给', '小红', '因为', '她', '饿'] as const
const heads = [
  { name: 'HEAD 01', hint: '可能关注句法邻接', relations: [[0, 1, .7], [1, 3, .9], [3, 4, .75]] as const },
  { name: 'HEAD 02', hint: '可能关注指代关系', relations: [[6, 4, 1], [6, 7, .45]] as const },
  { name: 'HEAD 03', hint: '可能关注局部词组', relations: [[1, 2, .8], [2, 3, .8], [5, 7, .75]] as const },
  { name: 'HEAD 04', hint: '可能关注长距离语义', relations: [[0, 7, .65], [4, 7, .85]] as const },
]

export function Slide08MultiHead({ step }: SlideProps) {
  return (
    <SlideFrame
      number="08"
      eyebrow="MULTI-HEAD ATTENTION · PARALLEL VIEWS"
      title={<>一个关系不够：<span className="title-transformer">同时从多个视角看</span></>}
      tone="transformer"
      source="VASWANI ET AL. · 2017  /  REFERENCE: TRANSFORMER SLIDE 18"
      className={`multihead-slide slide08-step-${step}`}
    >
      <div className="multihead-input">
        <span>SAME TOKEN SEQUENCE</span>
        <div>{tokens.map((token) => <b key={token}>{token}</b>)}</div>
        <small>每个 Head 都看到同一段输入，但拥有独立的投影参数</small>
      </div>

      <div className="head-stack">
        {heads.map((head, index) => (
          <MiniAttentionHead key={head.name} {...head} tokens={tokens} active={step >= index + 1} />
        ))}
      </div>

      <div className={`head-merge ${step >= 5 ? 'visible' : ''}`}>
        <Combine /><span>CONCAT</span><i>→</i><b>Wᴼ</b><i>→</i><strong>Mixed Representation</strong>
      </div>

      <div className={`head-caution ${step >= 5 ? 'visible' : ''}`}>
        <EqualApproximately /><span><b>“语法 / 指代 / 局部 / 长距离”是解释性示意，</b>Head 的职责并非人工固定，也不保证一一对应。</span>
      </div>

      <BottomTakeaway visible={step >= 6}>
        <strong>Multi-Head Attention</strong><span>让模型同时学习多种关系模式。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
