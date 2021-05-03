import express from "express";
import authRoutes from "./routes/index.route";
import morgan from "morgan";
import dotenv from 'dotenv';
import cors from "cors";
import passport from "passport"
import passportMidd from "./middlewares/passport";
import path from "path";

//setting
const app = express();
dotenv.config();
app.set("port", process.env.PORT || 3000);
app.set('trust proxy', true);

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(passport.initialize());
passport.use(passportMidd);

app.listen(app.get("port"));
console.log("Server express on port:", app.get("port"));

app.use('/',authRoutes);

app.get('/', (req, res) => {
	const message = `Las APIs se ejecutan en el puerto: ${process.env.PORT}`;
	res.json({
		message
	});
});

app.use((req, res, next) => {
	res.status(404).json({
		err: 'Error, Ruta no encontrada'
	});
	next();
});

//esta carpeta sera para almacenar los archivos publicos
app.use('/public', express.static(path.resolve('public')));