import React, { useEffect, useReducer, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Modal from "./Modal";
import RecommendationSystem from "./RecommendationSystem";
import NavFeatures from "./NavFeatures";
import ModalReducer from "../reducers/ModalReducer";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const [open, dispatch] = useReducer(ModalReducer);
  const shortcut = (e) => {
    if ((e.key === "Escape" && isOpen) || isSearchBarOpen) setIsOpen(false);
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      setIsSearchBarOpen(true);
      setIsOpen(true);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {isSearchBarOpen ? (
          <div>Search Bar</div>
        ) : (
          <RecommendationSystem onClose={() => setIsOpen(false)} />
        )}
      </Modal>
      <NavBar onModalClick={() => setIsOpen(true)} />
      <main className="relative h-full pt-20">
        {/* <NavFeatures onModalClick={() => setIsOpen(true)} /> */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
