import { objectStorageClient } from "./objectStorage";

function getPrivateDir(): string {
  const dir = process.env.PRIVATE_OBJECT_DIR || "";
  if (!dir) {
    throw new Error("PRIVATE_OBJECT_DIR not set. Provision object storage first.");
  }
  return dir.replace(/\/$/, "");
}

function parseObjectPath(fullPath: string): { bucketName: string; objectName: string } {
  let p = fullPath;
  if (!p.startsWith("/")) p = `/${p}`;
  const parts = p.split("/");
  if (parts.length < 3) {
    throw new Error("Invalid object path: missing bucket name");
  }
  return { bucketName: parts[1], objectName: parts.slice(2).join("/") };
}

function variantPath(objectKey: string, variant: string): string {
  return `${getPrivateDir()}/gallery/${objectKey}/${variant}`;
}

export async function saveGalleryVariant(
  objectKey: string,
  variant: string,
  buffer: Buffer,
  contentType: string,
): Promise<void> {
  const { bucketName, objectName } = parseObjectPath(variantPath(objectKey, variant));
  const file = objectStorageClient.bucket(bucketName).file(objectName);
  await file.save(buffer, {
    contentType,
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });
}

export async function getGalleryVariantStream(objectKey: string, variant: string) {
  const { bucketName, objectName } = parseObjectPath(variantPath(objectKey, variant));
  const file = objectStorageClient.bucket(bucketName).file(objectName);
  const [exists] = await file.exists();
  if (!exists) return null;
  const [metadata] = await file.getMetadata();
  return { stream: file.createReadStream(), metadata };
}

export async function deleteGalleryObject(objectKey: string): Promise<void> {
  const { bucketName, objectName } = parseObjectPath(`${getPrivateDir()}/gallery/${objectKey}/`);
  await objectStorageClient
    .bucket(bucketName)
    .deleteFiles({ prefix: objectName })
    .catch(() => {
      /* best-effort cleanup */
    });
}
