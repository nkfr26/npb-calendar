import { MarkGithubIcon } from "@primer/octicons-react";
import Link from "next/dist/client/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <Link href="/" className="font-mono text-xl">
            npb-calendar
          </Link>
          <Button asChild size="icon">
            <a
              href="https://github.com/nkfr26/npb-calendar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
            >
              <MarkGithubIcon />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
