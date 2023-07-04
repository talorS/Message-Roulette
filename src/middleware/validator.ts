import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

const reporter = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({
      errors: errorMessages,
    });
  }
  next();
};

export const validateGuard = [
  check("x")
    .exists()
    .withMessage("wild endPoint requires X in query params!")
    .bail()
    .notEmpty()
    .withMessage("X param should not be empty!")
    .bail()
    .isInt({ min: 1 })
    .withMessage("X param should be a positive number!")
    .bail(),
  reporter,
];

export const validateUser = [
  check("userName")
    .exists()
    .withMessage("generateToken endPoint requires userName in body params!")
    .bail()
    .notEmpty()
    .withMessage("userName param should not be empty!")
    .bail(),
  reporter,
];
