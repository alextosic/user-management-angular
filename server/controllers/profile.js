const userService = require('../services/user');
const BaseController = require('./base');
const SuccessResponse = require('../responses/success');
const ProfileDTO = require('../dtos/profile');

class ProfileController extends BaseController {
  constructor(userServiceParam) {
    super();

    this.userService = userServiceParam;
  }

  getProfile() {
    return async (req, res, next) => {
      return this.handleRequest(async () => {
        const { id } = req.params;
        const profile = await this.userService.getById(id);
        const profileDTO = new ProfileDTO(profile).toJson();

        return this.sendResponse(res, new SuccessResponse(200, 'Profile fetched successfully.', profileDTO));
      }, next);
    };
  }

  updateProfile() {
    return async (req, res, next) => {
      return this.handleRequest(async () => {
        const { id } = req.params;
        const updatedProfile = await this.userService.update(id, req.body);
        const updatedProfileDTO = new ProfileDTO(updatedProfile).toJson();

        return this.sendResponse(res, new SuccessResponse(200, 'Profile updated successfully.', updatedProfileDTO));
      }, next);
    };
  }

  deleteProfile() {
    return async (req, res, next) => {
      return this.handleRequest(async () => {
        const { id } = req.params;
        await this.userService.delete(id);

        return this.sendResponse(res, new SuccessResponse(200, 'Profile deleted successfully.'));
      }, next);
    };
  }
}

module.exports = new ProfileController(userService);
