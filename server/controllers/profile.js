const userService = require('../services/user');
const BaseController = require('./base');
const SuccessResponse = require('../responses/success');

class ProfileController extends BaseController {
  constructor(userServiceParam) {
    super();

    this.userService = userServiceParam;
  }

  getProfile() {
    return async (req, res) => {
      const { id } = req.params;
      const profile = await this.userService.getById(id);

      return this.sendResponse(res, new SuccessResponse(200, 'Profile fetched successfully.', profile));
    };
  }

  updateProfile() {
    return async (req, res) => {
      const { id } = req.params;
      const updatedProfile = await this.userService.update(id, req.body);

      return this.sendResponse(res, new SuccessResponse(200, 'Profile updated successfully.', updatedProfile));
    };
  }

  deleteProfile() {
    return async (req, res) => {
      const { id } = req.params;
      await this.userService.delete(id);

      return this.sendResponse(res, new SuccessResponse(200, 'Profile deleted successfully.'));
    };
  }
}

module.exports = new ProfileController(userService);
