import errorApi from "../error/errorApi.js";
import { emailValidator } from "../helpers/emailValidator.js";
import { generateJwt } from "../helpers/generateJwt.js";
import { Cart, User } from "../models/models.js";
import * as bcrypt from "bcrypt";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return next(errorApi.unauthorized("Такого користувача не знайдено"));
    }

    const comparePassword = bcrypt.compareSync(password, existingUser.password);
    if (!comparePassword) {
      return next(errorApi.unauthorized("Неправильний пароль або email"));
    }

    const token = generateJwt(
      existingUser.id,
      existingUser.email,
      existingUser.role
    );

    return res.status(200).json(token);
  } catch (error) {
    return next(errorApi.unauthorized(error.message));
  }
};

export const sigin = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    if (!emailValidator(email))
      return next(errorApi.unauthorized("Некоректний email"));

    if (password.length < 8) {
      return next(
        errorApi.unauthorized("Пароль повинен буди не коротше 8 символів")
      );
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return next(errorApi.unauthorized("Такий користувач вже зареєстрований"));
    }

    const hashPassword = bcrypt.hashSync(password, 7);

    const siginUser = await User.create({
      email,
      password: hashPassword,
      role,
    });
    const token = generateJwt(siginUser.id, siginUser.email, siginUser.role);
    await Cart.create({ userId: siginUser.id });

    return res.status(200).json(token);
  } catch (error) {
    return next(errorApi.unauthorized(error.message));
  }
};

export const check = async (req, res, next) => {
  try {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.status(200).json(token);
  } catch (error) {
    return next(errorApi.unauthorized(error.message));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ where: { role: "USER" } });
    return res.status(200).json(users);
  } catch (error) {
    return next(errorApi.internal(error.message));
  }
};
