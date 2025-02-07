import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Modal from "./Modal";
import RecommendationSystem from "./RecommendationSystem";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <RecommendationSystem />
      </Modal>
      <NavBar onModalClick={() => setIsOpen(true)} />
      <main className="w-full">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
