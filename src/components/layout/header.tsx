"use client";

import Link from "next/link";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useSession } from "../../lib/auth-client";
import UserMenu from "../auth/user-menu";
import ThemeToggleButton from "../theme/theme-toggle";

function Header() {
  const { data:session, isPending } = useSession();

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-2xl mr-5">
            Next.js 15 Blog
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((navItem, index) => (
              <Link
                key={index}
                href={navItem.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-amber-100"
                )}
              >
                {navItem.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            {/* place holder for search icon */}
          </div>
          <div className="hidden md:block">
            {/* Theme toggle button */}
            <ThemeToggleButton />
          </div>
          <div className="flex items-center justify-end">
            {isPending ? null : session?.user ? (
              <UserMenu user={session.user} />
            ) : (
              <Button variant={"ghost"}>
                <Link href="/auth">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
