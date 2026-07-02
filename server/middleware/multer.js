import multer from "multer";

// Use memoryStorage — Vercel has no writable filesystem (diskStorage would crash)
const upload = multer({ storage: multer.memoryStorage() });

export default upload;