import errorApi from "../error/errorApi.js";
import { decodeTokenHandler } from "../helpers/decodeTokenHandler.js";

export const checkRoleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization;
      if (!token) {
        return next(errorApi.unauthorized("Неавторизований"));
      }

      const decodeToken = decodeTokenHandler(token);

      if (decodeToken.role !== role) {
        return next(errorApi.unauthorized("Недостатньо прав"));
      }

      req.user = decodeToken;
      next();
    } catch (error) {
      return next(errorApi.badRequest(error.message));
    }
  };
};
