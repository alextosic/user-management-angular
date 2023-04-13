class BaseController {
  sendResponse(res, responseData) {
    console.dir(responseData);

    const {status, message, data} = responseData;
    return res.status(status).json({
      message,
      data,
    });
  }
}

module.exports = BaseController;
