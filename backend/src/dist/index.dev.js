"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

require('dotenv').config();

var jwt = require('jsonwebtoken');

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
//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.

app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  if (req.headers.authorization.indexOf('Basic ') === 0) {
    // verify auth basic credentials
    var base64Credentials = req.headers.authorization.split(' ')[1];
    var credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');

    var _credentials$split = credentials.split(':'),
        _credentials$split2 = _slicedToArray(_credentials$split, 2),
        username = _credentials$split2[0],
        password = _credentials$split2[1];

    req.body.username = username;
    req.body.password = password;
    return next();
  }

  token = token.replace('Bearer ', ''); // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it

      req.token = token;
      next();
    }
  });
});

require("../routes/user.routes")(app);

require("../routes/task.routes")(app);

require("../routes/reports.routes")(app);

app.listen(port, function () {
  console.log('Server started on: ' + port);
});