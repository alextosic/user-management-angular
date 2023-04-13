class ErrorResponse extends Error {
  constructor(props) {
    super(props);

    this.type = props.type;
    this.status = props.status;
    this.message = props.message;
  }
}

module.exports = ErrorResponse;
