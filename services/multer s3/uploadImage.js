const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const path = require("path");
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID , 
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
    },
    // endpoint: 's3.us-east-1.amazonaws.com',
    region: process.env.region

})
console.log(process.env)

const s3Storage = multerS3({
    s3: s3, 
    bucket: "btb-media-gallary", 
    acl: "public-read", 
    metadata: (req, file, cb) => {
        cb(null, {fieldname: file.fieldname})
    },
    key: (req, file, cb) => {
        const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
        cb(null, fileName);
    }
});

function sanitizeFile(file, cb) {
    const fileExts = [".png", ".jpg", ".jpeg", ".gif", ".PNG", ".JPG", ".JPEG", ".GIF"];
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );
    const isAllowedMimeType = file.mimetype.startsWith("image/");
    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); 
    } else {
        cb("Error: File type not allowed!");
    }
}

const uploadImagetoS3 = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback)
    },
    limits: {
        // limit => 2 mb
        fileSize: 1024 * 1024 * 2 
    }
})

module.exports = {uploadImagetoS3};