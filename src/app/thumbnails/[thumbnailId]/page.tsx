"use client";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { shuffle } from "lodash";
import { Button } from "@/components/ui/button";

export default function ThumbnailPage() {
  const params = useParams<{ thumbnailId: Id<"thumbnails"> }>();
  const thumbnail = useQuery(api.thumbnails.getThumbnail, {
    thumbnailId: params.thumbnailId,
  });
  if (!thumbnail) {
    return <div>Loading...</div>;
  }
  const images = shuffle([thumbnail.aImage, thumbnail.bImage]);
  return (
    <div className="py-12 flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-bold text-center mb-4">Test Image A</h2>
          <Image
            width="600"
            height="600"
            alt="image test A"
            className="w-full"
            src={getImageUrl(images[0])}
          />
          <Button size="lg" className="w-fit">
            Vote A
          </Button>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-bold text-center mb-4">Test Image B</h2>
          <Image
            width="600"
            height="600"
            alt="image test B"
            className="w-full"
            src={getImageUrl(images[1])}
          />
          <Button size="lg" className="w-fit">
            Vote B
          </Button>
        </div>
      </div>
    </div>
  );
}
