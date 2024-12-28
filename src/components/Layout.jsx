import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="w-full">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
