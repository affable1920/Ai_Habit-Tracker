import { CgProfile } from "react-icons/cg";
import { MdSettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { Navigate } from "react-router-dom";

const UserActions = () => {
  const features = [
    {
      icon: CgProfile,
      label: "profile",
    },
    { icon: MdSettings, label: "settings" },
    {
      icon: LuLogOut,
      label: "logout",
    },
  ];

  const onRouteChange = (gotoRoute: string) => {
    try {
      return <Navigate to={`/${gotoRoute}`} />;
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <ul className={`profile-features`}>
      {features.map(({ icon: Icon, label }) => (
        <button
          key={label}
          className="profile-feature gap-4"
          onClick={() => onRouteChange(label)}
        >
          <h2 className="capitalize italic font-bold">{label}</h2>
          <Icon />
        </button>
      ))}
    </ul>
  );
};

export default UserActions;
