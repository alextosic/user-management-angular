const { body } = require('express-validator');

const BaseValidator = require('./base');

class UserValidator extends BaseValidator {
  validateRole(required) {
    return this
      .isRequired(body('role'), 'Role', required)
      .isAlphanumeric()
      .withMessage('Role ID can only contain letters and numbers.')
      .escape()
      .trim()
      .isLength({ min: 24, max: 24 })
      .withMessage('Role ID needs to be exactly 24 characters long.');
  }

  validateGetUser() {
    return this.validate([this.validateId()]);
  }

  validateGetAllUsers() {
    return this.validate([this.validatePage(), this.validatePerPage()]);
  }

  validateCreateUser() {
    return this.validate([
      this.validateFirstName(true),
      this.validateLastName(true),
      this.validateEmail(true),
      this.validatePassword(true),
      this.validateConfirmPassword(true),
      this.validateRole(),
    ]);
  }

  validateUpdateUser() {
    return this.validate([
      this.validateId(),
      this.validateFirstName(true),
      this.validateLastName(true),
      this.validatePassword(),
      this.validateConfirmPassword(),
      this.validateRole(),
    ]);
  }

  validateDeleteUser() {
    return this.validate([this.validateId()]);
  }
}

module.exports = new UserValidator();
