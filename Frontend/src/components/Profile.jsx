import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./../context/AuthContext";
import { capitalize } from "./Habitdetails";

const Profile = () => {
  const [profile, setProfile] = useState();
  const { getProfile } = useContext(AuthContext);

  const unwanted = ["id", "password", "createdAt", "updatedAt"];

  const fetchProfile = async () => {
    setProfile(
      Object.entries(await getProfile()).filter(([key, value]) => {
        if (!unwanted.includes(key)) return [key, value];
      })
    );
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="m-14">
      {profile?.map(([key, value]) => (
        <div
          className="flex justify-between gap-3 items-center italic tracking-wider"
          key={key}
        >
          <div>{capitalize(key)}</div>
          <div>{value}</div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
