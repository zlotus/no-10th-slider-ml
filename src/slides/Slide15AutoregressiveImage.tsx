import { ArrowRight, BookOpen, Braces, Clock3, Image, ScanText, Sparkles } from 'lucide-react'
import { SceneImage, VisualTokenGrid } from '../components/GenerationVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const sequence = ['03', '20', '37', '54', '71', '88', '08', '?']

export function Slide15AutoregressiveImage({ step }: SlideProps) {
  const visibleTokens = step < 3 ? 0 : step === 3 ? 4 : sequence.length - 1
  return (
    <SlideFrame
      number="15"
      eyebrow="AUTOREGRESSIVE IMAGE GENERATION · VISUAL TOKENS"
      title={<>如果图像也能离散成 Token，就能像写句子一样<span className="title-generation">“写图”</span></>}
      tone="generation"
      source="VQ-VAE · 2017  /  DALL·E · 2021  /  REFERENCE: PDF PAGES 31–40"
      className={`autoregressive-image slide15-step-${step}`}
    >
      <div className="ar-main-pipeline">
        <div className="ar-source"><SceneImage visible variant={1} label="IMAGE" /></div>
        <ArrowRight className={step >= 1 ? 'visible' : ''} />
        <div className={`image-tokenizer ${step >= 1 ? 'visible' : ''}`}><BookOpen /><span>VQ-STYLE TOKENIZER</span><b>patch → codebook id</b><small>连续像素压缩成离散词表</small></div>
        <ArrowRight className={step >= 2 ? 'visible' : ''} />
        <VisualTokenGrid visible={step >= 2} filled={step >= 2 ? 16 : 0} />
        <ArrowRight className={step >= 4 ? 'visible' : ''} />
        <div className={`ar-decoder ${step >= 4 ? 'visible' : ''}`}><Image /><span>DECODER</span><b>tokens → image</b></div>
        <div className="ar-result"><SceneImage visible={step >= 4} variant={2} label="GENERATED" /></div>
      </div>

      <div className={`unified-sequence ${step >= 3 ? 'visible' : ''}`}>
        <header><ScanText /><span>TEXT PREFIX</span><b>“月球上的宇航员猫”</b><i>+</i><Image /><span>IMAGE TOKENS</span></header>
        <div className="next-token-row">
          {sequence.map((token, index) => <span key={`${token}-${index}`} className={index < visibleTokens ? 'visible' : index === visibleTokens ? 'next' : ''}>{token}<small>{index === visibleTokens ? 'NEXT?' : `v${index + 1}`}</small></span>)}
        </div>
        <div className={`ar-transformer ${step >= 3 ? 'visible' : ''}`}><Braces /><span>AUTOREGRESSIVE TRANSFORMER</span><b>p(vᵢ | text, v&lt;i)</b><small>每生成一个 token，就把它加入上下文继续预测</small></div>
      </div>

      <div className={`ar-unification ${step >= 5 ? 'visible' : ''}`}>
        <div><ScanText /><span>LANGUAGE</span><b>next word</b></div><i>=</i><div><Image /><span>IMAGE</span><b>next visual token</b></div><strong>同一种序列建模问题</strong>
      </div>

      <div className={`ar-cost ${step >= 6 ? 'visible' : ''}`}>
        <Clock3 /><span>THE COST OF SEQUENCE</span><b>序列很长 · 采样逐 token 串行 · 局部误差影响后续 · 高分辨率更昂贵</b><small><Sparkles />统一很优雅，但生成速度仍被顺序锁住。</small>
      </div>

      <BottomTakeaway visible={step >= 7}>
        <strong>Autoregressive 图像生成把“写文字”和“写图像”</strong><span>统一到了同一类序列建模问题。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
