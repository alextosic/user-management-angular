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
    await this.getById(id);

    const { firstName, lastName, password } = data;
    await this.repository.updateById(id, {
      firstName,
      lastName,
      ...(updatePassword && !!password && { password }),
    });

    return this.getById(id);
  }

  async resetPassword(email) {
    const user = await this.getByEmail(email);
    return this.repository.updateById(user._id, { passwordReset: true });
  }

  async updatePassword(email, password) {
    const user = await this.getByEmail(email);

    if (!user.passwordReset) {
      throw new ErrorResponse('service', 400, 'You haven\'t requested a password reset.');
    }

    return this.repository.updateById(user._id, { password });
  }

  async delete(id) {
    await this.getById(id);
    return this.repository.deleteById(id);
  }
}

module.exports = new UserService(userRepository);
