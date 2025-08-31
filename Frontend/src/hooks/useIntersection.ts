import { useEffect, useRef, useState } from "react";

const useIntersection = (options: IntersectionObserver) => {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      options
    );

    const currElement = elementRef.current;

    if (currElement) observer.observe(currElement);
    return () => (currElement && observer.unobserve(currElement)) ?? undefined;
  }, [visible]);

  return { elementRef, visible };
};

export default useIntersection;
