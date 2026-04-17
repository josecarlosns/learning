import jwt from "jsonwebtoken";
import { getError, isEmptyObject, isEmptyString } from "../utils/jsUtils.js";

async function checkAuth(req, res, next) {
  const authHeader = req.get("Authorization");
  if (isEmptyString(authHeader))
    throw getError({
      message: "Unauthorized",
      statusCode: 401,
    });

  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, "secret");

  if (isEmptyObject(decodedToken))
    throw getError({ message: "Invalid token", statusCode: 401 });

  const { userId } = decodedToken;

  req.userId = userId;
  next();
}

async function checkAuthOptional(req, res, next) {
  const authHeader = req.get("Authorization");
  if (isEmptyString(authHeader)) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, "secret");

  if (isEmptyObject(decodedToken)) {
    req.isAuth = false;
    return next();
  }

  const { userId } = decodedToken;

  req.userId = userId;
  req.isAuth = true;
  return next();
}

export { checkAuth, checkAuthOptional };
