import { validationResult } from "express-validator";
import fs from "fs";
import { getPath, isNullOrUndefined } from "../utils/jsUtils.js";

function checkValidationErrors(req) {
  const errors = validationResult(req);

  const hasErrors = errors && !errors.isEmpty();
  if (hasErrors) {
    const validationError = new Error("Validation error on createPost", {
      cause: errors,
    });
    validationError.statusCode = 422;

    throw validationError;
  }
}

async function deleteImage(filePath) {
  const file = getPath(filePath);
  await fs.unlink(file, (err) => {
    if (!isNullOrUndefined(err)) console.log(err);
    console.log(`File ${filePath} deleted`);
  });
}

export { checkValidationErrors, deleteImage };
