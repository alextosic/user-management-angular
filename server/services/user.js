const uuid = require('uuid');

const userRepository = require('../database/repositories/user');
const roleRepository = require('../database/repositories/role');
const ErrorResponse = require('../responses/error');

const { defaultRoles } = require('../constants/role');

class UserService {
  constructor(userRepositoryParam, roleRepositoryParam) {
    this.userRepository = userRepositoryParam;
    this.roleRepository = roleRepositoryParam;
  }

  async getById(id) {
    return this.userRepository.findById(id);
  }

  async getByEmail(email) {
    return this.userRepository.findByEmail(email);
  }

  async get(query) {
    return this.userRepository.findOne(query);
  }

  async getAll(pagination) {
    const adminRole = await this.roleRepository.findByName(defaultRoles.ADMIN);
    const users = await this.userRepository.findAll(adminRole._id, pagination);
    const total = await this.userRepository.countAll(adminRole._id);

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

    return this.userRepository.create({ email, firstName, lastName, password, role });
  }

  async update(id, data, updatePassword) {
    const user = await this.getById(id);

    if (!user) {
      throw new ErrorResponse('service', 400, 'User with that ID doesn\'t exist.');
    }

    const { firstName, lastName, password } = data;
    await this.userRepository.updateById(id, {
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

    await this.userRepository.updateById(user._id, { passwordResetToken: uuid.v4() });
    return this.getById(user._id);
  }

  async updatePassword(id, password) {
    return this.userRepository.updateById(id, { password, passwordResetToken: null });
  }

  async delete(id) {
    const user = await this.getById(id);

    if (!user) {
      throw new ErrorResponse('service', 400, 'User with that ID doesn\'t exist.');
    }

    return this.userRepository.deleteById(id);
  }
}

module.exports = new UserService(userRepository, roleRepository);
