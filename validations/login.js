import { body } from "express-validator";

export const loginValidation = [
  body("email", "Incorrect email address").isEmail(),
  body("password", "Password should be more then 4 symbols").isLength({
    min: 4,
  }),
];
