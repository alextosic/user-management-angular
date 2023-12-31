const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

const database = require('./database');
const router = require('./router');
const errorHandler = require('./errorHandler');

dotenv.config();
database.connect();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', router);
app.use(errorHandler());

module.exports = app;
