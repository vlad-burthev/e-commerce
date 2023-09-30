export default class errorApi extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new errorApi(400, message);
  }

  static unauthorized(message) {
    return new errorApi(401, message);
  }

  static internal(message) {
    return new errorApi(500, message);
  }

  static forbidden(message) {
    return new errorApi(501, message);
  }
}
