const BaseValidator = require('./base');

class ProfileValidator extends BaseValidator {
  validateUpdateProfile() {
    return this.validate([
      this.validateFirstName(),
      this.validateLastName(),
    ]);
  }
}

module.exports = new ProfileValidator();
