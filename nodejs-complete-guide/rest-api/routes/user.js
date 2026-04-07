import { Router } from "express";
import { body } from "express-validator";

import { login, signup } from "../controllers/user.js";
import { UserModel } from "../models/user.js";
import { isEmptyObject } from "../utils/jsUtils.js";

const userRoutes = Router();

userRoutes.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return UserModel.findOne({ email: value }).then((user) => {
          if (!isEmptyObject(user))
            return Promise.reject("Email already in use");
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().isLength({ min: 5 }),
  ],
  signup
);

userRoutes.post("/login", login);

export { userRoutes };
