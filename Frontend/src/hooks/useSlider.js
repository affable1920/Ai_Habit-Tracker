import { useState, useRef, useEffect } from "react";
import { useAnimation } from "framer-motion";

const useSlider = (ref) => {
  // Animation phrases
  const phrases = [
    "Do you Procrastinate ?",
    "Feel Confused ?",
    `Can't get things done ?`,
    `Can't build a habit ?`,
    "Well, you lucky 'Bastard', you've come to the right place !",
  ];

  // Animation variants
  const sliderVariants = {
    invisible: {
      x: "-100vw",
      height: "2px",
      backgroundColor: "cyan",
      transition: { duration: 1 },
    },
    step1: {
      x: "50px",
      transition: { duration: 0.75 },
    },
    step2: {
      x: "60px",
      transition: { duration: 0.5 },
    },
    step3: {
      x: 0,
    },
    step4: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.25 },
    },
    step5: {
      height: "400px",
      opacity: 1,
      backgroundColor: "black",
      transition: { duration: 0.75 },
    },
  };

  const phrasesArray = phrases.map((phrase) => Array.from(phrase));

  const animation = useAnimation();

  const [text, setText] = useState("");

  const [charIndex, setCharIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const [imgIndex, setImgIndex] = useState(0);
  const [startSlider, setStartSlider] = useState(false);

  useEffect(() => {
    const animate = async () => {
      await animation.start("step1");

      await animation.start("step2");

      await animation.start("step3");

      await animation.start("step4");

      await animation.start("step5");

      setStartSlider(true);
    };

    animate();
    return () => animation.stop();
  }, []);

  useEffect(() => {
    if (!startSlider) return;

    let timeout;
    if (phraseIndex < phrasesArray.length) {
      let phraseLength = phrasesArray[phraseIndex].length;
      let letter = phrasesArray[phraseIndex][charIndex];

      const lastChar = charIndex === phraseLength;
      const lastPhrase = phraseIndex === phrasesArray.length - 1;

      const delay = lastChar && !lastPhrase ? 1000 : 100;

      timeout = setTimeout(() => {
        setText((prev) =>
          lastChar ? (lastPhrase ? prev : "") : prev + letter
        );

        ref.current = true;

        setCharIndex((prev) => (lastChar ? (lastPhrase ? prev : 0) : prev + 1));

        setPhraseIndex((prev) =>
          lastChar ? (lastPhrase ? prev : prev + 1) : prev
        );

        setImgIndex((prev) => {
          return lastChar ? (lastPhrase ? prev : prev + 1) : prev;
        });
      }, delay);
    }

    // const cursor = document.querySelector(".cursor");
    // cursor && (cursor.style.animationDuration = "1500ms");

    return () => timeout && clearTimeout(timeout);
  }, [charIndex, phraseIndex, imgIndex, startSlider]);

  return { text, imgIndex, sliderVariants, animation, startSlider };
};

export default useSlider;
