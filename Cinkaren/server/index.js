
//
//  SETUP
//

// load modules
const path = require('path');
const express = require("express");
var bodyParser = require('body-parser');
const dbGym = require("./db-gym");
const dbUser = require("./db-user");
const dbEvent = require("./db-event");
const dbCalendar = require("./db-calendar");
const dbCategory = require("./db-category");
const dbAchievement = require("./db-achievement");
var morgan = require('morgan');

// specify port (default 3001)
const PORT = process.env.PORT || 3001;

// we use NodeJs Express
const app = express();

app.use(morgan('combined'))

// have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(express.urlencoded({ extended: true }))

app.use(express.json());

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


// 
//  REQUEST API - ROUTING TO MODULES
//

// user
app.post("/api/user/profile", urlencodedParser, dbUser.profile);
app.post("/api/user/verify", urlencodedParser, dbUser.verify);
app.post("/api/user/insert", urlencodedParser, dbUser.insert);
app.post("/api/user/update", urlencodedParser, dbUser.update);

// calendar
app.post("/api/calendar", urlencodedParser, dbCalendar.select);

// event
app.post("/api/event/signin", urlencodedParser, dbEvent.signIn);
app.post("/api/event/signout", urlencodedParser, dbEvent.signOut);
app.post("/api/event/create", urlencodedParser, dbEvent.create);
app.post("/api/event/modify", urlencodedParser, dbEvent.modify);
app.post("/api/event/delete", urlencodedParser, dbEvent.delete);

// category
app.post("/api/category/create", urlencodedParser, dbCategory.create);
app.post("/api/category/modify", urlencodedParser, dbCategory.modify);
app.post("/api/category/delete", urlencodedParser, dbCategory.delete);
app.post("/api/category/add", urlencodedParser, dbCategory.add);
app.post("/api/category/remove", urlencodedParser, dbCategory.remove);
app.post("/api/category/list", urlencodedParser, dbCategory.list);

// achievement
app.post("/api/achievement/create", urlencodedParser, dbAchievement.create);
app.post("/api/achievement/modify", urlencodedParser, dbAchievement.modify);
app.post("/api/achievement/delete", urlencodedParser, dbAchievement.delete);
app.post("/api/achievement/list", urlencodedParser, dbAchievement.list);

// gym
app.post("/api/gym/search", urlencodedParser, dbGym.search);

// all other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });


// start the server 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});