import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

// One-time import of the original imagegen renders. Originals are kept intact.
const sourceDirectory = process.argv[2];
if (!sourceDirectory)
  throw new Error("Usage: node scripts/prepare-images.mjs <generated-image-directory>");
const images = {
  "park-line": "exec-1d18c8db-3b75-4b59-b5b0-5c39a2ac2dfb.png",
  "river-quarter": "exec-f927852b-10dd-4c5d-8f51-e9f29db82d93.png",
  height: "exec-186e7250-f8db-41ec-a819-04caafaeafa9.png",
  "city-gardens": "exec-253c68a1-6bdb-41bc-8749-e8831df3117c.png",
  courtyard: "exec-91ba0fd9-5da3-443d-99ba-eec969c079bd.png",
};
await mkdir("public/images", { recursive: true });
for (const [name, file] of Object.entries(images)) {
  const result = await sharp(join(sourceDirectory, file))
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 86, effort: 6 })
    .toFile(`public/images/${name}.webp`);
  console.log(`${name}: ${result.width} × ${result.height}, ${Math.round(result.size / 1024)} KB`);
}
