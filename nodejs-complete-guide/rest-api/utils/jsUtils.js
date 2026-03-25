import path from "path";

const rootDir = process.cwd();

function getPath(...paths) {
  return path.join(rootDir, ...paths);
}

export { getPath };
