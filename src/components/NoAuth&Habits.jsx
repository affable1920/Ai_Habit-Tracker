import React from "react";
import { Link } from "react-router-dom";

const NoAuthAndHabits = () => {
  return (
    <div className="error__component">
      You are not logged in buddy !{" "}
      <Link className="navigation__link" to="/login">
        Log in
      </Link>{" "}
      or
      <Link className="navigation__link" to="/register">
        Register
      </Link>
      and start tracking your habits
    </div>
  );
};

export default NoAuthAndHabits;
