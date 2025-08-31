import React from "react";
import useAuthStore from "../stores/authStore.js";
import { capitalise } from "../utilityFns/utils.js";
import type { User } from "../types/genericTypes.js";
import useLoadingStore from "../stores/loadingStore.js";

const Profile = () => {
  const [profile, setProfile] = React.useState<User | {}>({});

  const getProfile = useAuthStore((s) => s.getProfile);
  const setLoading = useLoadingStore((s) => s.setLoading);

  React.useEffect(() => {
    const fetchProfile = async () => {
      setLoading();
      try {
        const userProfile = await getProfile();
        setProfile(userProfile);
      } catch (ex) {
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="m-14">
      {Object.entries(profile).map(([key, value]) => (
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
