import errorApi from "../error/errorApi.js";
import { Rating } from "../models/models.js";

export const addRating = async (req, res, next) => {
  const { deviceId, mark } = req.body;
  try {
    const existingRating = await Rating.findOne({
      where: { userId: req.user.id, deviceId },
    });

    if (existingRating) {
      const newRating = await existingRating.update({ mark: mark });
      return res.status(200).json(newRating);
    }

    const addedRate = await Rating.create({
      deviceId,
      mark,
      userId: req.user.id,
    });

    return res.status(200).json(addedRate);
  } catch (error) {
    return next(errorApi.badRequest(error.message));
  }
};
