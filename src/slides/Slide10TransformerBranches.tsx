import { ArrowDown, BookOpenCheck, GitBranch, MessageSquareText, Repeat2 } from 'lucide-react'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const branches = [
  { className: 'encoder-branch', label: 'ENCODER-ONLY', model: 'BERT', verb: '理解 / 表征', icon: <BookOpenCheck />, step: 1, detail: '双向读取上下文' },
  { className: 'decoder-branch', label: 'DECODER-ONLY', model: 'GPT', verb: '自回归生成', icon: <MessageSquareText />, step: 2, detail: '预测下一个 token' },
  { className: 'seq2seq-branch', label: 'ENCODER–DECODER', model: 'T5', verb: 'Sequence-to-Sequence', icon: <Repeat2 />, step: 3, detail: '输入序列 → 输出序列' },
] as const

export function Slide10TransformerBranches({ step }: SlideProps) {
  return (
    <SlideFrame
      number="10"
      eyebrow="ARCHITECTURE FAMILIES · 2018–"
      title={<>同一架构，<span className="title-transformer">分化出三条路线</span></>}
      tone="transformer"
      source="BERT · 2018  /  GPT · 2018  /  T5 · 2019"
      className={`branches-slide slide10-step-${step}`}
    >
      <div className="branch-root">
        <GitBranch /><span>2017 · ORIGINAL</span><b>Transformer</b><small>Encoder + Decoder</small><ArrowDown />
      </div>

      <svg className="branch-lines" viewBox="0 0 1500 520" aria-hidden="true">
        <path className={step >= 1 ? 'drawn' : ''} d="M750 30 V116 H250 V188" />
        <path className={step >= 2 ? 'drawn' : ''} d="M750 30 V188" />
        <path className={step >= 3 ? 'drawn' : ''} d="M750 116 H1250 V188" />
      </svg>

      <div className="branch-family">
        {branches.map((branch) => (
          <section key={branch.model} className={`${branch.className} ${step >= branch.step ? 'visible' : ''} ${step >= 4 && branch.model !== 'GPT' ? 'dimmed' : ''} ${step >= 4 && branch.model === 'GPT' ? 'focus' : ''}`}>
            {branch.icon}<span>{branch.label}</span><b>{branch.model}</b><strong>{branch.verb}</strong><small>{branch.detail}</small>
          </section>
        ))}
      </div>

      <div className={`gpt-scale ${step >= 4 ? 'visible' : ''}`}>
        <span>DECODER-ONLY</span><b>GPT</b><i>→</i><strong>规模化语言模型</strong><small>大多数主流自回归 LLM 沿这一路线扩展；并不意味着所有现代模型结构完全相同。</small>
      </div>

      <BottomTakeaway visible={step >= 5}>
        <strong>架构取舍决定能力侧重：</strong><span>理解、生成，或输入到输出的转换。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
