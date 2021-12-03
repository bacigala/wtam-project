
//
//  MANAGE DB CONNECTION
//

var mysql = require('mysql');

exports.getConnection = function() {
    connection = mysql.createConnection({
        host: "mariadb105.websupport.sk",
        database : '4ve7qe0v',
        port : 3315,
        user: "4ve7qe0v",
        password: "Yq6X[jXf&1"
    });
    connection.connect(function(err) {
        //console.log( !err ? "connected" : "not connected");
        if (err) throw err;
    });
    return connection;
}

exports.query = function(statement, cb) {
    connection = this.getConnection();
    connection.query(statement, function(err, rows, fields) {
        if (err) throw err;
        cb(err ? null : rows.length === 0 ? null : rows);
      });
    connection.end();
}
