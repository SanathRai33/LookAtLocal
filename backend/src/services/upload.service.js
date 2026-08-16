const cloudinary = require("../config/cloudinary");
const AppError = require("../utils/appError");

const uploadImage = (file, folder = "lookatlocal") => {
  if (!file?.buffer) {
    throw new AppError("Image file is required", 400);
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",

        transformation: [
          { width: 1600, height: 1600, crop: "limit" },
          { quality: "auto", fetch_format: "auto" },
        ],
      },

      (error, result) => {
        if (error) {
          return reject(new AppError("Failed to upload image", 500));
        }

        resolve({
          publicId: result.public_id,
          url: result.secure_url,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
        });
      },
    );

    uploadStream.end(file.buffer);
  });
};

const uploadImages = async (files, folder = "lookatlocal") => {
  if (!files || files.length === 0) {
    throw new AppError("At least one image is required", 400);
  }

  const images = await Promise.all(
    files.map((file) => uploadImage(file, folder)),
  );

  return images;
};

const deleteImage = async (publicId) => {
  if (!publicId) {
    return;
  }

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  } catch (error) {
    throw new AppError("Failed to delete image", 500);
  }
};

const deleteImages = async (publicIds) => {
  if (!publicIds?.length) {
    return;
  }

  await Promise.all(publicIds.map((publicId) => deleteImage(publicId)));
};

module.exports = {
  uploadImage,
  uploadImages,
  deleteImage,
  deleteImages,
};
