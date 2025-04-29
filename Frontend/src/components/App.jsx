import React, { useContext, useEffect, useCallback, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AuthContext from "../context/AuthContext";
import { ModalContext } from "./Providers/ModalProvider";
import "../App.css";

const App = () => {
  const { user } = useContext(AuthContext);
  const { modal, dispatch } = useContext(ModalContext);

  const [socket, setSocket] = useState(null);

  const shortcut = useCallback((e) => {
    const shortcut = e.ctrlKey
      ? "control" + e.key.toLowerCase()
      : e.key.toLowerCase();

    if (shortcut === "escape")
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

    if (e.target === e.currentTarget)
      dispatch({
        type: "CLOSE_MODAL",
        name: modal.openModals[modal.openModals.length - 1],
      });
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

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onopen = () => {
      console.log("WebSocket connection Established");
      ws.send("Hello from client");
    };

    ws.onmessage = (ev) => {
      console.log(ev);
    };

    setSocket(ws);

    return () => ws.close();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
