import { AlertCircle, CornerDownRight, Rows3 } from 'lucide-react'
import { AttentionMatrix, TokenRow } from '../components/MLVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const tokens = ['我', '喜', '欢', '人', '工', '智', '能'] as const

export function TransformerSample({ step }: SlideProps) {
  return (
    <SlideFrame
      number="04"
      eyebrow="TRANSFORMER · REPRESENTATION"
      title={<>把“顺序”与“关系计算”<span className="title-transformer">解耦</span></>}
      tone="transformer"
      source="VASWANI ET AL. · 2017  /  REFERENCE: TRANSFORMER SLIDES 08 · 17"
      className={`transformer-sample transformer-step-${step}`}
    >
      <div className="attention-stage">
        <section className={`rnn-sequence ${step >= 1 ? 'compressed' : ''}`}>
          <header><span>BEFORE</span><b>RNN</b><small className={step >= 1 ? 'visible' : ''}>SEQUENTIAL</small></header>
          <div className="rnn-chain">
            {tokens.map((token, index) => (
              <div key={token} className="rnn-unit" style={{ transitionDelay: `${index * 65}ms` }}>
                <i>{`h${index + 1}`}</i><b>{token}</b>{index < tokens.length - 1 && <em>→</em>}
              </div>
            ))}
          </div>
          <p>RNN 把<strong>顺序</strong>写进计算流程</p>
        </section>

        <section className={`transformer-workspace ${step >= 2 ? 'visible' : ''}`}>
          <header><span>NOW</span><b>SELF-ATTENTION</b><small>ALL TOKENS AT ONCE</small></header>
          <div className="vector-workbench">
            <TokenRow tokens={tokens} label="X" active={step >= 2} />
            <div className={`projection-rows ${step >= 3 ? 'visible' : ''}`}>
              <TokenRow tokens={tokens} label="Q" active={step >= 3} compact />
              <TokenRow tokens={tokens} label="K" active={step >= 3} compact />
            </div>
            <div className={`transpose-chip ${step >= 4 ? 'visible' : ''}`}><CornerDownRight />TRANSPOSE <b>Kᵀ</b></div>
            <div className={`matrix-equation ${step >= 5 ? 'visible' : ''}`}>
              <span>Q</span><i>×</i><span>Kᵀ</span><b>→</b><strong>Attention Matrix</strong>
            </div>
          </div>

          <AttentionMatrix tokens={tokens} revealed={step >= 6} highlighted={step >= 7} />

          <div className={`parallel-callout ${step >= 7 ? 'visible' : ''}`}>
            <Rows3 /><span><b>PARALLEL RELATIONSHIP MODELING</b>一次矩阵运算，计算所有 token 的两两关系</span>
          </div>
        </section>

        <section className={`position-question ${step >= 8 ? 'visible' : ''} ${step >= 9 ? 'answered' : ''}`}>
          <div className="position-problem"><AlertCircle /><span><b>SELF-ATTENTION ≠ 天然知道位置</b><small>关系可以并行计算，但顺序信息需要另行提供</small></span></div>
          <i>+</i>
          <div className="position-answer">
            <span>POSITION INJECTION</span>
            <b>Positional Encoding <i>/</i> RoPE</b>
            <small>2017 · Sinusoidal　/　Later · Rotary</small>
          </div>
        </section>
      </div>

      <BottomTakeaway visible={step >= 10}>
        <span><b>RNN：</b>用时间传递位置。</span>
        <i />
        <strong><b>Transformer：</b>用位置编码描述位置，用矩阵乘法并行建模关系。</strong>
      </BottomTakeaway>
    </SlideFrame>
  )
}
