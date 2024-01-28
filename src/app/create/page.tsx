"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/utils";

const defaultErrorState = {
  title: "",
  imageA: "",
  imageB: "",
};

export default function CreatePage() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createThumbnail = useMutation(api.thumbnails.createThumbnail);
  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");
  const [errors, setErrors] = useState(defaultErrorState);
  const { toast } = useToast();
  const router = useRouter();
  return (
    <div className="py-12 flex flex-col gap-2">
      <h1 className="text-4xl font-bold">Create a Thumbnail Test</h1>
      <p className="text-lg max-w-md mb-8">
        Create your test so that other people can vote on their favorite
        thumbnail and help you redesign or pick the best options.
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const title = formData.get("title") as string;
          let newErrors = {
            ...defaultErrorState,
          };
          setErrors(() => newErrors);

          if (!title) {
            newErrors = {
              ...newErrors,
              title: "Please fill in this required field",
            };
          }

          if (!imageA) {
            newErrors = {
              ...newErrors,
              imageA: "Please fill in this required field",
            };
          }

          if (!imageB) {
            newErrors = {
              ...newErrors,
              imageB: "Please fill in this required field",
            };
          }

          setErrors(newErrors);

          const hasErrors = Object.values(newErrors).some(Boolean);
          if (hasErrors) {
            toast({
              title: "Form Errors",
              description: "Please fill out all fields",
              variant: "destructive",
            });
            return;
          }

          const thumbnailId = await createThumbnail({
            aImage: imageA,
            bImage: imageB,
            title,
          });

          router.push(`/thumbnails/${thumbnailId}`);
        }}
      >
        <div className="flex flex-col gap-4 mb-8">
          <Label className="text-2xl font-bold" htmlFor="title">
            Test Title
          </Label>
          <Input
            id="title"
            type="text"
            name="title"
            placeholder="Something"
            className={clsx("flex flex-col gap-4 rounded-lg p-2", {
              "border border-dashed border-red-500": errors.title,
            })}
          />
          {errors.title && (
            <p className="text-red-400 text-base">{errors.title}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div
            className={clsx("flex flex-col gap-4 rounded-lg p-2", {
              "border border-dashed border-red-500": errors.imageA,
            })}
          >
            <h2 className="text-2xl font-bold">Test Image A</h2>
            {imageA && (
              <Image
                width="200"
                height="200"
                alt="image test A"
                src={getImageUrl(imageA)}
              />
            )}
            <UploadButton
              uploadUrl={generateUploadUrl}
              fileTypes={["image/*"]}
              onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                setImageA((uploaded[0].response as any).storageId);
              }}
              onUploadError={(error: unknown) => {
                // Do something with the error.
                alert(`ERROR! ${error}`);
              }}
            />
            {errors.imageA && (
              <p className="text-red-400 text-base">{errors.imageA}</p>
            )}
          </div>
          <div
            className={clsx("flex flex-col gap-4 rounded-lg p-2", {
              "border border-dashed border-red-500": errors.imageB,
            })}
          >
            <h2 className="text-2xl font-bold">Test Image B</h2>
            {imageB && (
              <Image
                width="200"
                height="200"
                alt="image test B"
                src={getImageUrl(imageB)}
              />
            )}
            <UploadButton
              uploadUrl={generateUploadUrl}
              fileTypes={["image/*"]}
              onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                setImageB((uploaded[0].response as any).storageId);
              }}
              onUploadError={(error: unknown) => {
                // Do something with the error.
                alert(`ERROR! ${error}`);
              }}
            />
            {errors.imageB && (
              <p className="text-red-400 text-base">{errors.imageB}</p>
            )}
          </div>
        </div>
        <Button>Create Thumbnail Test</Button>
      </form>
    </div>
  );
}
