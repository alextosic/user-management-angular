const userService = require('../services/user');
const authService = require('../services/auth');
const BaseController = require('./base');

const ErrorResponse = require('../responses/error');
const SuccessResponse = require('../responses/success');

class AuthController extends BaseController {
  constructor(userServiceParam, authServiceParam) {
    super();

    this.userService = userServiceParam;
    this.authService = authServiceParam;
  }

  login() {
    return (req, res, next) => {
      return this.handleRequest(async () => {
        const { email, password } = req.body;
        const user = await this.userService.getByEmail(email);

        if (!user) {
          throw new ErrorResponse('controller', 401, 'Email or password invalid.');
        }

        const passwordValid = await this.authService.verifyPassword(password, user.password);

        if (!passwordValid) {
          throw new ErrorResponse('controller', 401, 'Email or password invalid.');
        }

        if (user.passwordReset) {
          throw new ErrorResponse('controller', 401, 'You haven\'t set a new password.', {
            passwordReset: true,
          });
        }

        const token = this.authService.createToken(user._id);
        return this.sendResponse(res, new SuccessResponse(200, 'Logged in successfully.', {
          token
        }));
      }, next);
    };
  }

  register() {
    return async (req, res, next) => {
      return this.handleRequest(async () => {
        const { password } = req.body;
        const hashedPassword = await this.authService.hashPassword(password);

        await this.userService.create({ ...req.body, password: hashedPassword });
        return this.sendResponse(res, new SuccessResponse(201, 'Account created successfully.'));
      }, next);
    };
  }

  forgotPassword() {
    return async (req, res, next) => {
      return this.handleRequest(async () => {
        await this.userService.resetPassword(req.body.email);
        return this.sendResponse(res, new SuccessResponse(200, 'Password reset successfully.'));
      }, next);
    };
  }

  updatePassword() {
    return async (req, res, next) => {
      return this.handleRequest(async () => {
        const { password } = req.body;
        const hashedPassword = await this.authService.hashPassword(password);

        await this.userService.updatePassword(req.params.id, hashedPassword);
        return this.sendResponse(res, new SuccessResponse(200, 'Password updated successfully.'));
      }, next);
    };
  }
}

module.exports = new AuthController(userService, authService);
