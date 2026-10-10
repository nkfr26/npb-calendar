import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === "dark");

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme") !== null) return;
      } catch {}
      setDark(event.matches);
      document.documentElement.dataset.theme = event.matches ? "dark" : "light";
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = (isDark: boolean) => {
    setDark(isDark);
    const theme = isDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.add("theme-changing");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => document.documentElement.classList.remove("theme-changing")),
    );
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  };
  return (
    <label className="toggle border-base-content/10 bg-base-content/10 toggle-sm before:bg-base-100 has-[:checked]:before:bg-black [&>svg]:text-base-content">
      <input
        type="checkbox"
        checked={dark}
        onChange={(event) => setTheme(event.currentTarget.checked)}
        aria-label="ダークモード"
      />
      <Sun className="size-3.5" />
      <Moon className="size-3.5" />
    </label>
  );
}
