
//
//  DB HANDLER FOR TABLE USER ACCOUNTS
//

const { sha256 } = require("js-sha256");
const db = require("./db-connector");

// /api/user/verify
exports.verify = function(req, res) {
    data = req.body;
    username = data.username;
    password = data.password;
    db.query('SELECT * FROM user WHERE username = "' + username + '" AND password = "' + password + '"', function(rows) {
        if (rows === null) {
            res.json({
                user : null,
            });
            return;
        }
        res.json({
            user : rows[0],
        });
    });
}

// /api/user/insert
exports.insert = function(req, res) {
    user = req.body;

    // verify the same user does not exist
    db.query('SELECT * FROM user WHERE username = "' + user['username'] + '"', function(rows) {
        if (rows !== null) {
            res.json({ 
                success : false,
                message : "Používateľské meno je už obsadené."
            });
            return;
        }

        // insert new user
        statement = 'INSERT INTO user SET ';
        for (let x in user) {
            statement  +=  x + "='" + user[x] + "', ";
        }
        statement = statement.substring(0, statement.length - 2);

        db.query(statement , function(rows) {
            if (rows !== null) {
                res.json({
                    success : true,
                    message : "Profil bol úspešne vytvorený."
                });
            } else {
                res.json({
                    success : false,
                    message : "Profil sa nepodarilo vytvoriť."
                });
            }
        });
    });
}

// /api/user/modify
exports.modify = function(req, res) {
    oldUser = req.body['oldUser'];
    newUser = req.body['newUser'];

    statement = 'UPDATE user SET ';
    for (let x in newUser) {
        statement  +=  x + '="' + user[x] + '"';
    }
    statement += ' WHERE username = "' + oldUser['username'] + '"';

    connection = db.getConnection();
    connection.query(statement, function(err, rows, fields) {
        if (err) throw err;
        res.json({ message: "Používateľské konto bolo upravené." });
      });
    connection.end();
}

// /api/user/delete
exports.delete = function(req, res) {
    user = req.body['user'];
    statement = ' DELETE FROM user WHERE username = "' + user['username'] + '"';

    connection = db.getConnection();
    connection.query(statement, function(err, rows, fields) {
        if (err) throw err;
        res.json({ message: "Používateľské konto bolo odstránené." });
      });
    connection.end();
}
