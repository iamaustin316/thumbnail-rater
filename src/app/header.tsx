"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

export function Header() {
  return (
    <div className="border-b">
      <div className="container flex justify-between items-center py-4">
        <div>Thumbnail Rater</div>
        <div className="flex gap-4">
          <SignedIn>
            <Link href="/create">Create</Link>
          </SignedIn>
          <SignedOut>
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About</Link>
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
