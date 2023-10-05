import errorApi from "../error/errorApi.js";
import { Device, Device_Info, Rating } from "../models/models.js";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import sharp from "sharp";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const convertToSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
};

export const addDevice = async (req, res, next) => {
  try {
    const { name, price, typeId, brandId, info } = req.body;
    const { img } = req.files;
    let fileName = uuidv4() + ".jpg";
    let slug = convertToSlug(name);

    const existingDevice = await Device.findOne({ where: { name } });
    if (existingDevice) {
      return next(errorApi.badRequest("Такий девайс вже існує"));
    }
    let createdDevice;

    try {
      createdDevice = await Device.create({
        slug,
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
    } catch (deviceError) {
      return next(errorApi.badRequest(deviceError.message));
    }

    sharp(img.data)
      .jpeg({ quality: 70 })
      .toFile(path.join(__dirname, "..", "static", fileName), (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });

    if (info) {
      const parsedInfo = JSON.parse(info);
      parsedInfo.forEach((element) => {
        DeviceInfo.create({
          title: element.title,
          description: element.description,
          deviceId: createdDevice.id,
        });
      });
    }

    return res.status(200).json({ createdDevice });
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};

export const deleteDevice = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const existingDevice = await Device.findOne({ where: { slug } });

    if (!existingDevice) {
      return next(errorApi.badRequest("Такого девайсу не існує"));
    }

    await existingDevice.destroy();

    return res.status(200).json("Девайс успішно видалено");
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};

export const getOneDevice = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const device = await Device.findOne({
      where: { slug },
      include: [
        { model: Device_Info, as: "info" },
        { model: Rating, foreignKey: "deviceId" },
      ],
    });

    if (!device) {
      return next(errorApi.badRequest("Девайс не знайдено"));
    }

    return res.status(200).json(device);
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};

export const getAllDevices = async (req, res, next) => {
  try {
    const { typeId, brandId, page = 1, limit = 16 } = req.query;
    let offset = page * limit - limit;
    let devices;

    if (typeId && brandId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
        include: [{ model: Rating, foreignKey: "deviceId" }],
      });
    }
    if (!typeId && brandId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
        include: [{ model: Rating, foreignKey: "deviceId" }],
      });
    }
    if (typeId && !brandId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
        include: [{ model: Rating, foreignKey: "deviceId" }],
      });
    }
    if (!typeId && !brandId) {
      devices = await Device.findAndCountAll({
        limit,
        offset,
        include: [{ model: Rating, foreignKey: "deviceId" }],
      });
    }

    return res.status(200).json(devices);
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};
