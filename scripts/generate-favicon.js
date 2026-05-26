const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SOURCE = path.resolve("app/icon.png");
const APP_DIR = path.resolve("app");

const SIZES = [16, 32, 48, 64, 128, 180, 256];

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("ERROR: app/icon.png not found — no logo source available.");
    process.exit(1);
  }

  const metadata = await sharp(SOURCE).metadata();
  console.log(`Source image: ${metadata.width}x${metadata.height}, ${metadata.format}`);

  // 1. Generate PNG buffers for each size
  const pngBuffers = {};
  for (const size of SIZES) {
    pngBuffers[size] = await sharp(SOURCE)
      .resize(size, size, { fit: "cover", position: "centre" })
      .ensureAlpha()
      .toColourspace("srgb")
      .png()
      .toBuffer();
    console.log(`  Generated ${size}x${size} PNG (${pngBuffers[size].length} bytes)`);
  }

  // 2. Create proper favicon.ico (embed PNGs in ICO container)
  const icoSizes = [16, 32, 48, 64, 128, 256];
  const icoImages = icoSizes.map((s) => pngBuffers[s]);

  const headerSize = 6;
  const entrySize = 16;
  const header = Buffer.alloc(headerSize, 0);
  header.writeUInt16LE(0, 0);    // reserved
  header.writeUInt16LE(1, 2);    // type: 1 = ICO
  header.writeUInt16LE(icoImages.length, 4); // count

  let offset = headerSize + icoImages.length * entrySize;
  const entries = [];
  const imageData = [];

  for (let i = 0; i < icoImages.length; i++) {
    const buf = icoImages[i];
    const w = icoSizes[i] >= 256 ? 0 : icoSizes[i];
    const h = icoSizes[i] >= 256 ? 0 : icoSizes[i];
    const entry = Buffer.alloc(entrySize, 0);
    entry.writeUInt8(w, 0);       // width
    entry.writeUInt8(h, 1);       // height
    entry.writeUInt8(0, 2);       // color count
    entry.writeUInt8(0, 3);       // reserved
    entry.writeUInt16LE(1, 4);    // planes
    entry.writeUInt16LE(32, 6);   // bit count
    entry.writeUInt32LE(buf.length, 8);  // size
    entry.writeUInt32LE(offset, 12);     // offset
    entries.push(entry);
    imageData.push(buf);
    offset += buf.length;
  }

  const icoPath = path.join(APP_DIR, "favicon.ico");
  fs.writeFileSync(icoPath, Buffer.concat([header, ...entries, ...imageData]));
  console.log(`\n✓ Created favicon.ico (${icoSizes.join(", ")} px) — ${fs.statSync(icoPath).size} bytes`);

  // 3. Create apple-icon.png (180x180)
  const applePath = path.join(APP_DIR, "apple-icon.png");
  await sharp(SOURCE)
    .resize(180, 180, { fit: "cover", position: "centre" })
    .png()
    .toFile(applePath);
  console.log(`✓ Created apple-icon.png (180x180) — ${fs.statSync(applePath).size} bytes`);

  // 4. Remove duplicate app/icon/octops-logo.png.jpg
  const dupPath = path.join(APP_DIR, "icon", "octops-logo.png.jpg");
  if (fs.existsSync(dupPath)) {
    fs.unlinkSync(dupPath);
    console.log(`✓ Removed duplicate: app/icon/octops-logo.png.jpg`);
  }

  // 5. Remove empty icon directory if nothing else there
  const iconDir = path.join(APP_DIR, "icon");
  if (fs.existsSync(iconDir)) {
    const remaining = fs.readdirSync(iconDir);
    if (remaining.length === 0) {
      fs.rmdirSync(iconDir);
      console.log(`✓ Removed empty app/icon/ directory`);
    } else {
      console.log(`  Note: app/icon/ still has files: ${remaining.join(", ")}`);
    }
  }

  console.log("\nDone. All favicon files generated successfully.");
}

main().catch((err) => {
  console.error("Favicon generation failed:", err);
  process.exit(1);
});
