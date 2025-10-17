import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from 'multer'
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "uploads", 
      allowed_formats: ["jpg", "png", "jpeg"],
    },
  });

  export const upload = multer({ storage });