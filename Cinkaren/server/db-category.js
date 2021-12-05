
//
//  DB HANDLER FOR EVENT CATEGORIES
//  tables category and event_category
//

const db = require("./db-connector");

// CREATE A NEW CATEGORY /api/category/create
exports.create = function(req, res) {
    // get data from the request
    let data = req.body;

    // build query
    statement = 'INSERT INTO category SET ';
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

// MODIFY EXISTING CATEGORY /api/category/modify
exports.modify = function(req, res) {
    // get data from the request
    let data = req.body;
    let id = data.id;
    delete(data.id);

    // build query
    statement = 'UPDATE  category SET ';
    for (let x in data) {
        statement  +=  x + "='" + data[x] + "', ";
    }
    statement = statement.substring(0, statement.length - 2);
    statement += " WHERE id = '" + id + "'";

    // execute query
    db.query(statement, function(rows) {
        // return result        
        res.json({
            success : rows !== null
        });
    });
}

// DELETE EXISTING CATEGORY /api/category/delete
exports.delete = function(req, res) {
    // get data from the request
    let id = req.body.id;

    // execute query
    db.query("DELETE FROM category WHERE id='" + id + "'", function(rows) {
        // return result        
        res.json({
            success : rows !== null
        });
    });
}

// ADD AN EVENT TO A CATEGORY /api/category/add
exports.add = function(req, res) {
    // get data from the request
    let data = req.body;

    // execute query
    db.query("INSERT INTO event_category SET event_id='" + data.event_id + "', category_id='" + data.category_id + "'", function(rows) {
        // return result        
        res.json({
            success : rows !== null
        });
    });
}

// REMOVE AN EVENT FROM A CATEGORY /api/category/remove
exports.remove = function(req, res) {
    // get data from the request
    let data = req.body;

    // execute query
    db.query("DELETE FROM event_category WHERE event_id='" + data.event_id + "' AND category_id='" + data.category_id + "'", function(rows) {
        // return result        
        res.json({
            success : rows !== null
        });
    });
}

// CATEGORY LIST /api/category/list
exports.list = function(req,res) {
    // build query
    statement = "SELECT \
            JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'name',c.name,'color',c.color)) as 'categories'\
        FROM \
            category AS c \
        ";

    // execute query
    db.query(statement, function(rows) {
        if (rows !== null) {
            // query success
            rows[0].categories = JSON.parse(rows[0].categories);
            res.json(rows[0]);
        } else {
            // query fail
            res.json({categories : []});
        }       
    });
}