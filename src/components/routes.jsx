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
import Dashboard from "./Dashboard";
import Profile from "./Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "tracker", element: <HabitsTracker /> },
      { path: "profile", element: <Profile /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "logout", element: <Logout /> },
      { path: "chat", element: <Chat /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: "add/:id?", element: <AddHabitComponent /> },
          { path: "archived", element: <Archived /> },
        ],
      },
    ],
  },
]);

export default router;
