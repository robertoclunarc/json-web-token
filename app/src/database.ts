import mysql from "promise-mysql";

class database {

    cnn: any;

    async conectarBD() {
        /*    this.cnn.connect((err) => {
               if (err) throw err;
               console.log("Database is connected!");
           }); */
        //await this.cnn.query
        this.cnn = await mysql.createPool({
            // host: "10.1.1.32",
            connectionLimit: 1,
            host: "localhost", //"10.10.0.7",
            user: "root",
            //password: "4c3r04dm1n",
            password: "root", //"4c3r04dm1n",
            database: "intranet"
        });
    }

    getC() {
        return this.cnn;
    }

    private desconectarDB() {
        //this.cnn.disposer;
        this.cnn.end(() => {
            //console.log("error:");            
          });
    }

    async querySelect(sql: string, data?: any) {

        let result: any = null;
        if (!data) {
            result = await this.cnn.query(sql);
        } else {
            result = await this.cnn.query(sql, data);
        }
        //await this.cnn;
        //this.cnn = null;
        this.desconectarDB();
        return result;
    }

    async inuup() {
        // const 
    }


}

const db = new database();
db.conectarBD();

export default db;
