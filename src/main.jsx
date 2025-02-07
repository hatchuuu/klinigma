import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "@/App.jsx"
import Navbar from "@/components/navbar/Navbar"
import { BrowserRouter as Router } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/side-bar/AppSidebar"
import { useAuthStore } from "./store/store"
import { jwtDecode } from "jwt-decode"

const RootComponent = () => {
  const token = useAuthStore((state) => state.token)
  const decodedToken = token ? jwtDecode(token) : {}
  const { role } = decodedToken

  return (
    <StrictMode>
      <SidebarProvider open={!!token && role !== "user"}>
        <Router>
          <Toaster />
          <AppSidebar />
          <Navbar />
          <div className="relative font-publicSans min-h-screen w-full bg-gray-50">
            <App />
          </div>
        </Router>
      </SidebarProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById("root")).render(<RootComponent />);