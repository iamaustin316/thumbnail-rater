"use client";

import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { isSignedIn } = useSession();
  const createThumbnail = useMutation(api.thumbnails.createThumbnail);
  const thumbnails = useQuery(api.thumbnails.getThumbnailsForUser);
  return (
    <main>
      {isSignedIn ? <SignOutButton /> : <SignInButton />}
      {isSignedIn && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const title = formData.get("title") as string;
            await createThumbnail({
              title,
            });
            form.reset();
          }}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="text-blue-500"
            name="title"
            placeholder="input some thing"
          />
          <button>Create</button>
        </form>
      )}
      {thumbnails?.map((thumbnail) => {
        return <div key={thumbnail._id}>{thumbnail.title}</div>;
      })}
    </main>
  );
}
