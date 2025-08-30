import React from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";

const sliderTransition: Transition = { duration: 0.75, ease: "easeIn" };

type SliderTextProps = { imgIndex: number; text: string };
type SliderImgProps = { imgIndex: number; images: string[] };

export const SliderImg = React.memo(({ imgIndex, images }: SliderImgProps) => {
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

export const SliderText = React.memo(({ imgIndex, text }: SliderTextProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.h3
        key={imgIndex}
        exit={{ opacity: 0, y: 25 }}
        transition={sliderTransition}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="font-bold max-md:w-[80%%] mx-auto leading-5 tracking-wider absolute bottom-0 text-center"
      >
        {text}
      </motion.h3>
    </AnimatePresence>
  );
});
