import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Modal from "./Modal";

const Layout = () => {
  return (
    <>
      <Modal />
      <NavBar />
      <main className="relative h-full pt-20">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
