import { MarkGithubIcon } from "@primer/octicons-react";
import Link from "next/dist/client/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background">
      <div className="mx-auto flex w-full max-w-6xl justify-between px-4">
        <Link href="/" className="flex items-center pt-1 font-mono text-xl">
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
    </header>
  );
}
