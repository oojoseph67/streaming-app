import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getSelf } from "../../../lib/auth-service";
import { db } from "../../../lib/db";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const self = await getSelf();

      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      if (!metadata.user) return;

      await db.stream.update({
        where: { userId: metadata.user.id },
        data: {
          thumbnail: file.url,
        },
      });

      return { fileUrl: file.url};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
