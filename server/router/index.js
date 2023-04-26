const express = require('express');

const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const userRoutes = require('./user');
const roleRoutes = require('./role');
const permissionRoutes = require('./permission');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/user', userRoutes);
router.use('/role', roleRoutes);
router.use('/permission', permissionRoutes);

module.exports = router;
