import { useEffect } from "react";

function CursorEffect() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className =
      "fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 bg-pink-500 mix-blend-difference";
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
}
export default CursorEffect