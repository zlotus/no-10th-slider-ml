import { Braces, CircleDotDashed, Combine, Network } from 'lucide-react'
import { ConvergenceMark } from '../components/ModernGenerationVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

export function Slide25Summary({ step }: SlideProps) {
  return (
    <SlideFrame
      number="25"
      eyebrow="CONCLUSION · ONE STORY"
      title={<>两条路线，<span className="hybrid-title"><i>走向同一个方向</i></span></>}
      tone="hybrid"
      className={`summary-slide slide25-step-${step}`}
    >
      <section className={`summary-route transformer-route ${step >= 0 ? 'visible' : ''}`}>
        <header><Braces /><span>TRANSFORMER</span><b>Representation</b></header>
        <div><i>Token</i><i>Attention</i><i>Information Interaction</i></div>
        <strong>统一“信息如何表示、如何彼此交互”。</strong>
      </section>
      <section className={`summary-route generation-route ${step >= 1 ? 'visible' : ''}`}>
        <header><CircleDotDashed /><span>DIFFUSION / FLOW</span><b>Generation</b></header>
        <div><i>Noise</i><i>Distribution</i><i>Trajectory</i></div>
        <strong>统一“样本如何从随机分布变成真实数据”。</strong>
      </section>

      <div className={`summary-convergence ${step >= 2 ? 'visible' : ''}`}>
        <ConvergenceMark visible={step >= 2} />
        <div><Network /><span>MULTIMODAL TRANSFORMER</span><i>+</i><Combine /><span>DIFFUSION / FLOW</span></div>
        <strong>MODERN GENERATIVE AI</strong>
      </div>

      <div className={`summary-thesis ${step >= 3 ? 'visible' : ''}`}>
        <span>THE LAST DECADE</span><b>Transformer 统一了“表示与信息交互”，<br />Diffusion 与 Flow 统一了“生成过程”。</b>
      </div>

      <BottomTakeaway visible={step >= 4}>
        <strong>文字、图像、声音和视频，</strong><span>正在变成同一种可表示、可理解、可生成的信息。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
