
//
//  DB HANDLER FOR GYM
//

const db = require("./db-connector");

// /api/gym/search
exports.search = function(req, res) {
    reqData = req.body;

    console.log(`POST request calendar: ${JSON.stringify(req.body)}`);

    // build query

    statement = "WITH o_h AS (\
        SELECT \
            gym_id \
            , JSON_ARRAYAGG(JSON_OBJECT('day',day,'from_time',from_time,'to_time',to_time)) as 'hours' \
        FROM \
            opening_hours \
        WHERE \
            valid_from_date <= NOW() AND valid_to_date >= NOW() \
        GROUP BY \
            gym_id \
        )"

    statement += "\
        SELECT \
            JSON_ARRAYAGG(JSON_OBJECT('id',g.id,'name',g.name,'address',g.address,'email',g.email,'phone',g.phone,\
                            'street_name',g.street_name,'street_number',g.street_number,'city',g.city,'zip',g.zip,\
                            'opening_hours',o_h.hours)) as 'gyms' \
        FROM \
            gym AS g \
            LEFT OUTER JOIN o_h ON (g.id = o_h.gym_id) \
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
            else {
                for (var i = 0; i < rows[0].gyms.length; i++) {
                    var row = rows[0].gyms[i];
                    if (row.opening_hours !== null) row.opening_hours = JSON.parse(row.opening_hours);
                }
                res.json(rows[0]);
            }                
        } else {
            // query fail
            res.json({gyms : []});
        }       
    });
}
