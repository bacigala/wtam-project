
//
//  DB HANDLER FOR TABLE USER ACCOUNTS
//

const db = require("./db-connector");

// /api/user/verify
exports.verify = function(req, res) {
    data = req.body;
    username = data.username;
    password = data.password;
    db.query('SELECT * FROM user WHERE username = "' + username + '" AND password = "' + password + '" AND active=1', function(rows) {
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

// /api/user/update
exports.update = function(req, res) {
    username = req.body.username;
    password = req.body.password;
    newData = req.body.newData;

    //todo: check vstupu
    if (newData === null || newData === undefined || !newData.length) {
        res.json({
            success : true,
            message : "Profil nebol upravený."
        });
        return;
    }

    // build query
    statement = 'UPDATE user SET ';
    for (let x in newData) {
        statement  +=  x + "='" + newData[x] + "', ";
    }
    statement = statement.substring(0, statement.length - 2);
    statement += ' WHERE username="' + username + '" AND password="' + password + '"';

    // execute query
    db.query(statement , function(rows) {
        if (rows !== null) {
            res.json({
                success : true,
                message : "Profil bol úspešne upravený."
            });
        } else {
            res.json({
                success : false,
                message : "Profil sa nepodarilo upraviť."
            });
        }
    });
}
