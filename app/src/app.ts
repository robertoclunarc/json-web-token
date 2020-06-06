import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport"
import passportMidd from "./middlewares/passport";
import authRoutes from "./routes/index.route"


const app = express();
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(morgan("dev"));
//app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(passportMidd);


//test
app.get("/", async (req, resp) => {
    //const result = await db.querySelect("SELECT * FROM seg_roles");
    //resp.send("Server http ON!");
    //resp.status(201).json(result)

});

app.use(authRoutes)

app.listen(app.get("port"));
console.log("Server express on port:", app.get("port"));