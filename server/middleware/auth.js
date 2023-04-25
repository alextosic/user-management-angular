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
      console.log(authHeader);

      if (!authHeader || !authHeader.length) {
        return next(new ErrorResponse('middleware', 401, 'User not logged in.'));
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        return next(new ErrorResponse('middleware', 401, 'User not logged in.'));
      }

      try {
        const decodedToken = this.authService.verifyToken(token);
        const user = await this.userService.getById(decodedToken.id);

        if (!user) {
          throw new ErrorResponse('middleware', 401, 'User not logged in.');
        }

        req.user = user;
        return next();
      } catch (err) {
        return next(err);
      }
    };
  }

  authorize(allowedPermissions) {
    return async (req, res, next) => {
      const { user } = req;
      console.log(JSON.stringify(user));

      if (user.role.permissions.some(
        (permission) => allowedPermissions.indexOf(permission.name) > -1,
      )) {
        return next();
      }

      return next(new ErrorResponse('middleware', 500, 'User is not allowed to access this resource or perform this operation.'));
    };
  }
}

module.exports = new AuthMiddleware(authService, userService);
