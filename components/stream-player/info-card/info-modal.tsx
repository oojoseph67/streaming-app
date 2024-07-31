"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { ElementRef, useRef, useState, useTransition } from "react";
import { updateStreamSettings } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { HintComponent } from "@/components/hint";
import { Trash } from "lucide-react";

type InfoModalProps = {
  initialName?: string;
  initialThumbnailUrl?: string;
};

export function InfoModal({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const [name, setName] = useState(initialName);
  const [thumbnail, setThumbnail] = useState(initialThumbnailUrl);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStreamSettings({
        name: name,
        thumbnail: thumbnail,
      })
        .then(() => {
          toast.success("Stream info updated successfully");
          closeRef?.current?.click();
        })
        .catch(() => {
          toast.error("Failed to update stream info");
          closeRef?.current?.click();
        });
    });
  };

  const onRemove = () => {
    startTransition(() => {
      updateStreamSettings({
        thumbnail: null,
      })
        .then(() => {
          toast.success("Thumbnail removed");
          setThumbnail("");
        })
        .catch(() => {
          toast.error("Failed to remove thumbnail");
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>

        <form className="space-y-14" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Stream Name"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnail ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <HintComponent label="Remove thumbnail" asChild side="left">
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      onClick={onRemove}
                      disabled={isPending}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </HintComponent>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#ffffff",
                    },
                    allowedContent: {
                      color: "#ffffff",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnail(res?.[0]?.url);
                    router.refresh();
                    closeRef?.current?.click();
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant={"ghost"}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} variant={"primary"} type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
