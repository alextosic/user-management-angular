class ErrorResponse extends Error {
  constructor(type, status, message, details) {
    super(message);

    this.type = type;
    this.status = status;
    this.message = message;
    this.details = details;
  }
}

module.exports = ErrorResponse;
