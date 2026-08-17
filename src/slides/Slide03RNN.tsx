import { AlertTriangle, Link2, TimerReset } from 'lucide-react'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const tokens = ['我', '喜', '欢', '人', '工', '智', '能']
const sentence = ['那台', '服务器', '虽然', '已经', '用了', '很多年', '但', '依然', '运行得', '非常', '稳定']

export function Slide03RNN({ step }: SlideProps) {
  return (
    <SlideFrame
      number="03"
      eyebrow="BEFORE TRANSFORMER · RECURRENCE"
      title={<>Transformer 之前：<span className="title-transformer">顺序就是计算本身</span></>}
      tone="transformer"
      source="ELMAN · 1990  /  REFERENCE: TRANSFORMER SLIDES 06–08 · 17"
      className={`rnn-slide slide03-step-${step}`}
    >
      <div className="rnn-timeline">
        <div className="rnn-token-line">
          {tokens.map((token, index) => (
            <div key={token} className={`timeline-token ${index <= Math.max(0, step) ? 'visible' : ''}`} style={{ transitionDelay: `${index * 55}ms` }}>
              <span>{token}</span><b>h<sub>{index + 1}</sub></b>{index < tokens.length - 1 && <i>→</i>}
            </div>
          ))}
        </div>
        <div className={`state-rule ${step >= 2 ? 'visible' : ''}`}>
          <span>hₜ₋₁</span><i>+</i><span>xₜ</span><b>→</b><strong>hₜ</strong><small>后一个状态依赖前一个状态</small>
        </div>
      </div>

      <div className={`rnn-problem serial-problem ${step >= 3 ? 'visible' : ''}`}>
        <TimerReset /><div><span>PROBLEM 01</span><b>串行依赖</b><small>t₁ 完成之前，t₂ 很难开始</small></div>
        <p>{['t₁', 't₂', 't₃', 't₄', '…'].map((time) => <span key={time}>{time}</span>)}</p>
      </div>

      <div className={`rnn-problem distance-problem ${step >= 4 ? 'visible' : ''} ${step >= 5 ? 'focus' : ''}`}>
        <Link2 /><div><span>PROBLEM 02</span><b>长距离依赖更难稳定传播</b><small>不是完全做不到，而是路径越长，学习越困难</small></div>
        <div className="long-sentence">
          {sentence.map((word, index) => <span key={`${word}-${index}`} className={index === 1 || index === 10 ? 'related' : ''}>{word}</span>)}
          <svg viewBox="0 0 930 65" aria-hidden="true"><path d="M128 54 C310 -20 720 -20 880 54" /></svg>
        </div>
      </div>

      <div className={`rnn-lock ${step >= 5 ? 'visible' : ''}`}><AlertTriangle /><span>ORDER IS BUILT IN</span><b>COMPUTE IS LOCKED IN</b></div>

      <BottomTakeaway visible={step >= 6}>
        <strong>RNN 把“顺序”写进计算流程：</strong><span>顺序天然存在，但计算也被顺序锁住。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
