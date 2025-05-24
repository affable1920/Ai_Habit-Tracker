import { useRef } from "react";
import { motion } from "motion/react";
import useSlider from "../hooks/useSlider";

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

  return (
    <div className="overflow-hidden">
      <motion.div
        initial="invisible"
        animate={animation}
        variants={sliderVariants}
      >
        {startSlider && (
          <div className="flex justify-center items-center py-12 flex-col gap-6">
            <img
              ref={ref}
              src={images[imgIndex]}
              className={`object-cover w-[240px] scale-0 opacity-0 ${
                ref.current && "scale-100 opacity-100"
              } transition-all duration-300`}
            />
            <div className="font-bold text-center max-md:w-[75%] leading-5">
              <h3>{text}</h3>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LandingPage;
