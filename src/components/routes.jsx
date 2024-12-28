import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Layout from "./Layout";
import HomePage from "./HomePage";
import HabitsDash from "./HabitsDash";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "habits", element: <HabitsDash /> },
      { path: "register", element: <RegisterForm /> },
      { path: "login", element: <LoginForm /> },
    ],
  },
]);

export default router;
