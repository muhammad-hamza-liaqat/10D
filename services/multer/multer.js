const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    if ([".jpg", ".jpeg", ".png"].includes(path.extname(file.originalname))) {
      cb(null, true); 
    } else {
      cb(
        new Error("Only .jpg, .jpeg, or .png files are allowed for images."),
        false
      ); 
    }
  } else if (file.mimetype.startsWith("video/")) {
    if (path.extname(file.originalname) === ".mp4") {
      cb(null, true);
    } else {
      cb(new Error("Only .mp4 files are allowed for videos."), false); // Reject the file
    }
  } else {
    cb(new Error("Unsupported file type."), false); 
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = { upload };
