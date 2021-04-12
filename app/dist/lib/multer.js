"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: 'public/photosusers',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
exports.default = multer_1.default({ storage });
//# sourceMappingURL=multer.js.map