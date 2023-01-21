import validator from "express-validator";
const { check, validationResult } = validator;

const reporter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({
      errors: errorMessages,
    });
  }
  next();
};

export const validateGaurd = [
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
