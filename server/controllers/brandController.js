import errorApi from "../error/errorApi.js";
import { Brand } from "../models/models.js";

export const addBrand = async (req, res, next) => {
  const { name } = req.body;

  try {
    const existingBrand = await Brand.findOne({ where: { name } });

    if (existingBrand) {
      return next(errorApi.badRequest("Такий бренд вже існує"));
    }

    const createdBrand = await Brand.create({ name });
    return res.status(200).json({ createdBrand });
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};

export const getBrands = async (req, res, next) => {
  try {
    const brands = await Brand.findAll();
    return res.status(200).json(brands);
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};

export const deleteBrand = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existingBrand = await Brand.findOne({ where: { id } });

    if (!existingBrand) {
      return next(errorApi.badRequest("Такого бренду не існує"));
    }

    await existingBrand.destroy();

    return res.status(200).json("Бренд успішно видалено");
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};
