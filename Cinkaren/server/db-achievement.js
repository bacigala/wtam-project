
//
//  DB HANDLER FOR TABLE ACHIEVEMENT
//

const db = require("./db-connector");

// /api/achievement/create
exports.create = function(req, res) {    
    // get data from the request
    data = req.body;

    // build query
    statement = 'INSERT INTO achievement SET ';
    for (let x in data) {
        statement  +=  x + "='" + data[x] + "', ";
    }
    statement = statement.substring(0, statement.length - 2);

    // execute query
    db.query(statement, function(rows) {
        // return result        
        res.json({
            success : rows !== null
        });
    });
}

// /api/achievement/modify
exports.modify = function(req, res) {    
    // get data from the request
    data = req.body;
    id = data.id;
    delete(data.id);

    // build query
    statement = 'UPDATE achievement SET ';
    for (let x in data) {
        statement  +=  x + "='" + data[x] + "', ";
    }
    statement = statement.substring(0, statement.length - 2);
    statement += ' WHERE id = ' + id;

    // execute query
    db.query(statement, function(rows) {
        // return result        
        res.json({
            success : rows !== null
        });
    });
}

// /api/achievement/delete
exports.delete = function(req, res) {
    // get data from the request
    id = req.body.id;

    // execute query
    db.query('DELETE FROM achievement WHERE id = ' + id, function(rows) {
        // return result        
        res.json({
            success : rows !== null
        });
    });
}

// /api/achievement/list
exports.list = function(req, res) {
    // get data from the request
    userId = req.body.user_id;

    // build query
    statement = "SELECT \
            JSON_ARRAYAGG(JSON_OBJECT('id',a.id,'trainer_id',a.trainer_id,'sportsman_id',a.sportsman_id,'name',a.name,'value',a.value)) as 'achievements'\
        FROM \
            achievement AS a \
        WHERE \
            a.sportsman_id = '" + userId + "' \
        GROUP BY \
            a.sportsman_id\
        ";

    // execute query
    db.query(statement, function(rows) {
        if (rows !== null) {
            // query success
            rows[0].achievements = JSON.parse(rows[0].achievements);
            res.json(rows[0]);
        } else {
            // query fail
            res.json({achievements : []});
        }       
    });
}
