"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { formatDistance } from "date-fns";

export default function DashboardPage() {
  const thumbnails = useQuery(api.thumbnails.getThumbnailsForUser);

  const sortedThumbnails = [...(thumbnails ?? [])].reverse();
  return (
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
              <h2 className="text-2xl font-bold">{thumbnail.title}</h2>
              <p className="text-gray-400">
                {formatDistance(new Date(thumbnail._creationTime), new Date(), {
                  addSuffix: true,
                })}
              </p>
              <p className="text-gray-400">
                total votes: {thumbnail.aVotes + thumbnail.bVotes}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/thumbnails/${thumbnail._id}`}>View Result</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
