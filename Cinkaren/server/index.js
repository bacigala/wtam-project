
//
//  SETUP
//

// load modules
const path = require('path');
const express = require("express");
const db = require("./db-connector");
const dbUser = require("./db-user");

// specify port (default 3001)
const PORT = process.env.PORT || 3001;

// we use NodeJs Express
const app = express();

// have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


// 
//  REQUEST API - ROUTING TO MODULES
//

// user
app.post("/api/user/verify", dbUser.verify);
app.post("/api/user/create", dbUser.create);
app.post("/api/user/modify", dbUser.modify);
app.post("/api/user/delete", dbUser.delete);

// all other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });


// start the server 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});