const path = require('path');
const express = require("express");

//Mozmeme mu dat aj nejaky port ak nie je tak default je 3001
const PORT = process.env.PORT || 3001;

//Vyuzivame NodeJs Express
const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//req - co dostanes od requestu
//res - co posles spat (posielame json so so stringom message)
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

//Musi byt posledne
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});