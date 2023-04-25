const express = require('express');

const roleController = require('../controllers/role');
const authMiddleware = require('../middleware/auth');
const roleValidator = require('../middleware/validators/role');

const { defaultRoles } = require('../constants/role');

const router = express.Router();

router.get('/all', authMiddleware.authenticate(), authMiddleware.authorize([defaultRoles.ADMIN]), roleValidator.validateGetAllRoles(), roleController.getAllRoles());
router.get('/:id', authMiddleware.authenticate(), authMiddleware.authorize([defaultRoles.ADMIN]), roleValidator.validateGetRole(), roleController.getRole());
router.post('/', authMiddleware.authenticate(), authMiddleware.authorize([defaultRoles.ADMIN]), roleValidator.validateCreateRole(), roleController.createRole());
router.patch('/:id', authMiddleware.authenticate(), authMiddleware.authorize([defaultRoles.ADMIN]), roleValidator.validateUpdateRole(), roleController.updateRole());
router.delete('/:id', authMiddleware.authenticate(), authMiddleware.authorize([defaultRoles.ADMIN]), roleValidator.validateDeleteRole(), roleController.deleteRole());

module.exports = router;
