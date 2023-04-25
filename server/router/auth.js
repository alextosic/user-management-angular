const express = require('express');

const authController = require('../controllers/auth');
const authValidator = require('../middleware/validators/auth');

const router = express.Router();

router.post('/login', authValidator.validateLogin(), authController.login());
router.post('/register', authValidator.validateRegister(), authController.register());
router.post('/forgot-password', authValidator.validateForgotPassword(), authController.forgotPassword());
router.patch('/update-password/:passwordResetToken', authValidator.validateUpdatePassword(), authController.updatePassword());

module.exports = router;
