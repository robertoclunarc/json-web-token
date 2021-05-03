const host = 'localhost';//process.env.MYSQL_SERVER;
const user = 'root';//process.env.MYSQL_USER;
const password = '';//process.env.MYSQL_PW;
const namedatabase = 'intranet';//process.env.MYSQL_DB;
const port = 3606;//process.env.MYSQL_PORT;
const conLimit= 10;

const key = {
    host: host,
    database: namedatabase,
    user: user,
    password: password,
    port:port,
    connectionLimit: conLimit
}

export {key};