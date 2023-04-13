const express = require('express');

const userRoutes = require('./user');

const router = express.Router();

/* GET home page. */
router.get('/user', userRoutes);

module.exports = router;
