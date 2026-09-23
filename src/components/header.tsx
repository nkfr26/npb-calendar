import { MarkGithubIcon } from "@primer/octicons-react";

import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b border-base-300 bg-base-100">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4">
        <a href="/" className="pt-1 font-mono text-xl">
          npb-calendar
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://github.com/nkfr26/npb-calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-square btn-ghost"
            aria-label="GitHub Repository"
          >
            <MarkGithubIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
