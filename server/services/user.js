const bcrypt = require('bcrypt');

const userRepository = require('../database/repositories/user');
const ErrorResponse = require('../responses/error');

class UserService {
  async getById(id) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new ErrorResponse('service', 404, 'User not found.');
    }

    return user;
  }

  async getByEmail(email) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new ErrorResponse('service', 404, 'User not found.');
    }

    return user;
  }

  async getAll() {
    return userRepository.findAll();
  }

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

  async create(data) {
    const {password} = data;
    const hashedPassword = await this.hashPassword(password);

    return userRepository.create({ ...data, password: hashedPassword });
  }

  async update(id, data) {
    await this.getById(id);

    const {firstName, lastName, email} = data;
    return userRepository.updateById(id, {firstName, lastName, email});
  }

  async updatePassword(id, password) {
    const hashedPassword = await this.hashPassword(password);
    return userRepository.updateById(id, { password: hashedPassword });
  }

  async resetPassword(id) {
    return userRepository.updateById(id, { resetPassword: true });
  }

  async delete(id) {
    await this.getById(id);
    return userRepository.deleteById(id);
  }
}

module.exports = new UserService();
