import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.add("theme-changing");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => document.documentElement.classList.remove("theme-changing")),
    );
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);
  return (
    <label className="toggle border-base-content/10 bg-base-content/10 toggle-sm before:bg-base-100 has-[:checked]:before:bg-black [&>svg]:text-base-content">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={(event) => setTheme(event.currentTarget.checked ? "dark" : "light")}
        aria-label="ダークモード"
      />
      <Sun className="size-3.5" />
      <Moon className="size-3.5" />
    </label>
  );
}
