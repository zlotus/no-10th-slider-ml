import { ArrowDown, Braces, MessageSquareText, Repeat2 } from 'lucide-react'
import { Token } from '../components/MLVisuals'
import { FeatureMap } from '../components/ModernGenerationVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'
import { Math } from '../components/Math'

const promptTokens = ['a', 'red', 'sports car', 'in the', 'snow']

export function Slide20CrossAttention({ step }: SlideProps) {
  const focus = step >= 7 ? [2, 3, 8, 9, 14, 15] : step >= 6 ? [12, 13, 18, 19, 20] : step >= 5 ? [4, 5, 10, 11] : []
  return (
    <SlideFrame
      number="20"
      eyebrow="CROSS-ATTENTION · TEXT CONDITIONING"
      title={<>Prompt 不是“一句话”，而是<span className="hybrid-title"><i>持续参与</i>去噪的条件</span></>}
      tone="hybrid"
      source="ROMBACH ET AL. · 2021  /  REFERENCE: PDF PAGES 20, 23–24 · MEDIA IMAGE-019"
      className={`cross-attention-slide slide20-step-${step}`}
    >
      <div className={`prompt-source ${step >= 0 ? 'visible' : ''}`}><MessageSquareText /><span>PROMPT</span><b>“a red sports car in the snow”</b></div>
      <div className={`prompt-tokens ${step >= 1 ? 'visible' : ''}`}>
        {promptTokens.map((token, index) => <Token key={token} tone="transformer" compact active={step >= 1}>{token}<small>{index + 1}</small></Token>)}
      </div>
      <ArrowDown className={`prompt-down ${step >= 2 ? 'visible' : ''}`} />
      <div className={`text-encoder ${step >= 2 ? 'visible' : ''}`}><Braces /><span>TEXT / MULTIMODAL ENCODER</span><b>Text Embeddings</b><small>一组条件向量，不是单个命令字符串</small></div>

      <div className={`cross-kv ${step >= 3 ? 'visible' : ''}`}><span>TEXT FEATURES</span><b>K</b><b>V</b><small>“我是什么” · “我能提供什么”</small></div>
      <div className={`cross-q ${step >= 3 ? 'visible' : ''}`}><FeatureMap visible={step >= 3} focus={focus} label="LATENT FEATURES" /><div><b>Q</b><span>IMAGE / LATENT</span><small>当前视觉特征在找什么？</small></div></div>

      <div className={`cross-core ${step >= 4 ? 'visible' : ''}`}>
        <span className='cross-label'>CROSS-ATTENTION</span>
        <Math className="cross-matrix">
          {String.raw`\operatorname{softmax}\left(
              \frac{QK^\top}{\sqrt{d_k}}
            \right)V`}
        </Math>

        <small>图像特征主动从文本条件中取信息</small>
        <svg viewBox="0 0 540 250" aria-hidden="true"><path className="amber" d="M0 42 C172 42 154 124 265 124" /><path className="violet" d="M0 210 C172 210 154 133 265 133" /><path className="merged" d="M275 128 H530" /></svg>
      </div>

      <div className={`condition-attributes ${step >= 5 ? 'visible' : ''}`}>
        <span className={step === 5 ? 'active' : ''}>red · COLOR</span><span className={step === 6 ? 'active' : ''}>sports car · OBJECT</span><span className={step >= 7 ? 'active' : ''}>snow · CONTEXT</span>
        <small>教学示意：高亮表示条件影响，不代表严格一一可解释</small>
      </div>
      <div className={`denoise-repeat ${step >= 7 ? 'visible' : ''}`}><Repeat2 /><span>REPEATED CONDITIONING</span><b>文本条件在多个去噪层级持续进入视觉计算</b></div>

      <BottomTakeaway visible={step >= 8}>
        <strong>Prompt 不是一句“命令”，</strong><span>而是一组持续参与去噪过程的条件向量。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
