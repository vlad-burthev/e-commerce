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
        return next(errorApi.unauthorized("Unauthorized"));
      }

      const decodeToken = decodeTokenHandler(token);

      if (decodeToken.role !== role) {
        return next(errorApi.unauthorized("Not enough rights"));
      }

      req.user = decodeToken;
      next();
    } catch (error) {
      return next(errorApi.badRequest("Not enough rights"));
    }
  };
};
