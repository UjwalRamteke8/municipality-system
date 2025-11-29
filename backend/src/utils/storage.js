import fs from "fs/promises";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const isS3Enabled = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_ACCESS_KEY &&
    process.env.S3_SECRET_KEY &&
    process.env.S3_REGION
);

let s3Client = null;

if (isS3Enabled) {
  s3Client = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT || undefined,
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });
}

export const buildLocalPhotoUrl = (req, fileName) => {
  const base = `${req.protocol}://${req.get("host")}`;
  return `${base}/uploads/photos/${fileName}`;
};

export const maybeUploadToObjectStorage = async (file, folder = "photos") => {
  if (!isS3Enabled || !s3Client || !file) {
    const relativeUrl = ["", "uploads", folder, file.filename].join("/");
    return {
      url: relativeUrl,
      storage: "local",
    };
  }

  const key = `${folder}/${file.filename}`;
  const fileBuffer = await fs.readFile(file.path);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: fileBuffer,
      ContentType: file.mimetype,
      ACL: process.env.S3_ACL || "public-read",
    })
  );

  if (process.env.S3_KEEP_LOCAL_COPY !== "true") {
    await fs.unlink(file.path).catch(() => {});
  }

  const url = process.env.S3_PUBLIC_URL_BASE
    ? `${process.env.S3_PUBLIC_URL_BASE.replace(/\/$/, "")}/${key}`
    : `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;

  return {
    url,
    storage: "s3",
    key,
  };
};
