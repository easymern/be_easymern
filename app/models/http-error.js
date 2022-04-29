class HttpError extends Error {
  constructor(message, errorCode) {
    console.log("errors")
    super(message);
    this.code = errorCode;
  }
}

module.exports = HttpError;
