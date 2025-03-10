import React, { useContext } from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ErrorPage = () => {
  const error = useRouteError();
  const { user } = useContext(AuthContext);

  console.log(error);
  return (
    <div className="m-8 text-lg flex flex-col font-medium tracking-wider">
      <header>
        <h3 className="headings__large">Oops ...</h3>
        <p>
          {isRouteErrorResponse(error)
            ? "This page doesnt exist !"
            : "Something went wrong"}
        </p>
      </header>
      <div className="form__link">
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
