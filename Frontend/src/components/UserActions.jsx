import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Providers/AuthProvider";
import { CgProfile } from "react-icons/cg";
import { MdSettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

const UserActions = ({ showFeatures, setShowFeatures }) => {
  const { logout } = useContext(AuthContext);

  const profileFeatures = [
    {
      icon: <CgProfile />,
      label: "profile",
    },
    { icon: <MdSettings />, label: "settings" },
    {
      icon: <LuLogOut onClick={logout} />,
      label: "logout",
    },
  ];

  return (
    <ul className={`profile__features`}>
      {profileFeatures.map(({ icon, label }) => (
        <Link
          onClick={() => showFeatures && setShowFeatures(false)}
          to={`/${label}`}
          className={`profile__feature`}
          key={label}
        >
          {/* <li> */}
          {label[0].toUpperCase() + label.slice(1)}
          <span>{icon}</span>
          {/* </li> */}
        </Link>
      ))}
    </ul>
  );
};

export default UserActions;
