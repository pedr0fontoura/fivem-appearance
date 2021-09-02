const { promises: fs } = require("fs");
const path = require("path");

const RELEASE_PATH = path.resolve(__dirname, "release");
const RESOURCE_PATH = path.resolve(RELEASE_PATH, "fivem-appearance");

const FILES = ["fxmanifest.lua", "peds.json", "README.md", "LICENSE"];

const TYPESCRIPT_BUILD_SRC = path.resolve(__dirname, "game", "build");
const UI_BUILD_SRC = path.resolve(__dirname, "web", "build");
const LOCALES_SRC = path.resolve(__dirname, "locales");

const TYPESCRIPT_BUILD_DEST = path.resolve(RESOURCE_PATH, "game", "build");
const UI_BUILD_DEST = path.resolve(RESOURCE_PATH, "web", "build");
const LOCALES_DEST = path.resolve(RESOURCE_PATH, "locales");

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });

  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    entry.isDirectory()
      ? await copyDir(srcPath, destPath)
      : await fs.copyFile(srcPath, destPath);
  }
}

async function execute() {
  try {
    await fs.access(RELEASE_PATH);

    console.log("[fivem-appearance] Release folder exists");
    console.log("[fivem-appearance] Removing release folder...");

    await fs.rmdir(RELEASE_PATH, { recursive: true });
  } catch (err) {
    console.log(`[fivem-appearance] Release folder don't exist`);
  }

  console.log("[fivem-appearance] Creating release folder...");
  await fs.mkdir(RESOURCE_PATH, { recursive: true });

  console.log("[fivem-appearance] Copying files...");
  await copyDir(TYPESCRIPT_BUILD_SRC, TYPESCRIPT_BUILD_DEST);
  await copyDir(UI_BUILD_SRC, UI_BUILD_DEST);
  await copyDir(LOCALES_SRC, LOCALES_DEST);

  for (const file of FILES) {
    try {
      await fs.copyFile(
        path.join(__dirname, file),
        path.join(RESOURCE_PATH, file)
      );
    } catch (err) {
      console.log(err);
    }
  }

  console.log("[fivem-appearance] Release created!");
}

execute();
