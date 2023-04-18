const express = require('express');

const profileController = require('../controllers/profile');

const router = express.Router();

router.get('/', profileController.getProfile());
router.patch('/', profileController.updateProfile());
router.delete('/', profileController.deleteProfile());

module.exports = router;