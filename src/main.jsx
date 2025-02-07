import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.jsx'
import Navbar from '@/components/Navbar'
import { BrowserRouter as Router } from "react-router-dom"
import { Toaster } from '@/components/ui/toaster'
// import { SidebarProvider } from './components/ui/sidebar'
// import { AppSidebar } from './components/AppSidebar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <SidebarProvider defaultOpen={false}> */}
    <Router>
      <Toaster />
      {/* <AppSidebar /> */}
      <div className='relative font-publicSans min-h-screen w-full bg-gray-50'>
        <Navbar />
        <App />
      </div>
    </Router>
    {/* </SidebarProvider> */}
  </StrictMode>,
)
