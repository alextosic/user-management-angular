const uuid = require('uuid');

const userRepository = require('../database/repositories/user');
const ErrorResponse = require('../responses/error');

class UserService {
  constructor(userRepositoryParam) {
    this.userRepository = userRepositoryParam;
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
    const users = await this.userRepository.findAll(pagination);
    const total = await this.userRepository.countAll();

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

  async update(id, data, updatingProfile) {
    const user = await this.getById(id);

    if (!user) {
      throw new ErrorResponse('service', 400, 'User with that ID doesn\'t exist.');
    }

    if (!updatingProfile && user.immutable) {
      throw new ErrorResponse('service', 400, 'This user cannot be updated.');
    }

    const { firstName, lastName, password, role } = data;
    await this.userRepository.updateById(id, {
      firstName,
      lastName,
      ...(!updatingProfile && !!password && { password }),
      ...(!updatingProfile && { role }),
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

    if (user.immutable) {
      throw new ErrorResponse('service', 400, 'This user cannot be deleted.');
    }

    return this.userRepository.deleteById(id);
  }
}

module.exports = new UserService(userRepository);
