
//
//  DB HANDLER FOR TABLE EVENT
//

const { json } = require("body-parser");
const db = require("./db-connector");

// /api/event/signin
exports.signIn = function(req, res) {
    data = req.body;
    userId = data.userId;
    eventId = data.eventId;
    db.query('INSERT INTO user_event SET event_id = "' + eventId + '", user_id = "' + userId + '"', function(rows) {
        res.json({
            result : rows !== null
        });
    });
}

// /api/event/signout
exports.signOut = function(req, res) {
    data = req.body;
    userId = data.userId;
    eventId = data.eventId;
    db.query('DELETE FROM user_event WHERE event_id = "' + eventId + '" AND user_id = "' + userId + '"', function(rows) {
        res.json({
            result : rows !== null
        });
    });
}

// /api/event/create
exports.create = function(req, res) {
    data = req.body;

    // build query
    statement = 'INSERT INTO event SET ';
    for (let x in data) {
        statement  +=  x + "='" + data[x] + "', ";
    }
    statement = statement.substring(0, statement.length - 2);

    // execute query
    db.query(statement , function(rows) {
        res.json({
            success : rows !== null,
        });
    });
}

// /api/event/modify
exports.modify = function(req, res) {
    data = req.body;
    id = data.id;
    delete(data.id);

    // build query
    statement = 'UPDATE event SET ';
    for (let x in data) {
        statement  +=  x + "='" + data[x] + "', ";
    }
    statement = statement.substring(0, statement.length - 2);
    statement += " WHERE id=" + id;

    // execute query
    db.query(statement , function(rows) {
        res.json({
            success : rows !== null,
        });
    });
}

// /api/event/delete
exports.delete = function(req, res) {
    id = req.body.id;
    db.query('DELETE FROM event WHERE id = "' + id + '"', function(rows) {
        res.json({
            result : rows !== null
        });
    });
}
