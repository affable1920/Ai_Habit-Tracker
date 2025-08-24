import Overlay from "./Overlay";
import { motion } from "motion/react";
import useLoadingStore from "../stores/loadingStore";

const baseSpinner = "spinner";

// This object decides spinner position and z-index.
const spinnerTypes = {
  app: "absolute right-1/2 top-1/2 translate-x-1/2 translate-y-1/2",
  specific: "",
};

const Spinner = () => {
  const loading = useLoadingStore((s) => s.loading);
  const loaderProps = useLoadingStore((s) => s.props);

  if (!loading) return null;

  const spinnerType = loaderProps?.type ?? "app";
  const classConfig = [baseSpinner, spinnerTypes[spinnerType]]
    .filter(Boolean)
    .join(" ");

  return spinnerType === "app" ? (
    <Overlay alpha="A">
      <motion.div
        animate={{
          rotate: 360,
          transition: { repeat: Infinity, duration: 1.1 },
        }}
        className={classConfig}
      />
    </Overlay>
  ) : (
    <motion.div className={classConfig} />
  );
};

export default Spinner;
