import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdSettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { capitalise } from "../Utils/utilFns";

const UserActions = () => {
  const profileFeatures = [
    {
      icon: <CgProfile />,
      label: "profile",
    },
    { icon: <MdSettings />, label: "settings" },
    {
      icon: <LuLogOut />,
      label: "logout",
    },
  ];

  return (
    <ul className={`profile__features`}>
      {profileFeatures.map(({ icon, label }) => (
        <li key={label}>
          <Link to={`/${label}`} className={`profile__feature`} key={label}>
            {capitalise(label)}
            <span>{icon}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UserActions;
