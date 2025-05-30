import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Modal from "./Modal";
import Tooltip from "./Tooltip";
import tootlipStore from "../stores/tooltipStore";
import Spinner from "./Spinner";

const Layout = () => {
  let { element, setPosition } = tootlipStore();

  useEffect(() => {
    if (element) {
      try {
        const rect = document.querySelector(element).getBoundingClientRect();
        const tooltip = document.querySelector(".tooltip");

        const observer = new IntersectionObserver((e) => {
          if (e[0].isIntersecting) {
            tooltip.style.opacity = 100;

            tooltip.style.pointerEvents = "auto";
          }
        });

        observer.observe(tooltip);

        setPosition({ x: rect.left - 20, y: rect.top - 90 });
      } catch (error) {
        console.log(error);
      }
    }
  }, [element]);

  const AppLayout = () => {
    return (
      <>
        <header>
          <NavBar />
        </header>
        <main className="flex flex-col h-screen">
          <Outlet />
        </main>
      </>
    );
  };

  return (
    <>
      <Modal />
      <Spinner />
      <Tooltip />
      <AppLayout />
    </>
  );
};

export default Layout;
