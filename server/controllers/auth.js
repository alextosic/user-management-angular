const userService = require('../services/user');
const authService = require('../services/auth');
const roleService = require('../services/role');
const mfaService = require('../services/mfa');

const BaseController = require('./base');

const ErrorResponse = require('../responses/error');
const SuccessResponse = require('../responses/success');

const { defaultRoles } = require('../constants/role');

class AuthController extends BaseController {
  constructor(userServiceParam, authServiceParam, roleServiceParam, mfaServiceParam) {
    super();

    this.userService = userServiceParam;
    this.authService = authServiceParam;
    this.roleService = roleServiceParam;
    this.mfaService = mfaServiceParam;
  }

  login() {
    return (req, res, next) => this.handleRequest(async () => {
      const { email, password } = req.body;
      const user = await this.userService.getByEmail(email);

      await this.authService.verifyUser(user, password);

      if (user.mfa && user.mfa.verified) {
        return this.sendResponse(res, new SuccessResponse(200, 'Enter your verification code.', {
          verificationCodeRequired: true,
          verificationType: user.mfa.type,
        }));
      }

      const token = this.authService.createToken(user._id);
      return this.sendResponse(res, new SuccessResponse(200, 'Logged in successfully.', {
        token,
      }));
    }, next);
  }

  verifyLogin() {
    return (req, res, next) => this.handleRequest(async () => {
      const { email, password, verificationCode } = req.body;
      const { type } = req.query;

      const user = await this.userService.getByEmail(email);
      await this.authService.verifyUser(user, password);

      if (type === 'totp') {
        await this.mfaService.validateTotpChallenge(user._id, user.mfa.factorSid, verificationCode);
      }

      const token = this.authService.createToken(user._id);
      return this.sendResponse(res, new SuccessResponse(200, 'Logged in successfully.', {
        token,
      }));
    }, next);
  }

  register() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { password } = req.body;
      const hashedPassword = await this.authService.hashPassword(password);
      const userRole = await this.roleService.getByName(defaultRoles.USER);

      await this.userService.create({
        ...req.body,
        password: hashedPassword,
        role: userRole._id,
      });

      return this.sendResponse(res, new SuccessResponse(201, 'Account created successfully.'));
    }, next);
  }

  forgotPassword() {
    return async (req, res, next) => this.handleRequest(async () => {
      const updatedUser = await this.userService.forgotPassword(req.body.email);
      return this.sendResponse(res, new SuccessResponse(200, 'Password reset successfully.', {
        passwordResetToken: updatedUser.passwordResetToken,
      }));
    }, next);
  }

  updatePassword() {
    return async (req, res, next) => this.handleRequest(async () => {
      const { password, passwordResetToken } = req.body;

      const user = await this.userService.get({ passwordResetToken });

      if (!user) {
        throw new ErrorResponse('controller', 400, 'Invalid password reset URL.');
      }

      const passwordValid = await this.authService.verifyPassword(password, user.password);

      if (passwordValid) {
        throw new ErrorResponse('controller', 400, 'You cannot set the same password as your old one.');
      }

      const hashedPassword = await this.authService.hashPassword(password);
      await this.userService.updatePassword(user._id, hashedPassword);

      return this.sendResponse(res, new SuccessResponse(200, 'Password updated successfully.'));
    }, next);
  }
}

module.exports = new AuthController(userService, authService, roleService, mfaService);
