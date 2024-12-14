import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Middleware from "@/hoc/Middleware"
import Loader from "@/components/Loader"

const DashboardPage = lazy(() => import("@/pages/DashboardPage"))
const PolyclinicsPage = lazy(() => import("@/pages/PolyclinicsPage"))
const ProfilePage = lazy(() => import("@/pages/ProfilePage"))
const HistoryPage = lazy(() => import("@/pages/HistoryPage"))
const LoginPage = lazy(() => import("@/pages/LoginPage"))
const RegisterPage = lazy(() => import("@/pages/RegisterPage"))
const UsersPage = lazy(() => import("@/pages/admin/UserPage"))
const DoctorPage = lazy(() => import("@/pages/admin/DoctorPage"))
const AdminPage = lazy(() => import("@/pages/admin/AdminPage"))
const NotFound = lazy(() => import("@/pages/NotFound"))


const App = () => {
  const allRoutes =
    [
      { path: "*", role: "user", element: <NotFound /> },
      { path: "/dashboard", role: "user", element: <DashboardPage /> },
      { path: "/doctors", role: "user", element: <DoctorsPage /> },
      { path: "/polyclinic-items", role: "user", element: <PolyclinicsPage /> },
      { path: "/profile", role: "user", element: <ProfilePage /> },
      { path: "/profile/history", role: "user", element: <HistoryPage /> },
      { path: "/login", role: "user", element: <LoginPage /> },
      { path: "/register", role: "user", element: <RegisterPage /> },
      //hnya untuk admin & superadmin
      { path: "/users", role: "admin", element: <UsersPage /> },
      { path: "/doctors", role: "admin", element: <DoctorPage /> },
      //hanya untuk superadmin
      { path: "/admin", role: "admin", element: <AdminPage /> }
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
              } />
          )
        })
      }
    </Routes>
  )
}

export default App