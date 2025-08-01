// middlewares/upload.js
import multer from "multer";

const storage = multer.memoryStorage(); // We'll store as base64
const upload = multer({ storage });

export default upload;
