import path from "path";

const rootDir = process.cwd();

function getPath(...paths) {
  return path.join(rootDir, ...paths);
}

function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

function isEmptyObject(object) {
  return isNullOrUndefined(object) || Object.keys(object).length === 0;
}

function isEmptyString(string) {
  return (
    isNullOrUndefined(string) || (typeof string === "string" && string === "")
  );
}

function getError({ message, statusCode, payload, cause }) {
  const error = new Error(message, cause);
  error.statusCode = statusCode;
  error.payload = payload;

  return error;
}

export { getError, getPath, isEmptyObject, isEmptyString, isNullOrUndefined };
