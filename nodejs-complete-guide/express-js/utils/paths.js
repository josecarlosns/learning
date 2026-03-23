const rootDir = process.cwd();

import path from "path";

function getPath(...paths) {
  return path.join(rootDir, ...paths);
}

export { getPath };
