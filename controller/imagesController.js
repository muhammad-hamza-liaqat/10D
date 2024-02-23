const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Readable } = require("stream");

const s3Client = new S3Client({ region: process.env.region });

const addData = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files were uploaded!" });
  }
  try {
    const filePaths = req.files.map((file) => file.path);
    console.log("Files uploaded successfully to the server!");
    res.status(200).json({ message: "Files uploaded successfully.", files: filePaths });
  } catch (error) {
    console.log("Internal server error - image Controller:", error);
    return res.status(500).json({ message: "Server error", error: error });
  }
};

const uploadToAws = async (file, fileName) => {
  try {
    const readableStream = new Readable({
      read() {
        this.push(file.buffer);
        this.push(null);
      }
    });

    const command = new PutObjectCommand({
      Bucket: "btb-media-gallary",
      Key: fileName,
      Body: readableStream,
    });

    const uploadResult = await s3Client.send(command);
    console.log("File uploaded successfully. File location:", uploadResult.Location);
    return uploadResult.Location;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Error uploading file to S3");
  }
};


const handleFileUpload = async (req, res) => {
  try {
      const files = req.files;
      const uploadedFiles = [];
      for (const file of files) {
          const fileName = file.key;
          const fileUrl = await uploadToAws(file, fileName);
          uploadedFiles.push({ fileName, fileUrl });
      }
      res.json({ uploadedFiles });
  } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ error: "Failed to upload files" });
  }
};

module.exports = { addData, uploadToAws, handleFileUpload };
