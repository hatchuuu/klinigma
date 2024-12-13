import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Middleware from "@/hoc/Middleware"
import Loader from "./components/Loader"

const DashboardPage = lazy(() => import("./pages/DashboardPage"))
const PolyclinicsPage = lazy(() => import("./pages/PolyclinicsPage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))
const HistoryPage = lazy(() => import("./pages/HistoryPage"))


const App = () => {
  const allRoutes =
    [
      { path: "/dashboard", role: "user", element: <DashboardPage /> },
      { path: "/polyclinic-items", role: "user", element: <PolyclinicsPage /> },
      { path: "/profile", role: "user", element: <ProfilePage /> },
      { path: "/profile/history", role: "user", element: <HistoryPage /> }
      
    ]

  return (
    <Routes>
      {
        allRoutes.map(({ path, role, element }, index) => {
          return (
            <Route
              key={index}
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Middleware role={role}>
                    {element}
                  </Middleware>
                </Suspense>
              }>
            </Route>
          )
        })
      }
    </Routes>
  )
}

export default App