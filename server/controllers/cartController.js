import { sequelize } from "../db/db.js";
import errorApi from "../error/errorApi.js";
import { Cart, Cart_Device, Device } from "../models/models.js";

export const addDeviceToCart = async (req, res, next) => {
  const { id } = req.params;

  try {
    const existingDevice = await Device.findOne({ where: { id } });

    if (!existingDevice) {
      return next(errorApi.badRequest("Такого товара не существует"));
    }

    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    const device = await Device.findOne({ where: { id } });

    const addedDeviceToCart = await Cart_Device.create({
      device_id: id,
      cartId: cart.id,
    });

    // Обновляем значение amount в таблице Cart
    await Cart.increment("amount", {
      by: device.price,
      where: { id: cart.id },
    });

    return res.status(200).json({ cart, addedDeviceToCart });
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};

export const deleteDeviceFromCart = async (req, res, next) => {
  const { id } = req.params;

  try {
    const existingDevice = await Device.findOne({ where: { id } });

    if (!existingDevice) {
      return next(errorApi.badRequest("Такого девайсу не існує"));
    }

    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    await Cart.decrement("amount", {
      by: -existingDevice.price,
      where: { id: cart.id },
    });
    const deleteDeviceToCart = await Cart_Device.findOne({
      where: { cartId: cart.id, device_id: id },
    });

    if (!deleteDeviceToCart) {
      return next(errorApi.badRequest("Девайс не знайден у кошику"));
    }

    await deleteDeviceToCart.destroy();

    return res.status(200).json({ cart, deleteDeviceToCart });
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};

export const getUserCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [{ model: Cart_Device, as: "cart_device" }],
    });

    return res.status(200).json(cart);
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};
