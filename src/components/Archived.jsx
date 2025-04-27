import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";

const Archived = () => {
  const { user } = useContext(AuthContext);
  const key = ["users", user?.uid, "habits", "archived"];

  const firestore = "fs";

  const { data } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const archivedRef = collection(
        firestore,
        "users",
        user?.uid,
        "habits",
        "archived"
      );
      const docSnaps = await getDocs(
        query(archivedRef, where("archived", "==", true))
      );

      return docSnaps.docs.map((doc) => doc.data());
    },
  });

  return <div>Archived</div>;
};

export default Archived;
