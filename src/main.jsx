import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.jsx'
import Navbar from '@/components/Navbar'
import { BrowserRouter as Router } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <div className='font-roboto min-h-screen w-full mb-10'>
        <App />
      </div>
      <Navbar />
    </Router>
  </StrictMode>,
)
