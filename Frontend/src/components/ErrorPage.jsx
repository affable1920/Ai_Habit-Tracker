import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const ErrorPage = () => {
  const error = useRouteError();
  const user = useAuthStore((s) => s.user);

  return (
    <div className="m-8 text-lg flex font-medium tracking-wider">
      <header>
        <h3 className="headings-large">Oops ...</h3>
        <p>
          {isRouteErrorResponse(error)
            ? "This page doesnt exist !"
            : "Something went wrong"}
        </p>
      </header>
      <div className="form-link">
        {user ? (
          <Link to="/">Go back to Dashboard</Link>
        ) : (
          <Link to="/login">Go to Login</Link>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
