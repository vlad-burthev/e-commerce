import errorApi from "../error/errorApi.js";
import { Device } from "../models/models.js";
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

    sharp(img.data)
      .jpeg({ quality: 70 })
      .toFile(path.join(__dirname, "..", "static", fileName), (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });

    let slug = convertToSlug(name);

    const createdDevice = await Device.create({
      slug,
      name,
      price,
      brandId,
      typeId,
      img: fileName,
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
