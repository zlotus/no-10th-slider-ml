import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Presentation } from './presentation/Presentation'
import './styles/global.css'
import './styles/transformer-chapter.css'
import './styles/generation-chapter.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Presentation />
  </StrictMode>,
)
