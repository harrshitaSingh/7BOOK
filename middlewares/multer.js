const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();
exports.multerUploads = multer({ storage }).single("photo");
const DatauriParser = require("datauri/parser");
exports.dataUri = (req) => {
  const parser = new DatauriParser();
  try {
    let ext = String(path.extname(req.file.originalname));
    return parser.format(ext, req.file.buffer);
  } catch (err) {
    console.log("Parser Error", err);
  }
};
