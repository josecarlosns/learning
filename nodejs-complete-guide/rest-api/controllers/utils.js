import { validationResult } from "express-validator";
import fs from "fs";
import { getPath, isEmptyObject, isNullOrUndefined } from "../utils/jsUtils.js";

function checkValidationErrors({ req, path, payload }) {
  const errors = validationResult(req);

  const hasErrors = errors && !errors.isEmpty();
  if (hasErrors) {
    const validationError = new Error(`Validation error on ${path}`);
    validationError.fields = errors.array().map((err) => err.msg);
    validationError.statusCode = 422;
    if (!isEmptyObject(payload)) validationError.payload = payload;

    throw validationError;
  }
}

async function deleteImage(filePath) {
  const file = getPath(filePath);
  await fs.unlink(file, (err) => {
    // TODO remove these logs
    if (!isNullOrUndefined(err)) console.log(err);
    console.log(`File ${filePath} deleted`);
  });
}

export { checkValidationErrors, deleteImage };
