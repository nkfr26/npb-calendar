import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const onThemeChange = (theme: "light" | "dark") => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {}
    document.documentElement.classList.add("theme-changing");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => document.documentElement.classList.remove("theme-changing")),
    );
  };
  return (
    <label className="toggle border-base-content/10 bg-base-content/10 toggle-sm before:bg-base-100 has-[:checked]:before:bg-black [&>svg]:text-base-content">
      <input
        type="checkbox"
        defaultChecked={document.documentElement.dataset.theme === "dark"}
        onChange={(event) => onThemeChange(event.currentTarget.checked ? "dark" : "light")}
        aria-label="ダークモード"
      />
      <Sun className="size-3.5" />
      <Moon className="size-3.5" />
    </label>
  );
}
