import imagekit from "../configs/imagekit.js";

export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadedImage = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    res.status(200).json({ url: uploadedImage.url });
  } catch (err) {
    console.error("Image upload failed", err);
    res.status(500).json({ message: "Image upload failed" });
  }
};
