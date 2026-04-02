import path from "path";

const rootDir = process.cwd();

function getPath(...paths) {
  return path.join(rootDir, ...paths);
}

function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

function isEmptyObject(object) {
  return isNullOrUndefined(object) || Object.keys(object) === 0;
}

function isEmptyString(string) {
  return (
    !isNullOrUndefined(string) && typeof string === "string" && string === ""
  );
}

export { getPath, isEmptyObject, isEmptyString, isNullOrUndefined };
