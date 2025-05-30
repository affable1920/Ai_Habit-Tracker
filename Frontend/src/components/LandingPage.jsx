import { useRef } from "react";
import { motion } from "framer-motion";
import useSlider from "../hooks/useSlider";
import { AnimatePresence } from "framer-motion";

let rawImages = import.meta.glob("../assets/slides/*.png", {
  eager: true,
});

let images = Object.keys(rawImages).map((path) => {
  return new URL(path + "?w=200&format=webp&as=meta", import.meta.url).href;
});

const LandingPage = () => {
  const ref = useRef(null);

  const { imgIndex, animation, sliderVariants, text, startSlider } =
    useSlider(ref);

  const sliderTransition = { duration: 0.75, ease: "easeIn" };

  const sliderImg = () => {
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
  };

  const sliderText = () => {
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
  };

  return (
    <div className="overflow-hidden">
      {
        <motion.div
          initial="invisible"
          animate={animation}
          variants={sliderVariants}
        >
          {startSlider && (
            <div className="flex justify-center items-center py-12 relative">
              <div className="flex justify-center">
                {sliderImg()} {sliderText()}
              </div>
            </div>
          )}
        </motion.div>
      }
    </div>
  );
};

export default LandingPage;
