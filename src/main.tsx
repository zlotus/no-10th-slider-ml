import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Presentation } from './presentation/Presentation'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Presentation />
  </StrictMode>,
)
