import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm.js";
import AddHabitComponent from "./AddHabitComponent.js";
import Layout from "./Layout.jsx";
import LoginForm from "./LoginForm.jsx";
import ErrorPage from "./ErrorPage.js";
import Dashboard from "./Dashboard.js";
import LandingPage from "./LandingPage.js";
import PrivateRoutes from "./PrivateRoutes.jsx";
import HabitsTracker from "./HabitsTracker.js";
import AuthRoutes from "./AuthRoutes.js";
import Logout from "./Logout.jsx";
import Profile from "./Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "dashboard", element: <LandingPage /> },
      { path: "tracker", element: <HabitsTracker /> },
      { path: "logout", element: <Logout /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "add", element: <AddHabitComponent /> },
        ],
      },
      {
        element: <AuthRoutes />,
        children: [
          { path: "login", element: <LoginForm /> },
          { path: "register", element: <RegisterForm /> },
        ],
      },
    ],
  },
]);

export default router;
