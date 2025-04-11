import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import AddHabitComponent from "./AddHabitComponent";
import Logout from "./Logout";
import Chat from "./Chat";
import Layout from "./Layout";
import LoginForm from "./LoginForm";
import ErrorPage from "./ErrorPage";
import Archived from "./Archived";
import HabitsTracker from "./HabitsTracker";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HabitsTracker /> },
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
