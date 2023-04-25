const uuid = require('uuid');

const userRepository = require('../database/repositories/user');
const ErrorResponse = require('../responses/error');

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async getById(id) {
    return this.repository.findById(id);
  }

  async getByEmail(email) {
    return this.repository.findByEmail(email);
  }

  async get(query) {
    return this.repository.findOne(query);
  }

  async getAllNotAdmin(adminRoleId, pagination) {
    const users = await this.repository.findAllNotAdmin(adminRoleId, pagination);
    const total = await this.repository.countAllNotAdmin(adminRoleId);

    return {
      users,
      total,
    };
  }

  async create(data) {
    const { email, firstName, lastName, password, role } = data;
    const user = await this.getByEmail(email);

    if (user) {
      throw new ErrorResponse('service', 409, 'User with that email address already exists.');
    }

    return this.repository.create({ email, firstName, lastName, password, role });
  }

  async update(id, data, updatePassword) {
    const user = await this.getById(id);

    if (!user) {
      throw new ErrorResponse('service', 400, 'User with that ID doesn\'t exist.');
    }

    const { firstName, lastName, password } = data;
    await this.repository.updateById(id, {
      firstName,
      lastName,
      ...(updatePassword && !!password && { password }),
    });

    return this.getById(id);
  }

  async forgotPassword(email) {
    const user = await this.getByEmail(email);

    if (!user) {
      throw new ErrorResponse('service', 400, 'User with that email doesn\'t exist.');
    }

    if (user.passwordResetToken) {
      throw new ErrorResponse('service', 400, 'You have a pending password reset.');
    }

    await this.repository.updateById(user._id, { passwordResetToken: uuid.v4() });
    return this.getById(user._id);
  }

  async updatePassword(id, password) {
    return this.repository.updateById(id, { password, passwordResetToken: null });
  }

  async delete(id) {
    const user = await this.getById(id);

    if (!user) {
      throw new ErrorResponse('service', 400, 'User with that ID doesn\'t exist.');
    }

    return this.repository.deleteById(id);
  }
}

module.exports = new UserService(userRepository);
