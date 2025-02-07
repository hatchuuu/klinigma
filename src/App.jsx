import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Middleware from "@/hoc/Middleware";
import Loader from "@/components/Loader";

//ALL ROUTES
const NotFound = lazy(() => import("@/pages/user/NotFound"));
const HomePage = lazy(() => import("@/pages/user/HomePage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"))
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"))
const DashboardPage = lazy(() => import("@/pages/user/DashboardPage"));
const ProfilePage = lazy(() => import("@/pages/user/ProfilePage"))
const PresentPage = lazy(() => import("@/pages/user/PresentPage"));

//USER ROUTES
const BookingPage = lazy(() => import("@/pages/booking/BookingPage"));
const BookingSchedule = lazy(() => import("@/pages/booking/BookingSchedule"));
const BookingCreated = lazy(() => import("@/pages/booking/BookingCreated"));

//ADMIN ROUTES
const AdminQueuePage = lazy(() => import("@/pages/admin/AdminQueuePage"))
const DoctorPage = lazy(() => import("@/pages/admin/DoctorPage"));

//SUPERADMIN ROUTES
const PolyclinicPage = lazy(() => import("@/pages/admin/PolyclinicPage"))
const UserPage = lazy(() => import("@/pages/admin/UserPage"));

//USER ROUTES
const QueuePage = lazy(() => import("@/pages/user/QueuePage"));

//ADMIN ROUTES
const HandlerPage = lazy(() => import("@/pages/admin/HandlerPage"));

const App = () => {
  const allRoutes = [
    //ALL ROUTES
    { path: "*", role: ["user", "admin", "superadmin"], element: <NotFound /> },
    { path: "/", role: ["user", "admin", "superadmin"], element: <HomePage /> },
    { path: "/login", role: ["user", "admin", "superadmin"], element: <LoginPage /> },
    { path: "/register", role: ["user", "admin", "superadmin"], element: <RegisterPage /> },
    { path: "/dashboard", role: ["user", "admin", "superadmin"], element: <DashboardPage /> },
    { path: "/profil", role: ["user", "admin", "superadmin"], element: <ProfilePage /> },
    { path: "/tampil/antrean/:id", role: ["user", "admin", "superadmin"], element: <PresentPage /> },

    //USER & SUPERADMIN ROUTES
    { path: "/pendaftaran", role: ["user", "superadmin"], element: <BookingPage /> },
    { path: "/pendaftaran/jadwal", role: ["user", "superadmin"], element: <BookingSchedule /> },
    { path: "/pendaftaran/jadwal/detail", role: ["user", "superadmin"], element: <BookingCreated /> },

    //ADMIN & SUPERADMIN ROUTES 
    { path: "/admin/dokter", role: ["admin", "superadmin"], element: <DoctorPage /> },
    { path: "/admin/antrean", role: ["admin", "superadmin"], element: <AdminQueuePage /> },

    //SUPERADMIN ROUTES
    { path: "/admin/user", role: ["superadmin"], element: <UserPage /> },
    { path: "/admin/poliklinik", role: ["superadmin"], element: <PolyclinicPage /> },

    //USER ROUTES
    { path: "/antrean", role: ["user"], element: <QueuePage /> },

    //ADMIN ROUTES
    { path: "/admin/antrean/panggilan", role: ["admin"], element: <HandlerPage /> },
  ]

  return (
    <Routes>
      {allRoutes.map(({ path, role, element }, index) => {
        return (
          <Route
            key={index}
            path={path}
            element={
              <Suspense fallback={<Loader />}>
                <Middleware role={role}>{element}</Middleware>
              </Suspense>
            }
          />
        );
      })}
    </Routes>
  );
};

export default App;