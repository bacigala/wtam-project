
//
//  DB HANDLER FOR CALENDAR
//  selects trainings by specific criteria
//

const db = require("./db-connector");

// /api/calendar
exports.select = function(req, res) {
    reqData = req.body;

    console.log(`POST request calendar: ${JSON.stringify(req.body)}`);

    // build query
    statement = "WITH category_list AS (\
        SELECT \
            event.id as id \
            , JSON_ARRAYAGG(JSON_OBJECT('id',category.id,'name',category.name,'color',category.color)) as 'categories' \
        FROM \
            event \
            LEFT OUTER JOIN event_category ON (event.id = event_category.event_id) \
            LEFT OUTER JOIN category ON (event_category.category_id = category.id) \
        GROUP BY \
            event.id \
        )"

    statement += ", user_list AS (\
        SELECT \
            event.id as id \
            , JSON_ARRAYAGG(JSON_OBJECT('id',user.id,'name',user.name,'surname',user.surname)) as 'users' \
        FROM \
            event \
            LEFT OUTER JOIN user_event ON (user_event.event_id = event.id) \
            LEFT OUTER JOIN user ON (user_event.user_id = user.id) \
        GROUP BY \
            event.id \
        )"           

    statement += " SELECT DISTINCT \
                  event.id AS 'id'\
                , event.name AS 'name'\
                , event.location AS 'location'\
                , event.from_datetime AS 'startDate'\
                , event.to_datetime AS 'endDate'\
                , event.max_participants AS 'max_participants'\
                , event.plan AS 'plan'\
                , category_list.categories \
                , user_list.users \
                , trainer.id AS 'trainer_id'\
                , trainer.name AS 'trainer_name'\
                , trainer.surname AS 'trainer_surname'\
                , gym.id AS 'gym_id'\
                , gym.name AS 'gym_name' \
            FROM \
                event \
                    LEFT OUTER JOIN user_event ON (user_event.event_id = event.id) \
                    LEFT OUTER JOIN user ON (user_event.user_id = user.id) \
                    LEFT OUTER JOIN user_list ON (user_list.id = event.id) \
                    LEFT OUTER JOIN category_list ON (category_list.id = event.id) \
                    LEFT OUTER JOIN event_category ON (event.id = event_category.event_id) \
                    LEFT OUTER JOIN category ON (event_category.category_id = category.id) \
                    JOIN user AS trainer ON (event.trainer_id = trainer.id) \
                    JOIN gym ON (event.gym_id = gym.id) \
            WHERE \
                event.from_datetime >= '" + reqData.from + "' \
                AND event.to_datetime <= '" + reqData.to + "' \
            ";

    // optional arguments for event search
    if ("username" in reqData)
        statement += " AND user.username = '" + reqData.username + "'";
    if ("trainer_id" in reqData)
        statement += " AND trainer.id = '" + reqData.trainer_id + "'";
    if ("gym_id" in reqData)
        statement += " AND gym.id = '" + reqData.gym_id + "'";
    if ("category_id" in reqData)
        statement += " AND category.id = '" + reqData.category_id + "'";

    // execute query
    db.query(statement, function(rows) {
        if (rows === null) {
            res.json({
                events : []
            });
            return;
        }

        // parse inner JSON arrays and objects
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            row.plan = JSON.parse(row.plan);

            // USERS
            // fix: JSON_ARRAYAGG
            if (row.users.toString().charAt(0) !== '[') row.users = '[' + row.users + ']';
            row.users = JSON.parse(row.users);            
            // fix: no users on training -> users : [{id : null, name : null...}] (JSON)
            // now no users on training results in users : [] (JSON)
            if (row.users[0].id === null)
                row.users = [];

            // CATEGORIES
            // fix: JSON_ARRAYAGG
            row.categories = '[' + row.categories + ']';
            row.categories = JSON.parse(row.categories);
            // fix: no users on training -> users : [{id : null, name : null...}] (JSON)
            // now no users on training results in users : [] (JSON)
            if (row.categories === null || row.categories[0].id === null)
                row.categories = [];
        }

        // send result to frontend
        res.json({
            events : rows === null ? [] : rows
        });
    });
}
