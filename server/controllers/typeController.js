import errorApi from "../error/errorApi.js";
import { Type } from "../models/models.js";

export const addType = async (req, res, next) => {
  const { name } = req.body;

  try {
    const existingType = await Type.findOne({ where: { name } });

    if (existingType) {
      return next(errorApi.badRequest("Такий тип вже існує"));
    }

    const createdType = await Type.create({ name });
    return res.status(200).json({ createdType });
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};

export const getTypes = async (req, res, next) => {
  try {
    const types = await Type.findAll();
    return res.status(200).json(types);
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};

export const deleteType = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existingType = await Type.findOne({ where: { id } });

    if (!existingType) {
      return next(errorApi.badRequest("Такого типу не існує"));
    }

    await existingType.destroy();

    return res.status(200).json("Тип успішно видалено");
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};
