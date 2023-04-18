const userService = require('../services/user');
const authService = require('../services/auth');
const BaseController = require('./base');

const SuccessResponse = require('../responses/success');
const UserDTO = require('../dtos/user');

class UserController extends BaseController {
  constructor(userServiceParam, authServiceParam) {
    super();

    this.userService = userServiceParam;
    this.authService = authServiceParam;
  }

  getAllUsers() {
    return async (req, res) => {
      const users = await this.userService.getAll();
      const usersDTO = UserDTO.fromArray(users);

      return this.sendResponse(res, new SuccessResponse(200, 'Users fetched successfully.', usersDTO));
    };
  }

  getUser() {
    return async (req, res) => {
      const { id } = req.params;
      const user = await this.userService.getById(id);
      const userDTO = new UserDTO(user).toJson();

      return this.sendResponse(res, new SuccessResponse(200, 'User fetched successfully.', userDTO));
    };
  }

  createUser() {
    return async (req, res) => {
      const { password } = req.body;
      const hashedPassword = await this.authService.hashPassword(password);

      await this.userService.create({ ...req.body, password: hashedPassword });
      return this.sendResponse(res, new SuccessResponse(201, 'User created successfully.'));
    };
  }

  updateUser() {
    return async (req, res) => {
      const { id } = req.params;
      const { password } = req.body;

      const hashedPassword = await this.authService.hashPassword(password);
      const updatedUser = await this.userService.update(id, { ...req.body, password: hashedPassword }, true);
      const updatedUserDTO = new UserDTO(updatedUser).toJson();

      return this.sendResponse(res, new SuccessResponse(200, 'User updated successfully.', updatedUserDTO));
    };
  }

  deleteProfile() {
    return async (req, res) => {
      const { id } = req.params;
      await this.userService.delete(id);

      return this.sendResponse(res, new SuccessResponse(200, 'User deleted successfully.'));
    };
  }
}

module.exports = new UserController(userService, authService);
