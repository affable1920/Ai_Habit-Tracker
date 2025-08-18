import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const sliderTransition = { duration: 0.75, ease: "easeIn" };

export const SliderImg = React.memo(({ imgIndex, images }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.img
        className="object-cover w-[240px]"
        key={imgIndex}
        src={images[imgIndex]}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={sliderTransition}
      />
    </AnimatePresence>
  );
});

export const SliderText = React.memo(({ imgIndex, text }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.h3
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 25 }}
        transition={sliderTransition}
        key={imgIndex}
        className="font-bold max-md:w-[80%%] mx-auto leading-5 tracking-wider absolute bottom-0 text-center"
      >
        {text}
      </motion.h3>
    </AnimatePresence>
  );
});
