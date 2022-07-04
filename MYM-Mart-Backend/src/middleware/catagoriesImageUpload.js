const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = () => {
  const UPLOADS_FOLDER = "./public/uploads/catagories";

  if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER);
  }

  return UPLOADS_FOLDER;
};

// define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath());
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();

    cb(null, fileName + fileExt);
  },
});

// prepare the final multer upload object
var catagoriesImageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "image") {
      if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
      } else {
        cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
      }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
});

module.exports = catagoriesImageUpload;
