import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MissionWorkloadAnalysisTool from './mission-workload-tool_CAO 25 Dec 2025 - 2300z.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MissionWorkloadAnalysisTool />
  </StrictMode>,
)
