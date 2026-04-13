import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from '@/components/ui/sonner.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next"
import App from '@/App.jsx'
import '@/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TooltipProvider delayDuration={180}>
        <Toaster position="bottom-center" richColors theme="system" />
        <Analytics />
        <App />
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>,
)
