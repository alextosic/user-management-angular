const express = require('express');

const permissionController = require('../controllers/permission');
const authMiddleware = require('../middleware/auth');

const { defaultPermissions } = require('../constants/permission');

const router = express.Router();

router.get(
  '/all',
  authMiddleware.authenticate(),
  authMiddleware.authorize([defaultPermissions.createRoles, defaultPermissions.updateRoles]),
  permissionController.getAllPermissions(),
);

module.exports = router;
