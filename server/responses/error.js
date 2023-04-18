class ErrorResponse extends Error {
  constructor(type, status, message, data) {
    super(message);

    this.type = type;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

module.exports = ErrorResponse;
