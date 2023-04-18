const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login', authController.login());
router.post('/register', authController.register());
router.post('/forgot-password', authController.forgotPassword());
router.patch('/update-password', authController.updatePassword());

module.exports = router;
