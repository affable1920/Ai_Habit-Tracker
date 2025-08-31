import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.js";
import useAuthStore from "../stores/authStore.js";
import useModalStore from "../stores/modalStore.js";

const Layout = () => {
  const { token, user } = useAuthStore();

  React.useEffect(() => {
    if (token && !user)
      useAuthStore.setState((store) => ({
        ...store,
        user: useAuthStore.getState().getUser(token),
      }));
  }, [token, user]);

  // const [wsMsg, setWsMsg] = React.useState("");
  // const sessionExpired = import.meta.env.VITE_SESSION_EXPIRE;

  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);

  // useEffect(() => {
  //   if (!token) return;

  //   // backend returns jwt with exp and iat in utc: seconds since epoch, so must multiply by 1000 or divide now by 1000
  //   let now = Date.now();
  //   let exp = jwtDecode(token)["exp"] * 1000;

  //   let timeLeft = (exp - now) / 1000;
  //   if (!timeLeft || timeLeft <= 0) logout();

  //   const WSURL = `ws://localhost:8000/ws`;
  //   const ws = new WebSocket(WSURL + `?token=${token}`);

  //   ws.onopen = () => {
  //     toast.success("Ws connected");
  //     console.log("Connected.");
  //     ws.send("Hello server");
  //   };

  //   ws.onmessage = ({ data }) => {
  //     let msg;
  //     if (data) msg = JSON.parse(data);

  //     toast.success(msg);
  //     setWsMsg(msg);
  //   };

  //   ws.onerror = (ev) => {
  //     console.log(ev);
  //   };

  //   ws.onclose = (ev) => {
  //     if (ev.reason == sessionExpired) {
  //       toast("Session Expired!", {
  //         description: "Logging out ...",
  //         duration: 1200,
  //       });
  //       evEmitter.emit(sessionExpired);
  //     }
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, [token, wsMsg]);

  const shortcut = React.useCallback((e) => {
    const shortcutKey = e.ctrlKey
      ? "control" + e.key.toLowerCase()
      : e.key.toLowerCase();

    if (shortcutKey === "escape") closeModal();

    if (shortcutKey === "controlk") {
      e.preventDefault();
      openModal("SEARCH_BAR");
    }

    if (shortcutKey === "controlr") {
      e.preventDefault();
      openModal("RECOMMENDATION_SYSTEM");
    }
  }, []);

  // const escapeModal = useCallback((e) => {
  //   const classes = ["modal", "nav-bar"];

  //   if (e.target === e.currentTarget)
  //     closeModal({
  //       name: modals[modals.length - 1],
  //     });
  // });

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
      <header className="app-header">
        <NavBar />
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
