import { ArrowDown, ArrowRight, EyeOff, Languages, Network, ScanSearch } from 'lucide-react'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const sourceTokens = ['I', 'love', 'AI']
const targetTokens = ['我', '喜', '欢', 'AI']

export function Slide09EncoderDecoder({ step }: SlideProps) {
  return (
    <SlideFrame
      number="09"
      eyebrow="ORIGINAL TRANSFORMER · ENCODER + DECODER"
      title={<>完整 Transformer：<span className="title-transformer">理解与生成</span></>}
      tone="transformer"
      source="VASWANI ET AL. · 2017  /  REFERENCE: TRANSFORMER SLIDES 09–15"
      className={`encoder-decoder-slide slide09-step-${step}`}
    >
      <div className="translation-ribbon">
        <Languages /><div>{sourceTokens.map((token) => <span key={token}>{token}</span>)}</div><ArrowRight /><div>{targetTokens.map((token, index) => <span key={token} className={step >= 5 && index <= Math.min(3, (step - 5) * 2 + 1) ? 'visible' : ''}>{token}</span>)}</div>
      </div>

      <div className="transformer-architecture">
        <section className={`architecture-tower encoder-tower ${step >= 1 ? 'visible' : ''}`}>
          <header><span>01</span><b>ENCODER × N</b><small>UNDERSTAND</small></header>
          <div className="tower-block attention-block"><ScanSearch /><span>SELF-ATTENTION</span><small>输入内部互相理解 · residual + norm</small></div>
          <div className="tower-block"><span>ADD & NORM</span><small>残差连接与归一化</small></div>
          <div className="tower-block"><Network /><span>FEED FORWARD</span><small>逐位置变换 · residual + norm</small></div>
          <div className="tower-input">INPUT EMBEDDING + POSITION</div>
        </section>

        <div className={`representation-bus ${step >= 2 ? 'visible' : ''}`}>
          <span>ENCODER OUTPUT</span><b>CONTEXTUAL REPRESENTATION</b><i /><ArrowRight />
          <small>每个输入 token 的上下文化表示</small>
        </div>

        <section className={`architecture-tower decoder-tower ${step >= 3 ? 'visible' : ''}`}>
          <header><span>02</span><b>DECODER × N</b><small>GENERATE</small></header>
          <div className="tower-block masked-block"><EyeOff /><span>MASKED SELF-ATTENTION</span><small>不能偷看未来 token · residual + norm</small></div>
          <div className={`tower-block cross-block ${step >= 4 ? 'focus' : ''}`}><ScanSearch /><span>CROSS-ATTENTION</span><small>从 Encoder 输出中取信息 · residual + norm</small></div>
          <div className="tower-block"><Network /><span>FEED FORWARD</span><small>逐位置变换 · residual + norm</small></div>
          <div className="tower-input">SHIFTED OUTPUT + POSITION</div>
        </section>

        <svg className="architecture-flow" viewBox="0 0 1500 590" aria-hidden="true">
          <path className={step >= 1 ? 'drawn' : ''} d="M345 530 V445" />
          <path className={step >= 2 ? 'drawn' : ''} d="M610 220 H890" />
          <path className={step >= 3 ? 'drawn' : ''} d="M1152 530 V445" />
          <path className={step >= 4 ? 'drawn cross-path' : ''} d="M610 220 C735 210 782 300 890 310" />
        </svg>
      </div>

      <div className={`autoregressive-note ${step >= 5 ? 'visible' : ''}`}>
        <ArrowDown /><span>AUTOREGRESSIVE DECODING</span><b>我 → 喜 → 欢 → AI</b><small>训练可用 mask 并行；实际自回归生成仍按 token 逐步进行</small>
      </div>

      <BottomTakeaway visible={step >= 7}>
        <strong>原始 Transformer</strong><span>是一个完整的“理解 + 生成”系统。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
