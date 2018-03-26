'use strict';
const mysql     = require('mysql');

module.exports = function(dbName) {
    return mysql.createConnection({
        host: "localhost",
        user: "dev",
        password: "TannhauserGate",
        database: dbName
    });
}