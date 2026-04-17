import { hash } from "bcryptjs";
import validator from "validator";

import { UserModel } from "../models/user.js";
import { getError, isEmptyObject } from "../utils/jsUtils.js";

const graphqlResolver = {
  createUser: async (args, req) => {
    const { email, name, password } = args.userInput;
    const errors = [];

    if (!validator.isEmail(email)) errors.push("Invalid Email");

    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, {
        min: 5,
      })
    )
      errors.push("Invalid password");

    if (errors.length > 0)
      throw getError({
        message: "Invalid Input",
        payload: {
          errors,
        },
      });

    const user = await UserModel.findOne({
      email,
    });

    if (!isEmptyObject)
      throw getError({
        message: "User already exists",
      });

    const hashPwd = await hash(password, 12);

    const newUser = new UserModel({ email, name, password: hashPwd });

    const createdUser = (await newUser.save()).toJSON();

    return {
      ...createdUser,
      _id: createdUser._id.toString(),
      password: undefined,
    };
  },
};

export { graphqlResolver };
