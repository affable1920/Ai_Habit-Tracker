import React from "react";
import NavLinks from "./NavLinks";
import Button from "./Button";
import AuthActions from "./AuthActions";
import { HiMenuAlt2 } from "react-icons/hi";

const Logo = ({ toggleFn }) => {
  return (
    <Button onClick={toggleFn} className="lg:hidden">
      <HiMenuAlt2 />
    </Button>
  );
};

const NavBar = () => {
  const [showLinks, setShowLinks] = React.useState(false);
  const onRouteChange = () => setShowLinks(false);

  return (
    <>
      <nav className="navbar">
        <Logo toggleFn={() => setShowLinks((p) => !p)} />
        <NavLinks showLinks={showLinks} onRouteChange={onRouteChange} />
        <AuthActions />
      </nav>
    </>
  );
};

export default NavBar;
