import express from "express";
import authRoutes from "./routes/index.route";
import morgan from "morgan";
import dotenv from 'dotenv';
import cors from "cors";
import passport from "passport"
import passportMidd from "./middlewares/passport";
import path from "path";
import db from "./database";

//setting
const app = express();
dotenv.config();
app.set("port", process.env.APP_PORT || 3000);
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

db.conectarBD();

app.get('/', (req, res) => {
	const message = `Las APIs se ejecutan en el puerto: ${process.env.APP_PORT}. La base de datos es: ${process.env.MYSQL_DB}, corriendo en el servidor ${process.env.MYSQL_SERVER}, con el usuario ${process.env.MYSQL_USER}`;
	res.json({
		message
	});
});

app.use('/api',authRoutes);

app.use((req, res, next) => {
	res.status(404).json({
		err: 'Error, Ruta no encontrada'
	});
	next();
});

//esta carpeta sera para almacenar los archivos publicos
app.use('/public', express.static(path.resolve('public')));