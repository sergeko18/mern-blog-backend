import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Enter title").isLength({ min: 3 }).isString(),
  body("text", "Enter post's text").isLength({ min: 10 }).isString(),
  body("tags", "Incorrect tag format (enter an array)").optional().isString(),
  body("imageUrl", "Incorrect link to image").optional().isString(),
];
