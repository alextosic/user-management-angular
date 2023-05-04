const userService = require('../services/user');
const mfaService = require('../services/mfa');
const BaseController = require('./base');
const SuccessResponse = require('../responses/success');
const ProfileDTO = require('../dtos/profile');
const ErrorResponse = require('../responses/error');

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
      const { _id: id, firstName, lastName, mfa } = req.user;
      const { type } = req.query;

      if (mfa) {
        throw new ErrorResponse('controller', 400, 'User already has a MFA set up on his account.');
      }

      let createdMfa;

      if (type === 'totp') {
        createdMfa = await this.mfaService.createTotp(id, `${firstName} ${lastName}`);
      }

      await this.userService.update(id, { mfa: createdMfa._id }, true);
      return this.sendResponse(res, new SuccessResponse(200, 'MFA added successfully.'));
    }, next);
  }

  verifyMfa() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { _id: userId, mfa } = req.user;
      const { verificationCode } = req.body;

      if (!mfa) {
        throw new ErrorResponse('controller', 400, 'MFA not set up for this user.');
      }

      if (mfa.type === 'totp') {
        await this.mfaService.verifyTotp(mfa._id, userId, mfa.factorSid, verificationCode);
      }

      return this.sendResponse(res, new SuccessResponse(200, 'MFA verified successfully.'));
    }, next);
  }

  removeMfa() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { _id: userId, mfa } = req.user;
      const { verificationCode } = req.body;

      if (!mfa._id) {
        throw new ErrorResponse('controller', 400, 'MFA not set up for this user.');
      }

      if (mfa.type === 'totp') {
        await this.mfaService.validateTotpChallenge(userId, mfa.factorSid, verificationCode);
      }

      await this.mfaService.removeMfa(mfa._id);
      await this.userService.update(userId, { mfa: null }, true);

      return this.sendResponse(res, new SuccessResponse(200, 'MFA removed successfully.'));
    }, next);
  }
}

module.exports = new ProfileController(userService, mfaService);
