const BaseValidator = require('./base');

class UserValidator extends BaseValidator {
  validateGetUser() {
    return this.validate([this.validateId()]);
  }

  validateCreateUser() {
    return this.validate([
      this.validateFirstName(true),
      this.validateLastName(true),
      this.validateEmail(true),
      this.validatePassword(true),
      this.validateConfirmPassword(true),
    ]);
  }

  validateUpdateUser() {
    return this.validate([
      this.validateId(),
      this.validateFirstName(),
      this.validateLastName(),
      this.validatePassword(),
      this.validateConfirmPassword(),
    ]);
  }

  validateDeleteUser() {
    return this.validate([this.validateId()]);
  }
}

module.exports = new UserValidator();
