import path from "path";

const rootDir = process.cwd();

function getPath(...paths) {
  return path.join(rootDir, ...paths);
}

function isEmptyObject(object) {
  return !object || Object.keys(object) === 0;
}

export { getPath, isEmptyObject };
