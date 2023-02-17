const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "mysecretpassword",
    host: "localhost",
    port: 5432,
    database: "plantie_database"
});

module.exports = pool;