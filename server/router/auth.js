const express = require('express');

const authController = require('../controllers/auth');
const authValidator = require('../middleware/validators/auth');

const router = express.Router();

router.post(
  '/login',
  authValidator.validateLogin(),
  authController.login(),
);

router.post(
  '/verify',
  authValidator.validateVerifyLogin(),
  authController.verifyLogin(),
);

router.post(
  '/register',
  authValidator.validateRegister(),
  authController.register(),
);

router.post(
  '/forgot-password',
  authValidator.validateForgotPassword(),
  authController.forgotPassword(),
);

router.patch(
  '/update-password',
  authValidator.validateUpdatePassword(),
  authController.updatePassword(),
);

module.exports = router;
