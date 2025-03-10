import React, { useContext, useEffect, useCallback } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AuthContext from "../context/AuthContext";
import { ModalContext } from "./Providers/ModalProvider";
import { Toaster } from "sonner";
import "../App.css";

const App = () => {
  const { user } = useContext(AuthContext);
  const { modal, dispatch } = useContext(ModalContext);

  const shortcut = useCallback((e) => {
    const shortcut = e.ctrlKey
      ? "control" + e.key.toLowerCase()
      : e.key.toLowerCase();

    if (shortcut === "escape" && modal?.openModals?.length != 0)
      dispatch({
        type: "CLOSE_ALL",
      });

    if (shortcut === "controlk") {
      e.preventDefault();
      dispatch({ type: "OPEN_MODAL", name: "searchBar" });
    }

    if (shortcut === "controlr") {
      e.preventDefault();
      dispatch({ type: "OPEN_MODAL", name: "recommendationSystem" });
    }
  }, []);

  const escapeModal = useCallback((e) => {
    if (modal?.open && modal.name === "recommendationSystem") return;

    if (e.target === e.currentTarget) dispatch({ type: "CLOSE_MODAL" });
  });

  useEffect(() => {
    if (!user) return;

    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [user]);

  useEffect(() => {
    if (!user || modal?.openModals?.length === 0) return;

    const overlay = document.querySelector(".overlay");

    if (overlay) {
      overlay.addEventListener("click", escapeModal);

      return () => overlay.removeEventListener("click", escapeModal);
    }
  }, [user, modal?.openModals]);

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
