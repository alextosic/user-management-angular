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

  async getAll() {
    return this.repository.findAll();
  }

  async create(data) {
    const { email, firstName, lastName, password } = data;
    const user = await this.getByEmail(email);

    if (user) {
      throw new ErrorResponse('service', 409, 'User with that email address already exists.');
    }

    return this.repository.create({ email, firstName, lastName, password, role: 1 });
  }

  async update(id, data) {
    await this.getById(id);

    const { firstName, lastName, email } = data;
    return this.repository.updateById(id, { firstName, lastName, email });
  }

  async resetPassword(email) {
    const user = await this.getByEmail(email);
    return this.repository.updateById(user._id, { passwordReset: true });
  }

  async updatePassword(id, password) {
    const user = await this.getById(id);

    if (!user.passwordReset) {
      throw new ErrorResponse('service', 400, 'You haven\'t requested a password reset.');
    }

    return this.repository.updateById(id, { password });
  }

  async delete(id) {
    await this.getById(id);
    return this.repository.deleteById(id);
  }
}

module.exports = new UserService(userRepository);
