import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: 'public/photosusers',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

export default multer({storage});