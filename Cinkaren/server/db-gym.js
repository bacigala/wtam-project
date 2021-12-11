
//
//  DB HANDLER FOR GYM
//

const db = require("./db-connector");

// /api/gym/search
exports.search = function(req, res) {
    reqData = req.body;

    console.log(`POST request calendar: ${JSON.stringify(req.body)}`);

    // build query
    statement = "\
        SELECT \
            JSON_ARRAYAGG(JSON_OBJECT('id',g.id,'name',g.name,'address',g.address,'email',g.email,'phone',g.phone)) as 'gyms' \
        FROM \
            gym AS g \
        WHERE \
            TRUE\
        ";       

    // optional arguments for gym search
    if ("id" in reqData)
        statement += " AND g.id = '" + reqData.id + "'";
    if ("name" in reqData)
        statement += " AND g.name LIKE '%" + reqData.name + "%'";
    if ("address" in reqData) {
        statement += " AND (g.street_name LIKE '%" + reqData.address + "%'"
        statement += " OR g.street_number LIKE '%" + reqData.address + "%'"
        statement += " OR g.city LIKE '%" + reqData.address + "%'"
        statement += " OR g.zip LIKE '%" + reqData.address + "%'"
        statement += ")"
    }
    if ("email" in reqData)
        statement += " AND g.email LIKE '%" + reqData.email + "%'";
    if ("phone" in reqData)
        statement += " AND g.phone LIKE '%" + reqData.phone + "%'";

    // execute query
    db.query(statement, function(rows) {
        if (rows !== null) {
            // query success
            rows[0].gyms = JSON.parse(rows[0].gyms);
            if (rows[0].gyms === null)
                res.json({gyms : []});
            else
                res.json(rows[0]);
        } else {
            // query fail
            res.json({gyms : []});
        }       
    });
}
