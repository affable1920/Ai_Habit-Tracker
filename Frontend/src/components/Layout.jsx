import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { ModalContext } from "./Providers/ModalProvider";
import Modal from "./Modal";
import NavBar from "./NavBar";
import Spinner from "./Spinner";
import Tooltip from "./Tooltip";
import { toast } from "sonner";
import eventEmitter from "../services/eventEmiiter";
import { jwtDecode } from 'jwt-decode';

const Layout = () => {
  const { user, token, logout } = React.useContext(AuthContext);
  const { modals, dispatch } = React.useContext(ModalContext);


  useEffect(() => {
    if(!token) return;

    // backend returns jwt with exp and iat in utc: seconds since epoch, so must multiply by 1000 or divide now by 1000
    let now = Date.now()
    let exp = jwtDecode(token)["exp"] * 1000

    let timeLeft = (exp - now) / 1000;
    if(!timeLeft || timeLeft <= 0)
      logout();

    const WSURL = `ws://localhost:8000/ws`;
    const ws = new WebSocket(WSURL, [token]);

    const sessionExpired = "SESSION_EXP";

    ws.onopen = () => {
      toast.success("Ws connected");
      console.log('Connected.')
      ws.send("Hello server")
    };

    ws.onmessage = (ev) => {
      console.log(JSON.parse(ev.data))
    };

    ws.onerror = (ev) => {
      console.log(ev)
    }
    
    ws.onclose = (ev) => {
      if(ev.reason == sessionExpired) {
        logout();
      }
    }

    return () => {
      ws.close();
    };
  }, [token]);

  const shortcut = React.useCallback((e) => {
    const shortcutKey = e.ctrlKey
      ? "control" + e.key.toLowerCase()
      : e.key.toLowerCase();

    if (shortcutKey === "escape")
      dispatch({
        type: "CLOSE_ALL",
      });

    if (shortcutKey === "controlk") {
      e.preventDefault();
      dispatch({ type: "OPEN_MODAL", name: "search_bar" });
    }

    if (shortcutKey === "controlr") {
      e.preventDefault();
      dispatch({ type: "OPEN_MODAL", name: "rec_system" });
    }
  }, []);

  // const escapeModal = useCallback((e) => {
  //   const classes = ["modal", "nav__bar"];

  //   if (e.target === e.currentTarget)
  //     dispatch({
  //       type: "CLOSE_MODAL",
  //       name: modals.open[modals.open.length - 1],
  //     });
  // });

  const noneOpen = !user || modals?.open?.length === 0;

  React.useEffect(() => {
    if (!user) return;

    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [user]);

  // useEffect(() => {
  //   if (noneOpen) return;
  //   const overlay = document.querySelector(".overlay");

  //   if (overlay) overlay.addEventListener("click", escapeModal);
  //   if (overlay) return () => overlay.removeEventListener("click", escapeModal);
  // }, [user, modals?.open]);

  return (
    <>
      {/* Portals */}
      <Modal />
      <Spinner />
      <Tooltip />

      {/* Main Layout */}
      <section className="flex flex-col h-full">
        <header>
          <NavBar />
          <div>
          </div>
        </header>
        <main className="grow">
          <Outlet />
        </main>
      </section>
    </>
  );
};

export default Layout;
