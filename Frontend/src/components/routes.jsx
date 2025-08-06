import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import AddHabitComponent from "./AddHabitComponent";
import Layout from "./Layout";
import LoginForm from "./LoginForm";
import ErrorPage from "./ErrorPage";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";
import PrivateRoutes from "./PrivateRoutes";
import HabitsTracker from "./HabitsTracker";
import AuthRoutes from "./AuthRoutes";
import Logout from "./Logout";
import Profile from "./Profile";
import Chat from "./Chat";

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
