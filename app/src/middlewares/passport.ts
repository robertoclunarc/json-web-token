import { Strategy, ExtractJwt } from "passport-jwt";
import db from "../database";

const strategy = new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || "secret"
    },
    async (payload, done) => {
        try {
            const result = await db.querySelect("SELECT * FROM seg_app_auth WHERE id = ?", [payload.idapp]);
            if (result.length < 0) {
                return done(null, false)
            }
            return done(null, result)
        } catch (error) {
            console.log(error);
        }

    }
);

export default strategy;