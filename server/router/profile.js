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

module.exports = router;
