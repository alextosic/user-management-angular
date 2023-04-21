const userService = require('../services/user');
const authService = require('../services/auth');
const roleService = require('../services/role');
const BaseController = require('./base');

const SuccessResponse = require('../responses/success');
const UserDTO = require('../dtos/user');

const { defaultRoles } = require('../constants/role');

class UserController extends BaseController {
  constructor(userServiceParam, authServiceParam, roleServiceParam) {
    super();

    this.userService = userServiceParam;
    this.authService = authServiceParam;
    this.roleService = roleServiceParam;
  }

  getAllUsers() {
    return async (req, res, next) => this.handleRequest(async () => {
      const adminRole = await this.roleService.getByName(defaultRoles.ADMIN);
      const usersResult = await this.userService.getAllNotAdmin(adminRole._id, req.query);
      const usersDTO = UserDTO.fromArray(usersResult.users);

      return this.sendResponse(res, new SuccessResponse(200, 'Users fetched successfully.', {
        ...usersResult,
        users: usersDTO,
      }));
    }, next);
  }

  getUser() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { id } = req.params;
      const user = await this.userService.getById(id);
      const userDTO = new UserDTO(user).toJson();

      return this.sendResponse(res, new SuccessResponse(200, 'User fetched successfully.', userDTO));
    }, next);
  }

  createUser() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { password } = req.body;
      const hashedPassword = await this.authService.hashPassword(password);
      const userRole = await this.roleService.getByName(defaultRoles.USER);

      await this.userService.create({
        ...req.body,
        role: userRole._id,
        password: hashedPassword,
      });

      return this.sendResponse(res, new SuccessResponse(201, 'User created successfully.'));
    }, next);
  }

  updateUser() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { id } = req.params;
      const { password } = req.body;

      const hashedPassword = password ? await this.authService.hashPassword(password) : undefined;
      const updatedUser = await this.userService.update(id, {
        ...req.body,
        password: hashedPassword,
      }, true);

      const updatedUserDTO = new UserDTO(updatedUser).toJson();
      return this.sendResponse(res, new SuccessResponse(200, 'User updated successfully.', updatedUserDTO));
    }, next);
  }

  deleteUser() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { id } = req.params;
      await this.userService.delete(id);

      return this.sendResponse(res, new SuccessResponse(200, 'User deleted successfully.'));
    }, next);
  }
}

module.exports = new UserController(userService, authService, roleService);
