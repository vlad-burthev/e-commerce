import errorApi from "../error/errorApi.js";
import { decodeTokenHandler } from "../helpers/decodeTokenHandler.js";

export const checkAuthMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(ApiError.unauthorized("Неавторизований"));
    }

    const decodeToken = decodeTokenHandler(token);
    req.user = decodeToken;
    next();
  } catch (error) {
    return next(errorApi.unauthorized(error.message));
  }
};
