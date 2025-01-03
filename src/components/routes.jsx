import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TooltipProvider from "./Providers/TooltipProvider";
import QueryProvider from "./Providers/QueryProvider";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Layout from "./Layout";
import HabitsDash from "./HabitsDash";
import HabitsProvider from "./Providers/HabitsProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HabitsDash /> },
      { path: "register", element: <RegisterForm /> },
      { path: "login", element: <LoginForm /> },
    ],
  },
]);

const App = () => {
  return (
    <HabitsProvider>
      <TooltipProvider>
        <QueryProvider>
          <RouterProvider router={router} />;
        </QueryProvider>
      </TooltipProvider>
    </HabitsProvider>
  );
};

export default App;
