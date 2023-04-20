const express = require("express");
const {
  addPostController,
  fetchPosts,
  fetchPost,
  myPosts,
  searchPosts,
  nearPosts,
  requestSwap,
  myRequests,
} = require("../controllers/apiController");
const protect = require("../middlewares/checkAuth");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const router = express.Router();
const { cloudinaryConfig } = require("../config/cloudinaryConfig");
const { multerUploads } = require("../middlewares/multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
//   },
// });
// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// let upload = multer({ storage, fileFilter });
router.use("*", cloudinaryConfig);
router.post("/add_post", protect, multerUploads, addPostController);
router.get("/fetch_posts", fetchPosts);
router.post("/fetch_post", fetchPost);
router.post("/myposts", protect, myPosts);
router.post("/searchposts", searchPosts);
router.post("/nearposts", nearPosts);
router.post("/requestswap", protect, requestSwap);
router.post("/myrequests", protect, myRequests);

module.exports = router;
