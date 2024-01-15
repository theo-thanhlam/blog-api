const multer = require("multer");

const uploadMiddleware = multer({
  dest: "uploads/",
  limits: {
    fieldSize: 25 * 1024 * 1024,
  },
});

module.exports = {
  uploadMiddleware,
};
