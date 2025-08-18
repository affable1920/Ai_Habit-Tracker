import { motion } from "motion/react";
import useLoadingStore from "../stores/loadingStore";

const Spinner = () => {
  const loading = useLoadingStore((s) => s.loading);
  if (!loading) return null;

  return (
    <motion.circle
      className="w-7 h-7 rounded-full ring-4 ring-accent inline-flex justify-center 
      items-center self-center justify-self-center"
      animate={{ rotate: 360 }}
    />
  );
};

export default Spinner;
