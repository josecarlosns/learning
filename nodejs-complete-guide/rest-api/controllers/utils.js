import { validationResult } from "express-validator";

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

export { checkValidationErrors };
