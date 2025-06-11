import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import AddHabitComponent from "./AddHabitComponent";
import Logout from "./Logout";
import Layout from "./Layout";
import LoginForm from "./LoginForm";
import ErrorPage from "./ErrorPage";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";
import PrivateRoutes from "./PrivateRoutes";
import HabitsTracker from "./HabitsTracker";
import AuthRoutes from "./AuthRoutes";

const Chat = React.lazy(() => import("./Chat"));
const Profile = React.lazy(() => import("./Profile"));
const Archived = React.lazy(() => import("./Archived"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "tracker", element: <HabitsTracker /> },
      { path: "archived", element: <Archived /> },
      { path: "logout", element: <Logout /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "add", element: <AddHabitComponent /> },
          { path: "chat", element: <Chat /> },
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
