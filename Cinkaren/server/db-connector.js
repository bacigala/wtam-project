
//
//  MANAGE DB CONNECTION
//

require('dotenv').config();
var mysql = require('mysql');

exports.getConnection = function() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        database : process.env.DB_NAME,
        port : process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
    connection.connect(function(err) {
        if (err) throw err;
    });
    return connection;
}

exports.query = function(statement, cb) {
    connection = this.getConnection();
    connection.query(statement, function(err, rows, fields) {
        if (err) console.log(err);
        cb(err ? null : rows.length === 0 ? null : rows);
      });
    connection.end();
}
