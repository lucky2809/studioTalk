import { useEffect, useRef, useState } from "react";

const ScrollAnimation = () => {
  const ref = useRef([]);
  const [visible, setVisible] = useState(new Set());

  useEffect(() => {
    if (!ref.current.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));

          if (entry.isIntersecting) {
            setVisible(prev => {
              const newSet = new Set(prev);
              newSet.add(index);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.1,
        root: null,
      }
    );

    ref.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ref.current.length]);

  return { ref, visible };
};

export default ScrollAnimation;