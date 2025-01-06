import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TooltipProvider from "./Providers/TooltipProvider";
import HabitsProvider from "./Providers/HabitsProvider";
import QueryProvider from "./Providers/QueryProvider";
import RegisterForm from "./RegisterForm";
import Layout from "./Layout";
import LoginForm from "./LoginForm";
import Dashboard from "./HabitsDash";
import AuthProvider from "./Providers/AuthProvider";
import Logout from "./Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "logout", element: <Logout /> },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <HabitsProvider>
        <TooltipProvider>
          <QueryProvider>
            <RouterProvider router={router} />;
          </QueryProvider>
        </TooltipProvider>
      </HabitsProvider>
    </AuthProvider>
  );
};

export default App;
