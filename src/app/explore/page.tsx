"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ZoomIn } from "lucide-react";
import { useSession } from "@clerk/nextjs";
import { Doc } from "../../../convex/_generated/dataModel";

export default function ExplorePage() {
  const {
    results: thumbnails,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.thumbnails.getRecentThumbnails,
    {},
    { initialNumItems: 5 }
  );

  const session = useSession();

  function hasVoted(thumbnail: Doc<"thumbnails">) {
    if (!session.session) return false;
    return thumbnail.voteIds.includes(session.session.user.id);
  }

  const sortedThumbnails = [...(thumbnails ?? [])].reverse();
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sortedThumbnails?.map((thumbnail) => {
          return (
            <Card key={thumbnail._id}>
              <CardHeader>
                <Image
                  src={getImageUrl(thumbnail.aImage)}
                  width="600"
                  height="600"
                  alt={thumbnail.title}
                />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={thumbnail.profileImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{thumbnail.title}</h2>
                </div>

                <p className="text-gray-400">
                  {formatDistance(
                    new Date(thumbnail._creationTime),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  )}
                </p>
                <p className="text-gray-400">
                  total votes: {thumbnail.aVotes + thumbnail.bVotes}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant={hasVoted(thumbnail) ? "outline" : "default"}
                  asChild
                  className="w-full"
                  size="icon"
                >
                  <Link href={`/thumbnails/${thumbnail._id}`}>
                    {hasVoted(thumbnail) ? "View Result" : "vote"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <Button
        className="w-fit mx-auto"
        onClick={() => {
          loadMore(5);
        }}
        disabled={status !== "CanLoadMore"}
      >
        Load More
      </Button>
    </div>
  );
}
