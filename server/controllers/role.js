const roleService = require('../services/role');
const BaseController = require('./base');

const SuccessResponse = require('../responses/success');
const RoleDTO = require('../dtos/role');

class RoleController extends BaseController {
  constructor(roleServiceParam) {
    super();

    this.roleService = roleServiceParam;
  }

  getAllRoles() {
    return async (req, res, next) => this.handleRequest(async () => {
      const rolesResult = await this.roleService.getAll(req.query);
      const rolesDTO = RoleDTO.fromArray(rolesResult.roles);

      return this.sendResponse(res, new SuccessResponse(200, 'Roles fetched successfully.', {
        ...rolesResult,
        roles: rolesDTO,
      }));
    }, next);
  }

  getRole() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { id } = req.params;
      const role = await this.roleService.getById(id);
      const roleDTO = new RoleDTO(role).toJson();

      return this.sendResponse(res, new SuccessResponse(200, 'Role fetched successfully.', roleDTO));
    }, next);
  }

  createRole() {
    return async (req, res, next) => this.handleRequest(async () => {
      await this.roleService.create(req.body);
      return this.sendResponse(res, new SuccessResponse(201, 'Role created successfully.'));
    }, next);
  }

  updateRole() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { id } = req.params;

      const updatedRole = await this.roleService.update(id, req.body);
      const updatedRoleDTO = new RoleDTO(updatedRole).toJson();

      return this.sendResponse(res, new SuccessResponse(200, 'Role updated successfully.', updatedRoleDTO));
    }, next);
  }

  deleteRole() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { id } = req.params;
      await this.roleService.delete(id);

      return this.sendResponse(res, new SuccessResponse(200, 'Role deleted successfully.'));
    }, next);
  }
}

module.exports = new RoleController(roleService);
