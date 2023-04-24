const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ErrorResponse = require('../responses/error');

class AuthService {
  async hashPassword(password) {
    try {
      return bcrypt.hash(password, parseInt(process.env.PASSWORD_HASH_ROUNDS, 10));
    } catch (err) {
      throw new ErrorResponse('service', 500, 'Error generating password.');
    }
  }

  async verifyPassword(passwordToVerify, userPassword) {
    try {
      return bcrypt.compare(passwordToVerify, userPassword);
    } catch (err) {
      throw new ErrorResponse('service', 500, 'Incorrect password.');
    }
  }

  createToken(userId) {
    const secretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ id: userId }, secretKey, { expiresIn: '24h' });
  }

  verifyToken(token) {
    try {
      const secretKey = process.env.JWT_SECRET_KEY;
      return jwt.verify(token, secretKey);
    } catch (err) {
      throw new ErrorResponse('service', 401, 'User not logged in.');
    }
  }
}

module.exports = new AuthService();
