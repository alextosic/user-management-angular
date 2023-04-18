const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/all', userController.getAllUsers());
router.get('/:id', userController.getUser());
router.patch('/:id', userController.updateUser());
router.delete('/:id', userController.deleteUser());

module.exports = router;
