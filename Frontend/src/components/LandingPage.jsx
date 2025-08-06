import React from "react";
import { motion } from "framer-motion";
import useSlider from "../hooks/useSlider";
import { SliderImg, SliderText } from "./Sliders";

let rawImages = import.meta.glob("../assets/slides/*.png", {
  eager: true,
});

let images = Object.keys(rawImages).map((path) => {
  return new URL(path + "?w=200&format=webp&as=meta", import.meta.url).href;
});

const LandingPage = () => {
  const ref = React.useRef(null);

  const { imgIndex, animation, sliderVariants, text, startSlider } =
    useSlider(ref);

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
                <SliderImg imgIndex={imgIndex} images={images} />
                <SliderText imgIndex={imgIndex} text={text} />
              </div>
            </div>
          )}
        </motion.div>
      }
    </div>
  );
};

export default LandingPage;
