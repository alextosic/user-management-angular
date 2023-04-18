const userService = require('../services/user');
const authService = require('../services/auth');

const ErrorResponse = require('../responses/error');

class AuthMiddleware {
  constructor(authServiceParam, userServiceParam) {
    this.authService = authServiceParam;
    this.userService = userServiceParam;
  }

  authenticate() {
    return async (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.length) {
        return next(new ErrorResponse('middleware', 401, 'User not logged in.'));
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        return next(new ErrorResponse('middleware', 401, 'User not logged in.'));
      }

      try {
        const decodedToken = this.authService.verifyToken(token);
        req.user = await this.userService.getById(decodedToken.id);

        return next();
      } catch (err) {
        return next(err);
      }
    };
  }

  authorize(allowedRoles) {
    return async (req, res, next) => {
      const { user } = req;

      if (allowedRoles.indexOf(user.role.name) < 0) {
        return next(new ErrorResponse('middleware', 500, 'User not allowed to access this resource.'));
      }

      return next();
    };
  }
}

module.exports = new AuthMiddleware(authService, userService);
