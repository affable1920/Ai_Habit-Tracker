import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import AddHabitComponent from "./AddHabitComponent";
import Logout from "./Logout";
import Chat from "./Chat";
import Layout from "./Layout";
import LoginForm from "./LoginForm";
import Dashboard from "./HabitsDash";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "add", element: <AddHabitComponent /> },
      { path: "update/:id", element: <AddHabitComponent /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "logout", element: <Logout /> },
      { path: "chat", element: <Chat /> },
    ],
  },
]);

export default router;
