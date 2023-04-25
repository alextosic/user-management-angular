const express = require('express');

const roleController = require('../controllers/role');
const authMiddleware = require('../middleware/auth');
const roleValidator = require('../middleware/validators/role');

const { defaultPermissions } = require('../constants/permission');

const router = express.Router();

router.get(
  '/all',
  authMiddleware.authenticate(),
  authMiddleware.authorize([defaultPermissions.listRoles]),
  roleValidator.validateGetAllRoles(),
  roleController.getAllRoles(),
);

router.get(
  '/:id',
  authMiddleware.authenticate(),
  authMiddleware.authorize([defaultPermissions.viewRoles]),
  roleValidator.validateGetRole(),
  roleController.getRole(),
);

router.post(
  '/',
  authMiddleware.authenticate(),
  authMiddleware.authorize([defaultPermissions.createRoles]),
  roleValidator.validateCreateRole(),
  roleController.createRole(),
);

router.patch(
  '/:id',
  authMiddleware.authenticate(),
  authMiddleware.authorize([defaultPermissions.updateRoles]),
  roleValidator.validateUpdateRole(),
  roleController.updateRole(),
);

router.delete(
  '/:id',
  authMiddleware.authenticate(),
  authMiddleware.authorize([defaultPermissions.deleteRoles]),
  roleValidator.validateDeleteRole(),
  roleController.deleteRole(),
);

module.exports = router;
