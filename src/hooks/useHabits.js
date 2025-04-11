import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../context/AuthContext";
import loadingStore from "../stores/loadingStore";
import { toast } from "sonner";
import axios from "axios";

const useHabits = () => {
  const url = "http://localhost:8000/habits";

  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);

  const { setLoading } = loadingStore();
  const [error, setError] = useState("");

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(url, {
        params: { userid: user?.uid, limit: 10 },
      });
      setHabits(data);
    } catch (err) {
      setError(err.response?.data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addHabit = useCallback(async (habit) => {
    console.log(habit);
    const { data: addedHabit } = await axios.post(url, JSON.stringify(habit), {
      params: { userid: user?.uid },
    });
    setHabits((prev) =>
      prev.map((h) => (h.title === habit.title ? addedHabit : h))
    );
    toast.success("Habit added successfully !");
  }, []);

  useEffect(() => {
    if (!user) return;
    getData();

    return () => {
      setHabits([]);
      setError("");
    };
  }, [user]);

  return useMemo(
    () => ({ habits, maxPages: 0, count: 0, error, addHabit }),
    [habits, error]
  );
};

export default useHabits;
