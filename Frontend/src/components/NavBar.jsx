import { useState } from "react";
import NavLinks from "./NavLinks";
import IconComponent from "./IconComponent";
import AuthActions from "./AuthActions";
import { HiMenuAlt2 } from "react-icons/hi";

const Logo = ({ toggleFn }) => {
  return (
    <IconComponent
      Icon={HiMenuAlt2}
      bg={true}
      fn={toggleFn}
      pClass={"lg:hidden"}
    />
  );
};

const NavBar = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <>
      <nav className="navbar">
        <Logo toggleFn={() => setShowLinks(!showLinks)} />
        <NavLinks showLinks={showLinks} />
        <AuthActions />
      </nav>
    </>
  );
};

export default NavBar;
