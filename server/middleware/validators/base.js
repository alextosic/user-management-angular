const { body, param, validationResult } = require('express-validator');

const ErrorResponse = require('../../responses/error');
const { strongPasswordValues } = require('../../constants/validation');

class BaseValidator {
  isRequired(validationChain, required) {
    return required ? validationChain.exists() : validationChain.optional();
  }

  validateId() {
    return param('id').exists().escape().trim().isUUID();
  }

  validateFirstName(required) {
    return this.isRequired(body('firstName').escape().trim().isAlpha(), required);
  }

  validateLastName(required) {
    return this.isRequired(body('lastName').escape().trim().isAlpha(), required);
  }

  validateEmail(required) {
    return this.isRequired(body('email').escape().trim().isEmail(), required);
  }

  validatePassword(required) {
    return this.isRequired(body('password').escape().trim().isStrongPassword(strongPasswordValues), required);
  }

  validateConfirmPassword(required) {
    return this.isRequired(body('confirmPassword').escape().trim().custom((value, { req }) => value === req.body.password), required);
  }

  validate(validations) {
    return async (req, res, next) => {
      await Promise.all(validations.map(async (validation) => {
        await validation.run(req);
      }));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      const firstError = errors.array()[0];
      const field = `${firstError.path.charAt(0).toUpperCase()}${firstError.path.slice(1)}`;

      console.log(firstError);
      return next(new ErrorResponse('validation', 400, `${field} is missing or has invalid value`));
    };
  }
}

module.exports = BaseValidator;
