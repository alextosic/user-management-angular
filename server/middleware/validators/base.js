const { body, param, query, validationResult } = require('express-validator');

const ErrorResponse = require('../../responses/error');
const { strongPasswordValues } = require('../../constants/validation');

class BaseValidator {
  isRequired(validationChain, fieldName, required) {
    return required
      ? validationChain.exists().withMessage(`${fieldName} is required.`)
      : validationChain.optional();
  }

  validateId() {
    return param('id')
      .exists()
      .withMessage('ID is required.')
      .isAlphanumeric()
      .withMessage('ID can only contain letters and numbers')
      .escape()
      .trim()
      .isLength({ min: 24, max: 24 })
      .withMessage('ID needs to be exactly 24 characters long.');
  }

  validateFirstName(required) {
    return this.isRequired(
      body('firstName')
        .escape()
        .trim()
        .isAlpha()
        .withMessage('First name can only contain letters of the alphabet.'),
      'First name',
      required,
    );
  }

  validateLastName(required) {
    return this.isRequired(
      body('lastName')
        .escape()
        .trim()
        .isAlpha()
        .withMessage('Last name can only contain letters of the alphabet.'),
      'Last name',
      required,
    );
  }

  validateEmail(required) {
    return this.isRequired(
      body('email')
        .escape()
        .trim()
        .isEmail()
        .withMessage('Email is not in a valid format.'),
      'Email',
      required,
    );
  }

  validatePassword(required) {
    const strongPasswordError = 'Password should have a minimum of '
      + `${strongPasswordValues.minLength} characters, `
      + `${strongPasswordValues.minUppercase} uppercase letter(s), `
      + `${strongPasswordValues.minLowercase} lowercase letter(s), `
      + `and ${strongPasswordValues.minNumbers} number(s).`;

    return this.isRequired(
      body('password')
        .escape()
        .trim()
        .isStrongPassword(strongPasswordValues)
        .withMessage(strongPasswordError),
      'Password',
      required,
    );
  }

  validateConfirmPassword(required) {
    return this.isRequired(
      body('confirmPassword')
        .escape()
        .trim()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Confirm password should match the password.'),
      'Confirm password',
      required,
    );
  }

  validatePage(required) {
    return this.isRequired(
      query('page')
        .escape()
        .trim()
        .isNumeric()
        .withMessage('Page query should be a number.'),
      'Page query',
      required,
    );
  }

  validatePerPage(required) {
    return this.isRequired(
      query('perPage')
        .escape()
        .trim()
        .isNumeric()
        .withMessage('Per page query should be a number.'),
      'Per page query',
      required,
    );
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
      return next(new ErrorResponse('validation', 400, firstError.msg));
    };
  }
}

module.exports = BaseValidator;
