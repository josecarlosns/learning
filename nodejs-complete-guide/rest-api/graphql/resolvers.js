import { hash } from "bcryptjs";

import { UserModel } from "../models/user.js";
import { getError, isEmptyObject } from "../utils/jsUtils.js";

const graphqlResolver = {
  createUser: async (args, req) => {
    const { email, name, password } = args.userInput;

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
