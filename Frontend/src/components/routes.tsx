import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm.js";
import AddHabitComponent from "./AddHabitComponent.js";
import Layout from "./Layout.js";
import LoginForm from "./LoginForm.js";
import ErrorPage from "./ErrorPage.js";
import Dashboard from "./Dashboard.js";
import LandingPage from "./LandingPage.js";
import PrivateRoutes from "./PrivateRoutes.js";
import HabitsTracker from "./HabitsTracker.js";
import AuthRoutes from "./AuthRoutes.js";
import Logout from "./Logout.js";
import Profile from "./Profile.js";

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
