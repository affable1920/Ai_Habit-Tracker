import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TooltipProvider from "./Providers/TooltipProvider";
import QueryProvider from "./Providers/QueryProvider";
import ThemeProvider from "./Providers/ThemeProvider";
import RegisterForm from "./RegisterForm";
import Layout from "./Layout";
import LoginForm from "./LoginForm";
import Dashboard from "./HabitsDash";
import AuthProvider from "./Providers/AuthProvider";
import Logout from "./Logout";
import AddHabitComponent from "./AddHabitComponent";
import Chat from "./Chat";

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

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <QueryProvider>
            <RouterProvider router={router} />;
          </QueryProvider>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
