import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const onThemeChange = (theme: "light" | "dark") => {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}

  document.documentElement.classList.add("theme-changing");
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      document.documentElement.classList.remove("theme-changing");
    }),
  );
};

const subscribe = (onStoreChange: () => void) => {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};

export function ThemeToggle() {
  const isDark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
  return (
    <label className="toggle border-base-content/10 bg-base-content/10 toggle-sm before:bg-base-100 has-[:checked]:before:bg-black [&>svg]:text-base-content">
      <input
        type="checkbox"
        defaultChecked={isDark}
        onChange={(event) => onThemeChange(event.currentTarget.checked ? "dark" : "light")}
        aria-label="ダークモード"
      />
      <Sun className="size-3.5" />
      <Moon className="size-3.5" />
    </label>
  );
}
