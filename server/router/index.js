const express = require('express');

const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const userRoutes = require('./user');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/user', userRoutes);

module.exports = router;
