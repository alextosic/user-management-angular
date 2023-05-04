const { body, query } = require('express-validator');

const BaseValidator = require('./base');

class ProfileValidator extends BaseValidator {
  validateUpdateProfile() {
    return this.validate([
      this.validateFirstName(),
      this.validateLastName(),
    ]);
  }

  validateAddMfa() {
    return this.validate([this.validateMfaType(true)]);
  }

  validateVerifyMfa() {
    return this.validate([this.validateMfaVerificationCode(true)]);
  }

  validateRemoveMfa() {
    return this.validate([this.validateMfaVerificationCode(true)]);
  }
}

module.exports = new ProfileValidator();
