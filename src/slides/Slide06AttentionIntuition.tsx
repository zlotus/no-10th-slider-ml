import { ArrowRight, Footprints, MousePointer2, Search } from 'lucide-react'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const words = ['小明', '把', '苹果', '给了', '小红', '，', '因为', '她', '饿了']

export function Slide06AttentionIntuition({ step }: SlideProps) {
  return (
    <SlideFrame
      number="06"
      eyebrow="ATTENTION · DYNAMIC RETRIEVAL"
      title={<>Attention：让当前 token <span className="title-transformer">主动寻找信息</span></>}
      tone="transformer"
      source="BAHDANAU ET AL. · 2014  /  REFERENCE: TRANSFORMER SLIDES 10–15"
      className={`attention-intuition slide06-step-${step}`}
    >
      <div className="attention-sentence">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className={`${word === '她' ? 'query' : ''} ${word === '小红' ? 'answer' : ''}`}>{word}</span>
        ))}
        <svg viewBox="0 0 1420 300" aria-hidden="true">
          <path className={`weight-line answer-line ${step >= 2 ? 'drawn' : ''}`} d="M1168 128 C1050 4 770 4 695 128" />
          <path className={`weight-line ming-line ${step >= 3 ? 'drawn' : ''}`} d="M1168 128 C975 -62 260 -48 152 128" />
          <path className={`weight-line apple-line ${step >= 3 ? 'drawn' : ''}`} d="M1168 128 C1010 36 592 44 476 128" />
          <path className={`weight-line hungry-line ${step >= 3 ? 'drawn' : ''}`} d="M1168 128 C1220 60 1310 62 1370 128" />
        </svg>
        <div className={`query-badge ${step >= 1 ? 'visible' : ''}`}><MousePointer2 /><span>CURRENT QUERY</span><b>“她”在找谁？</b></div>
        <div className={`weight-legend ${step >= 3 ? 'visible' : ''}`}><span>线宽 / opacity</span><i /><b>动态权重</b></div>
      </div>

      <div className={`attention-result ${step >= 3 ? 'visible' : ''}`}>
        <Search /><span>ATTENTION RESULT</span><b>小红</b><strong>0.72</strong><small>当前需求改变，权重也会重新计算</small>
      </div>

      <div className={`retrieval-compare ${step >= 4 ? 'visible' : ''}`}>
        <div className={step >= 5 ? 'dimmed' : ''}>
          <Footprints /><span>RNN</span><b>信息逐步传过来</b><p>{['h₁', 'h₂', 'h₃', 'h₄', '…', 'hₜ'].map((state) => <i key={state}>{state}</i>)}</p>
        </div>
        <ArrowRight />
        <div className={step >= 5 ? 'focus' : ''}>
          <Search /><span>ATTENTION</span><b>当前 token 直接查整段输入</b><p><i>QUERY</i><em>→</em><i>RELEVANT INFO</i></p>
        </div>
      </div>

      <div className={`attention-history-note ${step >= 5 ? 'visible' : ''}`}>
        <span>HISTORICAL BRIDGE</span><b>Bahdanau Attention</b><i>→</i><strong>Transformer Self-Attention</strong>
        <small>前者由 Decoder 查询 Encoder；后者让同一序列内部彼此查询。直觉相通，结构不同。</small>
      </div>

      <BottomTakeaway visible={step >= 6}>
        <strong>Attention 不是“记住所有历史”，</strong><span>而是按当前需求动态取信息。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
