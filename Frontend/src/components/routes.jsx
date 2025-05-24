import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import AddHabitComponent from "./AddHabitComponent";
import Logout from "./Logout";
import Layout from "./Layout";
import LoginForm from "./LoginForm";
import ErrorPage from "./ErrorPage";
import HabitsTracker from "./HabitsTracker";
import PrivateRoutes from "./PrivateRoutes";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "./LandingPage";

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
      { path: "tracker", element: <HabitsTracker /> },
      { path: "profile", element: <Profile /> },
      { path: "logout", element: <Logout /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: "add/:id?", element: <AddHabitComponent /> },
          { path: "archived", element: <Archived /> },
          { path: "chat", element: <Chat /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "login", element: <LoginForm /> },
          { path: "register", element: <RegisterForm /> },
        ],
      },
    ],
  },
]);

export default router;
