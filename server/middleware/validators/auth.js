const { body } = require('express-validator');

const BaseValidator = require('./base');

class AuthValidator extends BaseValidator {
  validatePasswordResetToken(required) {
    return this
      .isRequired(body('passwordResetToken'), 'Password reset token', required)
      .escape()
      .trim()
      .isUUID()
      .withMessage('Password reset token should be of UUID type.');
  }

  validateLogin() {
    return this.validate([
      this.validateEmail(true),
      this.validatePassword(true),
    ]);
  }

  validateVerifyLogin() {
    return this.validate([
      this.validateEmail(true),
      this.validatePassword(true),
      this.validateMfaVerificationCode(true),
      this.validateMfaType(true),
    ]);
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
