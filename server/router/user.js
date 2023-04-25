const express = require('express');

const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');
const userValidator = require('../middleware/validators/user');

const { defaultRoles } = require('../constants/role');

const router = express.Router();

router.get('/all', authMiddleware.authenticate(), authMiddleware.authorize([defaultRoles.ADMIN]), userValidator.validateGetAllUsers(), userController.getAllUsers());
router.get('/:id', authMiddleware.authenticate(), authMiddleware.authorize([defaultRoles.ADMIN]), userValidator.validateGetUser(), userController.getUser());
router.post('/', authMiddleware.authenticate(), authMiddleware.authorize([defaultRoles.ADMIN]), userValidator.validateCreateUser(), userController.createUser());
router.patch('/:id', authMiddleware.authenticate(), authMiddleware.authorize([defaultRoles.ADMIN]), userValidator.validateUpdateUser(), userController.updateUser());
router.delete('/:id', authMiddleware.authenticate(), authMiddleware.authorize([defaultRoles.ADMIN]), userValidator.validateDeleteUser(), userController.deleteUser());

module.exports = router;
