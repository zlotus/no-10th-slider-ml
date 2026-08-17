import { ArrowRight, Database, Gauge, Image, MessageSquareText, ShieldCheck, Sparkles, WandSparkles } from 'lucide-react'
import { SceneImage } from '../components/GenerationVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const pipeline = [
  ['PROMPT', 'User intent', MessageSquareText],
  ['REWRITE / PLAN', 'Prompt-aware LLM', WandSparkles],
  ['ENCODER', 'Text / multimodal', Sparkles],
  ['GENERATOR', 'Diffusion / Flow Transformer', Gauge],
  ['DECODER', 'VAE → pixels', Image],
] as const

export function Slide23ModernSystem({ step }: SlideProps) {
  return (
    <SlideFrame
      number="23"
      eyebrow="MODERN GENERATION · SYSTEM VIEW"
      title={<>今天的文图模型，已经是<span className="hybrid-title"><i>一整套生成系统</i></span></>}
      tone="hybrid"
      source="SYSTEM-LEVEL SYNTHESIS · BASED ON PUBLIC GENERATIVE MODEL PIPELINES"
      className={`modern-system-slide slide23-step-${step}`}
    >
      <div className="system-pipeline">
        {pipeline.map(([label, detail, Icon], index) => (
          <div className="system-pipeline-item" key={label}>
            <section className={step >= index ? 'visible' : ''}><Icon /><span>{label}</span><b>{detail}</b></section>
            {index < pipeline.length - 1 && <ArrowRight className={step > index ? 'visible' : ''} />}
          </div>
        ))}
        <ArrowRight className={step >= 5 ? 'visible' : ''} />
        <SceneImage visible={step >= 5} variant={2} label="FINAL IMAGE" />
      </div>

      <div className={`system-orbit data-orbit ${step >= 2 ? 'visible' : ''}`}><Database /><span>DATA SYSTEM</span><b>cleaning · captions · curation</b><small>决定模型学到什么世界</small></div>
      <div className={`system-orbit alignment-orbit ${step >= 4 ? 'visible' : ''}`}><ShieldCheck /><span>ALIGNMENT</span><b>preference · prompt following · safety</b><small>决定能力如何被引导</small></div>
      <div className={`system-orbit inference-orbit ${step >= 5 ? 'visible' : ''}`}><Gauge /><span>INFERENCE</span><b>scheduler · guidance · serving</b><small>决定质量、速度与成本</small></div>

      <svg className={`system-support-lines ${step >= 4 ? 'visible' : ''}`} viewBox="0 0 1720 580" aria-hidden="true"><path d="M239 75 C490 75 529 238 767 238" /><path d="M1448 80 C1220 80 1197 238 974 238" /><path d="M1452 488 C1223 488 1212 312 1056 312" /></svg>

      <div className={`system-equation ${step >= 6 ? 'visible' : ''}`}><span>CAPABILITY</span><b>MODEL</b><i>+</i><b>DATA</b><i>+</i><b>ALIGNMENT</b><i>+</i><b>INFERENCE SYSTEM</b></div>

      <BottomTakeaway visible={step >= 7}>
        <strong>现代文图生成的能力，</strong><span>来自“模型 + 数据 + 对齐 + 推理系统”的共同作用。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
