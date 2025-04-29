import { useEffect, useRef, useState } from "react";

const useIntersection = (options) => {
  const [visible, setVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      options
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => elementRef.current && observer.unobserve(elementRef.current);
  }, [visible]);

  return { elementRef, visible };
};

export default useIntersection;
