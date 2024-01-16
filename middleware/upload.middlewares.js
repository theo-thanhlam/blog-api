const multer = require("multer");

const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

module.exports = {
  upload,
};
