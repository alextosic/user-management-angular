const BaseValidator = require('./base');

class UserValidator extends BaseValidator {
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
    ]);
  }

  validateUpdateUser() {
    return this.validate([
      this.validateId(),
      this.validateFirstName(true),
      this.validateLastName(true),
      this.validatePassword(),
      this.validateConfirmPassword(),
    ]);
  }

  validateDeleteUser() {
    return this.validate([this.validateId(true)]);
  }
}

module.exports = new UserValidator();
