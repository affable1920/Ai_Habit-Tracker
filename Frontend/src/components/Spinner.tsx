import { motion } from "motion/react";
import useLoadingStore from "../stores/loadingStore.js";

const base = "spinner";

const spinnerTypes = {
  btn: "justify-end text-xs",
};

const Spinner = () => {
  const loading = useLoadingStore((s) => s.loading);
  const loaderProps = useLoadingStore((s) => s.loaderProps);

  if (loading && spinnerTypes?.[loaderProps?.type])
    return (
      <div className={`flex flex-col gap-1 w-fit mx-auto`}>
        <div className="flex items-center gap-3 justify-center z-[9999]">
          <motion.div
            className={
              "rounded-full w-8 h-8 bg-transparent border-6 border-primary-dark border-b-primary-lightest dark:border-b-primary-lightest"
            }
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
          />
          <h2 className={`dark:text-white`}>
            Loading
            {[".", ".", "."].map((dot, i) => (
              <motion.span
                className="inline-flex ml-1"
                key={i}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.75,
                  delay: i * 0.5,
                }}
              >
                {dot}
              </motion.span>
            ))}
          </h2>
        </div>
        <motion.div
          animate={{
            scaleX: [0, 1],
            originX: 0,
            transition: { duration: 0.75, ease: "linear" },
          }}
          className="h-1 bg-primary-dark dark:bg-primary-lightest w-full"
        />
      </div>
    );
};

export default Spinner;
