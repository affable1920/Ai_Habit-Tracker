import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "./../context/AuthContext";
import { updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { firestore } from "../services/authService";
import { QueryContext } from "../components/Providers/QueryProvider";

const useUpdateHabit = () => {
  const { user } = useContext(AuthContext);
  const { query } = useContext(QueryContext);

  const queryClient = useQueryClient();
  const key = [user?.uid, "habits"];

  return useMutation({
    queryKey: key,

    mutationFn: async (habitRequest) => {
      const { habitId, fieldsToUpdate } = habitRequest;
      const habitRef = doc(firestore, "users", user?.uid, "habits", habitId);

      if (fieldsToUpdate.archived) {
        const archivedRef = doc(
          firestore,
          "users",
          user?.uid,
          "archived",
          habitId
        );

        try {
          await setDoc(archivedRef, fieldsToUpdate);
          await deleteDoc(habitRef);
        } catch (error) {
          throw Error(error?.message);
        }
      }
      await updateDoc(habitRef, fieldsToUpdate);
    },

    onMutate: async (habitRequest) => {
      const { habitId = null } = habitRequest;

      const prevHabits = queryClient.getQueryData([...key, query]);

      queryClient.setQueryData([...key, query], (prevData = {}) => {
        const { habits = [] } = prevData;

        return {
          ...prevData,
          habits: habits.map((h) =>
            h.id === habitId ? { ...h, ...habitRequest.fieldsToUpdate } : h
          ),
        };
      });

      return prevHabits;
    },

    onSuccess: () => queryClient.invalidateQueries([...key, query]),

    onError: (error, updatedHabit, context) => {
      console.log(error);
      if (!context) return;

      return queryClient.setQueryData(
        [...key, query],
        () => context.prevHabits
      );
    },
  });
};

export default useUpdateHabit;
