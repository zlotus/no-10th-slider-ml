import { ArrowDown, Database, KeyRound, Search, Weight } from 'lucide-react'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'
import { Math } from '../components/Math'

const candidates = [
  { token: '小红', score: '.72', width: '92%' },
  { token: '小明', score: '.12', width: '34%' },
  { token: '苹果', score: '.03', width: '12%' },
]

export function Slide07QKV({ step }: SlideProps) {
  return (
    <SlideFrame
      number="07"
      eyebrow="SELF-ATTENTION · QUERY KEY VALUE"
      title={<>Q / K / V：<span className="title-transformer">看谁，以及拿什么</span></>}
      tone="transformer"
      source="VASWANI ET AL. · ATTENTION IS ALL YOU NEED · 2017"
      className={`qkv-slide slide07-step-${step}`}
    >
      <div className="qkv-roles">
        <section className={`qkv-role query-role ${step >= 0 ? 'visible' : ''}`}><Search /><span>QUERY · Q</span><b>我在找什么？</b><small>来自当前 token「她」</small></section>
        <section className={`qkv-role key-role ${step >= 1 ? 'visible' : ''}`}><KeyRound /><span>KEY · K</span><b>我是什么？</b><small>用于和 Query 匹配</small></section>
        <section className={`qkv-role value-role ${step >= 5 ? 'visible' : ''}`}><Database /><span>VALUE · V</span><b>我能提供什么？</b><small>真正被加权取回的信息</small></section>
      </div>

      <div className={`qkv-query ${step >= 0 ? 'visible' : ''}`}><span>Q</span><b>“她”</b><small>与所有 Key 比较</small><ArrowDown /></div>

      <div className={`key-matches ${step >= 2 ? 'visible' : ''}`}>
        {candidates.map((candidate, index) => (
          <div key={candidate.token} style={{ transitionDelay: `${index * 75}ms` }}>
            <span>K</span><b>{candidate.token}</b><i><em style={{ width: step >= 3 ? candidate.width : '0%' }} /></i><strong>{step >= 3 ? candidate.score : '—'}</strong>
          </div>
        ))}
      </div>

      <div className={`softmax-stage ${step >= 4 ? 'visible' : ''}`}>
        <Weight /><span>softmax</span><b>匹配分数 → 归一化权重</b><small>权重不是人工定义的语义标签，而是模型根据 Q / K 动态计算</small>
      </div>

      <div className={`value-result ${step >= 5 ? 'visible' : ''}`}>
        <span>× V</span><b>0.72 · V<sub>小红</sub> + 0.12 · V<sub>小明</sub> + …</b><strong>→ context for「她」</strong>
      </div>

      <div className={`attention-formula ${step >= 6 ? 'visible' : ''}`}>
        <Math className="attention-formula-math">
          {String.raw`\operatorname{Attention}(Q,K,V)
            =
            \operatorname{softmax}\left(
              \frac{QK^\top}{\sqrt{d_k}}
            \right)V`}
        </Math>
        <div>
          <i>QKᵀ · 看谁</i>
          <i>softmax · 变成权重</i>
          <i>× V · 拿信息</i>
        </div>
      </div>

      <BottomTakeaway visible={step >= 7}>
        <strong>
        <Math className="attention-formula-math">
          {String.raw`QK^\top`}
        </Math>
          决定“看谁”，</strong><span><Math className="attention-formula-math">
          {String.raw`V`}
        </Math> 决定“拿什么信息”。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
