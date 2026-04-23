import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from '@/components/ui/sonner.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import App from '@/App.jsx'
import '@/i18n.js'
import '@/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TooltipProvider delayDuration={180}>
        <Analytics />
        <SpeedInsights />
        <Toaster position="bottom-center" richColors theme="system" />
        <App />
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>,
)
