import { useEffect, useState } from "react";

function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black transition"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
export default DarkModeToggle