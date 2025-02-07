import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TooltipProvider from "./Providers/TooltipProvider";
import QueryProvider from "./Providers/QueryProvider";
import RegisterForm from "./RegisterForm";
import Layout from "./Layout";
import LoginForm from "./LoginForm";
import Dashboard from "./HabitsDash";
import AuthProvider from "./Providers/AuthProvider";
import Logout from "./Logout";
import AddHabitComponent from "./AddHabitComponent";

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
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <TooltipProvider>
        <QueryProvider>
          <RouterProvider router={router} />;
        </QueryProvider>
      </TooltipProvider>
    </AuthProvider>
  );
};

export default App;
