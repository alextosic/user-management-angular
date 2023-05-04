const express = require('express');

const profileController = require('../controllers/profile');
const authMiddleware = require('../middleware/auth');
const profileValidator = require('../middleware/validators/profile');

const router = express.Router();

router.get(
  '/',
  authMiddleware.authenticate(),
  profileController.getProfile(),
);

router.patch(
  '/',
  authMiddleware.authenticate(),
  profileValidator.validateUpdateProfile(),
  profileController.updateProfile(),
);

router.delete(
  '/',
  authMiddleware.authenticate(),
  profileController.deleteProfile(),
);

router.post(
  '/mfa',
  authMiddleware.authenticate(),
  profileValidator.validateAddMfa(),
  profileController.addMfa(),
);

router.post(
  '/mfa/verify',
  authMiddleware.authenticate(),
  profileValidator.validateVerifyMfa(),
  profileController.verifyMfa(),
);

router.post(
  '/mfa/remove',
  authMiddleware.authenticate(),
  profileValidator.validateRemoveMfa(),
  profileController.removeMfa(),
);

module.exports = router;
