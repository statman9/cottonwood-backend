'use strict';
const mysql     = require('mysql');

module.exports = function(dbName) {
    return new mysql({
        host: "localhost",
        user: "dev",
        password: "TannhauserGate",
        database: dbName
    });
}