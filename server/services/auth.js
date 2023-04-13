const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ErrorResponse = require('../responses/error');

class AuthService {
  async hashPassword(password) {
    try {
      return bcrypt.hash(password, process.env.PASSWORD_HASH_ROUNDS);
    } catch (err) {
      throw new ErrorResponse('service', 500, 'Error generating password.', err.message);
    }
  }

  async verifyPassword(passwordToVerify, userPassword) {
    try {
      return bcrypt.compare(passwordToVerify, userPassword);
    } catch (err) {
      throw new ErrorResponse('service', 500, 'Error verifying password.', err.message);
    }
  }

  createToken(userId) {
    const secretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ id: userId }, secretKey, { expiresIn: '24h' });
  }
}

module.exports = new AuthService();
