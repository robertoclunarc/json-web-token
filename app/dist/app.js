"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const path_1 = __importDefault(require("path"));
//setting
const app = express_1.default();
dotenv_1.default.config();
app.set("port", process.env.PORT || 3000);
app.set('trust proxy', true);
//middlewares
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
app.listen(app.get("port"));
console.log("Server express on port:", app.get("port"));
app.use('/api/seguridad', index_route_1.default);
//esta carpeta sera para almacenar los archivos publicos
app.use('/public', express_1.default.static(path_1.default.resolve('public')));
//# sourceMappingURL=app.js.map