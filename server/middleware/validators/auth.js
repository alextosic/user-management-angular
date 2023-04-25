const BaseValidator = require('./base');

class AuthValidator extends BaseValidator {
  validateLogin() {
    return this.validate([this.validateEmail(true)]);
  }

  validateRegister() {
    return this.validate([
      this.validateFirstName(true),
      this.validateLastName(true),
      this.validateEmail(true),
      this.validatePassword(true),
      this.validateConfirmPassword(true),
    ]);
  }

  validateForgotPassword() {
    return this.validate([this.validateEmail(true)]);
  }

  validateUpdatePassword() {
    return this.validate([
      this.validatePasswordResetToken(true),
      this.validatePassword(true),
      this.validateConfirmPassword(true),
    ]);
  }
}

module.exports = new AuthValidator();
