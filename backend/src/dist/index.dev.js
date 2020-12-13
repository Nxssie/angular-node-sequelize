"use strict";

require('dotenv').config();

var express = require('express');

var cors = require('cors');

var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 4000; //enable cors

app.use(cors()); // parse application/json

app.use(bodyParser.json()); // parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: true
})); // database conection

var db = require("../models");

var _require = require('../models'),
    sequelize = _require.sequelize; //const { SET_DEFERRED } = require('sequelize/types/lib/deferrable');
// For explotation. Database is not dropped.


db.sequelize.sync(); //Development only. Drops and re-sync db everytime the server starts.
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require("../routes/task.routes")(app);

app.listen(port, function () {
  console.log('Server started on: ' + port);
});