import React from "react";
import { capitalise } from "../Utils/utilFns";
import useAuthStore from "../stores/authStore";
import useLoadingStore from "../stores/loadingStore";

const Profile = () => {
  const getProfile = useAuthStore((s) => s.getProfile);
  // if (!getProfile) return null;

  const [profile, setProfile] = React.useState(null);
  const unwanted = ["id", "password", "createdAt", "updatedAt"];

  const setLoading = useLoadingStore((s) => s.setLoading);

  React.useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        let userProfile = await getProfile();

        if (userProfile)
          setProfile(() => {
            // Object.entries -> an array so must keep a seperate obj.
            return Object.entries(userProfile).filter(([key, value]) => {
              if (unwanted.includes(key)) return;
              return [key, value];
            });
          });
      } catch (ex) {
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="m-14">
      {Array.isArray(profile) &&
        profile.map(([key, value]) => (
          <div
            className="flex justify-between gap-3 items-center italic tracking-wider"
            key={key}
          >
            <div>{capitalise(key)}</div>
            <div>{value}</div>
          </div>
        ))}
    </div>
  );
};

export default Profile;
