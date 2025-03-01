import React, { useContext, useEffect, useCallback } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AuthContext from "../context/AuthContext";
import { ModalContext } from "./Providers/ModalProvider";

const App = () => {
  const { user } = useContext(AuthContext);
  const { modal, dispatch } = useContext(ModalContext);

  const shortcut = useCallback((e) => {
    const shortcut = e.ctrlKey
      ? "control" + e.key.toLowerCase()
      : e.key.toLowerCase();

    if (shortcut === "escape" && modal) dispatch({ type: "CLOSE_MODAL" });

    if (shortcut === "controlk") {
      e.preventDefault();
      dispatch({ type: "OPEN_MODAL", modalToShow: "searchBox" });
    }

    if (shortcut === "controlr") {
      e.preventDefault();
      dispatch({ type: "OPEN_MODAL", modalToShow: "recommendationSystem" });
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [user]);

  return <RouterProvider router={router} />;
};

export default App;
