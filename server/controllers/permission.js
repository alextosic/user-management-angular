const permissionService = require('../services/permission');
const BaseController = require('./base');

const SuccessResponse = require('../responses/success');
const PermissionDTO = require('../dtos/permission');

class PermissionController extends BaseController {
  constructor(permissionServiceParam) {
    super();

    this.permissionService = permissionServiceParam;
  }

  getAllPermissions() {
    return async (req, res, next) => this.handleRequest(async () => {
      const permissionsResult = await this.permissionService.getAll();
      const permissionsDTO = PermissionDTO.fromArray(permissionsResult);

      return this.sendResponse(res, new SuccessResponse(200, 'Permissions fetched successfully.', permissionsDTO));
    }, next);
  }
}

module.exports = new PermissionController(permissionService);
