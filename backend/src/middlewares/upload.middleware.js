const multer = require("multer");

const AppError = require("../utils/AppError");

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(
      new AppError("Only JPEG, PNG and WebP images are allowed", 400),
    );
  }

  callback(null, true);
};

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },

  fileFilter,
});

module.exports = upload;
