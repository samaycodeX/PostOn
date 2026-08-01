import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({storage : storage});
export const uploadFiles = upload.fields([
  { name: "media", maxCount: 1 },
  
]);