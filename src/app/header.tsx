"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

export function Header() {
  return (
    <div className="border-b">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" title="Thumbnail Rater">
          Thumbnail Rater
        </Link>
        <div className="flex gap-4">
          <SignedIn>
            <Link href="/dashboard" className="link">
              Dashboard
            </Link>
            <Link href="/create" className="link">
              Create
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/pricing" className="link">
              Pricing
            </Link>
            <Link href="/about" className="link">
              About
            </Link>
          </SignedOut>
        </div>
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
