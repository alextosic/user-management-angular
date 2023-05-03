const userService = require('../services/user');
const mfaService = require('../services/mfa');
const BaseController = require('./base');
const SuccessResponse = require('../responses/success');
const ProfileDTO = require('../dtos/profile');
const MfaDTO = require('../dtos/mfa');

class ProfileController extends BaseController {
  constructor(userServiceParam, mfaServiceParam) {
    super();

    this.userService = userServiceParam;
    this.mfaService = mfaServiceParam;
  }

  getProfile() {
    return async (req, res, next) => this.handleRequest(async () => {
      const profileDTO = new ProfileDTO(req.user).toJson();
      return this.sendResponse(res, new SuccessResponse(200, 'Profile fetched successfully.', profileDTO));
    }, next);
  }

  updateProfile() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { _id: id } = req.user;
      const updatedProfile = await this.userService.update(id, req.body, true);
      const updatedProfileDTO = new ProfileDTO(updatedProfile).toJson();

      return this.sendResponse(res, new SuccessResponse(200, 'Profile updated successfully.', updatedProfileDTO));
    }, next);
  }

  deleteProfile() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { _id: id } = req.user;
      await this.userService.delete(id);

      return this.sendResponse(res, new SuccessResponse(200, 'Profile deleted successfully.'));
    }, next);
  }

  addMfa() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { _id: id, firstName, lastName } = req.user;
      const { type } = req.params;

      let mfaId;

      if (type === 'totp') {
        mfaId = (await this.mfaService.createTotp(id, `${firstName} ${lastName}`))._id;
      }

      await this.userService.updateUser(id, { mfa: mfaId });
      return this.sendResponse(res, new SuccessResponse(200, 'MFA added successfully.'));
    }, next);
  }

  listMfas() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { _id: id } = req.user;

      const mfas = await this.mfaService.getAllByUser(id);
      return this.sendResponse(res, new SuccessResponse(200, 'MFAs fetched successfully.', MfaDTO.fromArray(mfas)));
    }, next);
  }
}

module.exports = new ProfileController(userService, mfaService);
