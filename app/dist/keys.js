"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.key = void 0;
const host = "10.10.0.7"; //process.env.MYSQL_SERVER;
const user = process.env.MYSQL_USER;
const password = ".4C3r04dm1n"; //process.env.MYSQL_PW;
const namedatabase = process.env.MYSQL_DB;
const port = process.env.MYSQL_PORT;
const conLimit = 10;
const key = {
    host: host,
    database: namedatabase,
    user: user,
    password: password,
    port: port,
    connectionLimit: conLimit
};
exports.key = key;
//# sourceMappingURL=keys.js.map