const { body } = require('express-validator');

const BaseValidator = require('./base');

class RoleValidator extends BaseValidator {
  validateName(required) {
    return this
      .isRequired(body('name'), 'Name', required)
      .escape()
      .trim()
      .isAlphanumeric()
      .withMessage('Name can only contain letters and numbers.');
  }

  validatePermissions(required) {
    return this
      .isRequired(body('permissions'), 'Permissions', required)
      .escape()
      .trim()
      .isArray()
      .withMessage('Permissions must be an array.');
  }

  validatePermissionIds() {
    return body('permissions.*')
      .escape()
      .trim()
      .isAlphanumeric()
      .withMessage('Permission IDs can only contain letters and numbers.')
      .isLength({ min: 24, max: 24 })
      .withMessage('Permission IDs need to be exactly 24 characters long.');
  }

  validateGetRole() {
    return this.validate([this.validateId()]);
  }

  validateGetAllRoles() {
    return this.validate([this.validatePage(), this.validatePerPage()]);
  }

  validateCreateRole() {
    return this.validate([
      this.validateName(true),
      this.validatePermissions(true),
      this.validatePermissionIds(),
    ]);
  }

  validateUpdateRole() {
    return this.validate([
      this.validateId(),
      this.validateName(true),
      this.validatePermissions(true),
      this.validatePermissionIds(),
    ]);
  }

  validateDeleteRole() {
    return this.validate([this.validateId()]);
  }
}

module.exports = new RoleValidator();
