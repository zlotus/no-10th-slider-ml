import { AudioLines, Braces, Image, Scissors, ScanText, Video } from 'lucide-react'
import { ModalityToken, PatchGrid } from '../components/TransformerVisuals'
import { BottomTakeaway, SlideFrame } from '../components/SlideFrame'
import type { SlideProps } from '../presentation/types'

const patchTokens = Array.from({ length: 8 }, (_, index) => `p${index + 1}`)

export function Slide11ViT({ step }: SlideProps) {
  return (
    <SlideFrame
      number="11"
      eyebrow="VISION TRANSFORMER · TOKENIZE EVERYTHING"
      title={<>Transformer 走出 NLP：<span className="title-transformer">图像也可以是 Token</span></>}
      tone="transformer"
      source="DOSOVITSKIY ET AL. · AN IMAGE IS WORTH 16×16 WORDS · 2020  /  REFERENCE: PDF PAGE 09"
      className={`vit-slide slide11-step-${step}`}
    >
      <div className="vit-pipeline">
        <div className="source-image"><Image /><span>IMAGE</span><small>2D PIXELS</small></div>
        <div className={`patchify-action ${step >= 1 ? 'visible' : ''}`}><Scissors /><span>PATCHIFY</span><small>固定大小切块</small></div>
        <PatchGrid active={step >= 1} highlighted={step >= 2} />
        <div className={`patch-token-strip ${step >= 2 ? 'visible' : ''}`}>
          {patchTokens.map((token, index) => <span key={token} style={{ transitionDelay: `${index * 45}ms` }}>{token}<small>+ pos</small></span>)}
          <b>PATCH TOKENS</b>
        </div>
        <div className={`vit-transformer ${step >= 3 ? 'visible' : ''}`}><Braces /><span>TRANSFORMER ENCODER</span><b>Self-Attention across patches</b><small>二维排列仍需要位置编码</small></div>
        <svg className="vit-flow" viewBox="0 0 1540 430" aria-hidden="true">
          <path className={step >= 1 ? 'drawn' : ''} d="M190 210 H345" />
          <path className={step >= 2 ? 'drawn' : ''} d="M704 210 H830" />
          <path className={step >= 3 ? 'drawn' : ''} d="M1110 210 H1250" />
        </svg>
      </div>

      <div className={`token-analogy ${step >= 4 ? 'visible' : ''}`}>
        <div><ScanText /><span>LANGUAGE</span><b>Word / Subword</b><i>→</i><strong>Token</strong></div>
        <div><Image /><span>VISION</span><b>Image Patch</b><i>→</i><strong>Token</strong></div>
      </div>

      <div className={`vit-modalities ${step >= 5 ? 'visible' : ''}`}>
        <ModalityToken icon={<ScanText />} label="Text" unit="subword" active={step >= 5} />
        <ModalityToken icon={<Image />} label="Image" unit="patch" active={step >= 5} />
        <ModalityToken icon={<AudioLines />} label="Audio" unit="frame" active={step >= 5} />
        <ModalityToken icon={<Video />} label="Video" unit="space × time" active={step >= 5} />
        <i>→</i><b>TRANSFORMER</b>
      </div>

      <div className={`generation-bridge ${step >= 6 ? 'visible' : ''}`}>
        <span>NEXT QUESTION</span><b>如果图像也能表示成 Token，</b><strong>我们是不是也能像生成文字一样生成图像？</strong>
      </div>

      <BottomTakeaway visible={step >= 7}>
        <strong>Transformer 不是“处理文字的模型”，</strong><span>而是一种处理 Token 的通用模型。</span>
      </BottomTakeaway>
    </SlideFrame>
  )
}
