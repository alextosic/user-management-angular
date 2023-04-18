const ErrorResponse = require('../responses/error');

class BaseController {
  async handleRequest(requestHandler, next) {
    try {
      await requestHandler();
    } catch (err) {
      if (err instanceof ErrorResponse) {
        next(err);
      } else {
        next(new ErrorResponse('controller', 500, err.message));
      }
    }
  }

  sendResponse(res, responseData) {
    console.dir(responseData);

    const { status, message, data } = responseData;
    return res.status(status).json({
      message,
      data,
    });
  }
}

module.exports = BaseController;
