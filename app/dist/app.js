"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const app = express_1.default();
app.set("port", process.env.PORT || 3000);
//middlewares
app.use(morgan_1.default("dev"));
//app.use(express.urlencoded({extended: false}));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
//test
app.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    //const result = await db.querySelect("SELECT * FROM seg_roles");
    //resp.send("Server http ON!");
    //resp.status(201).json(result)
}));
app.use(index_route_1.default);
app.listen(app.get("port"));
console.log("Server express on port:", app.get("port"));
