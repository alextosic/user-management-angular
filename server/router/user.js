const express = require('express');

const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');
const userValidator = require('../middleware/validators/user');

const { defaultPermissions } = require('../constants/permission');

const router = express.Router();

router.get(
  '/all',
  authMiddleware.authenticate(),
  authMiddleware.authorize([defaultPermissions.listUsers]),
  userValidator.validateGetAllUsers(),
  userController.getAllUsers(),
);

router.get(
  '/:id',
  authMiddleware.authenticate(),
  authMiddleware.authorize([defaultPermissions.viewUsers]),
  userValidator.validateGetUser(),
  userController.getUser(),
);

router.post(
  '/',
  authMiddleware.authenticate(),
  authMiddleware.authorize([defaultPermissions.createUsers]),
  userValidator.validateCreateUser(),
  userController.createUser(),
);

router.patch(
  '/:id',
  authMiddleware.authenticate(),
  authMiddleware.authorize([defaultPermissions.updateUsers]),
  userValidator.validateUpdateUser(),
  userController.updateUser(),
);

router.delete(
  '/:id',
  authMiddleware.authenticate(),
  authMiddleware.authorize([defaultPermissions.deleteUsers]),
  userValidator.validateDeleteUser(),
  userController.deleteUser(),
);

module.exports = router;
