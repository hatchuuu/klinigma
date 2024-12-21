import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Middleware from "@/hoc/Middleware";
import Loader from "@/components/Loader";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
// const DoctorsPage = lazy(() => import("./pages/DoctorsPage"))

const PolyclinicsPage = lazy(() => import("./pages/PolyclinicsPage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))
const HistoryPage = lazy(() => import("./pages/HistoryPage"))
const LoginPage = lazy(() => import("@/pages/LoginPage"))
const RegisterPage = lazy(() => import("@/pages/RegisterPage"))
const UsersPage = lazy(() => import("@/pages/admin/Users/UserPage"))
const FormUesrs = lazy(() => import("@/pages/admin/Users/Form/Index"))
// const DoctorPage = lazy(() => import("@/pages/admin/DoctorPage"))
const AdminPage = lazy(() => import("@/pages/admin/AdminPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
// Doctors Page
const DoctorsPage = lazy(() => import("./pages/admin/Doctors/DoctorsTeamPage"));
const FormDoctors = lazy(() => import("@/pages/admin/Doctors/Form/index"));

// BOOKING
const BookingPage = lazy(() => import("./pages/booking/BookingPage"));
const BookingSchedule = lazy(() => import("./pages/booking/BookingSchedule"));
const BookingDetails = lazy(() => import("./pages/booking/BookingDetails"));
const BookingCreated = lazy(() => import("./pages/booking/BookingCreated"));

// PRESENT CLIENT
const HandlerPage = lazy(() => import("./pages/admin/Present/HandlerPage"));
const PresentPage = lazy(() => import("./pages/admin/Present/PresentPage"));

//APROVED BOOKING ONLY SUPERADMIN
const BookingApprovedPage = lazy(() => import("./pages/admin/Approved/BookingApprovedPage"))

const App = () => {
  const allRoutes = [
    { path: "*", role: "user", element: <NotFound /> },
    { path: "/", role: "user", element: <HomePage /> },
    
    { path: "/dashboard", role: "user", element: <DashboardPage /> },
    // { path: "/doctors", role: "user", element: <DoctorsPage /> },
    { path: "/polyclinic-items", role: "user", element: <PolyclinicsPage /> },
    { path: "/profile", role: "user", element: <ProfilePage /> },
    { path: "/profile/history", role: "user", element: <HistoryPage /> },

    // BOOKING
    { path: "/booking", role: "user", element: <BookingPage /> },
    { path: "/booking/schedule", role: "user", element: <BookingSchedule /> },
    {
      path: "/booking/schedule/details",
      role: "user",
      element: <BookingDetails />,
    },
    {
      path: "/booking/schedule/details/created",
      role: "user",
      element: <BookingCreated />,
    },

    { path: "/profile/history", role: "user", element: <HistoryPage /> },
    { path: "/login", role: "user", element: <LoginPage /> },
    { path: "/register", role: "user", element: <RegisterPage /> },
    //hnya untuk admin & superadmin
    { path: "/users", role: "admin", element: <UsersPage /> },
    { path: "/doctors", role: "admin", element: <DoctorsPage /> },
    { path: "/addDoctors", role: "admin", element: <FormDoctors /> },
    { path: "/EditUsers", role: "admin", element: <FormUesrs /> },
    //hanya untuk superadmin
    { path: "/admin", role: "admin", element: <AdminPage /> },
    { path: "/admin/approved", role: "superadmin", element: <BookingApprovedPage /> },
    //hanya untuk admin
    { path: "/admin/handler", role: "admin", element: <HandlerPage /> },
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