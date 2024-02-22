const addData = async (req, res) => {
  if (!req.files || !req.files.length === 0) {
    return res.status(400).json({ message: "no files were uploaded!" });
  }
  try {
    const filePaths = [];
    req.files.forEach((file) => {
      // Store the path of each uploaded file
      filePaths.push(file.path);
    });
    res
      .status(200)
      .json({ message: "Files uploaded successfully.", files: filePaths });
  } catch (error) {
    console.log("internal server error- image Controller");
    return res.status(500).json({ message: "server error", error: error });
  }
};

module.exports = { addData };
