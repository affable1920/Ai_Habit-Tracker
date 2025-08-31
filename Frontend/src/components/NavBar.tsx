import React from "react";
import NavLinks from "./NavLinks.js";
import Button from "./Interactives/Button.js";
import AuthActions from "./AuthActions.js";
import { HiMenuAlt2 } from "react-icons/hi";

const Logo = ({ toggleFn }: { toggleFn: () => void }) => {
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
    <nav className="navbar">
      <Logo toggleFn={() => setShowLinks((p) => !p)} />
      <NavLinks showLinks={showLinks} onRouteChange={onRouteChange} />
      <AuthActions />
    </nav>
  );
};

export default NavBar;
