import { body } from "express-validator";

export const registerValidation = [
  body("email", "Incorrect email address").isEmail(),
  body("password", "Password should be more then 4 symbols").isLength({
    min: 4,
  }),
  body("fullName", "Enter your name").isLength({ min: 1 }),
  body("avatarUrl", "Incorrect link to avatar").optional().isURL(),
];
