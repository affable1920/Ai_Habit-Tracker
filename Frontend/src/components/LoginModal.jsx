import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "./Providers/ModalProvider";

const LoginModal = () => {
  const { dispatch } = useContext(ModalContext);

  return (
    <div className="mt-2 bg-accent__lighter/50 p-1 rounded-md ring-1 ring-accent/40 shadow-sm">
      <button
        onClick={() => dispatch({ type: "CLOSE_MODAL" })}
        className="italic font-medium tracking-widest flex items-center gap-1 outline-none appearance-none"
      >
        <Link className="link__with__bg" to="/login">
          Login
        </Link>
        |
        <Link className="link__with__bg" to="/register">
          Register
        </Link>
        to get access to all{" "}
        <Link className="link__with__bg" to="/features">
          features!
        </Link>
      </button>
    </div>
  );
};

export default LoginModal;
