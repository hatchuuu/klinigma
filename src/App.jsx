import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Middleware from "@/hoc/Middleware";
import Loader from "@/components/Loader";

//ALL ACCESS
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"))
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"))
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"))
const NotFound = lazy(() => import("@/pages/NotFound"));

//USER ACCESS
const QueuePage = lazy(() => import("@/pages/queue/QueuePage"));
const BookingPage = lazy(() => import("@/pages/booking/BookingPage"));
const BookingSchedule = lazy(() => import("@/pages/booking/BookingSchedule"));
const BookingCreated = lazy(() => import("@/pages/booking/BookingCreated"));

//ADMIN ACCESS
// const UsersPage = lazy(() => import("@/pages/admin/Users/UserPage"))
const AdminQueuePage = lazy(() => import("@/pages/admin/Queue/AdminQueuePage"))
const FormUesrs = lazy(() => import("@/pages/admin/Users/Form/Index"))
const DoctorPageList = lazy(() => import("@/pages/DoctorsPage"))
const FormDoctors = lazy(() => import("@/pages/admin/Doctors/Form/index"));
// const DoctorsPage = lazy(() => import("@/pages/admin/Doctors/DoctorsTeamPage"));
const DoctorPage = lazy(() => import("@/pages/admin/Doctors/DoctorPage"));
const PresentPage = lazy(() => import("@/pages/admin/Present/PresentPage"));
const HandlerPage = lazy(() => import("@/pages/admin/Present/HandlerPage"));

//SUPERADMIN ACCESS
const PolyclinicsPage = lazy(() => import("@/pages/PolyclinicsPage"))
const AdminPage = lazy(() => import("@/pages/admin/AdminPage"));
const HistoryPage = lazy(() => import("@/pages/HistoryPage"))
const BookingApprovedPage = lazy(() => import("@/pages/admin/Approved/BookingApprovedPage"))
// const DoctorsPage = lazy(() => import("./pages/DoctorsPage"))


const App = () => {
  const allRoutes = [
    { path: "*", role: "user", element: <NotFound /> },
    { path: "/", role: "user", element: <HomePage /> },

    { path: "/dashboard", role: "user", element: <DashboardPage /> },
    { path: "/doctorsList", role: "user", element: <DoctorPageList /> },
    { path: "/polyclinic-items", role: "user", element: <PolyclinicsPage /> },
    { path: "/profil", role: "user", element: <ProfilePage /> },
    { path: "/antrean", role: "user", element: <QueuePage /> },
    { path: "/profile/history", role: "user", element: <HistoryPage /> },

    // BOOKING
    { path: "/pendaftaran", role: "user", element: <BookingPage /> },
    { path: "/pendaftaran/jadwal", role: "user", element: <BookingSchedule /> },
    { path: "/pendaftaran/jadwal/detail", role: "user", element: <BookingCreated /> },


    { path: "/profile/history", role: "user", element: <HistoryPage /> },
    { path: "/login", role: "user", element: <LoginPage /> },
    { path: "/register", role: "user", element: <RegisterPage /> },

    //hnya untuk admin & superadmin
    { path: "/admin/antrean", role: "admin", element: <AdminQueuePage /> },
    { path: "/admin/dokter", role: "admin", element: <DoctorPage /> },
    { path: "/addDoctors", role: "admin", element: <FormDoctors /> },
    { path: "/EditUsers", role: "admin", element: <FormUesrs /> },

    //hanya untuk superadmin
    { path: "/admin", role: "admin", element: <AdminPage /> },
    { path: "/admin/approved", role: "superadmin", element: <BookingApprovedPage /> },
    //hanya untuk admin
    { path: "/admin/antrean/panggilan", role: "admin", element: <HandlerPage /> },
    { path: "/present/:id", role: "user", element: <PresentPage /> }
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