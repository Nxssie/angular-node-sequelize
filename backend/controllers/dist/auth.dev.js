"use strict";

var jwt = require('jsonwebtoken');

var utils = require('../utils');

var bcrypt = require('bcryptjs');

var db = require("../models");

var User = db.user;

exports.signin = function (req, res) {
  var user = req.body.username;
  var pwd = req.body.password; // return 400 status if username/password is not exist

  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  } // return 401 status if the credential is not match.


  User.findOne({
    where: {
      username: user
    }
  }).then(function (data) {
    var result = bcrypt.compareSync(pwd, data.password);
    if (!result) return res.status(401).send('Password not valid!'); // generate token

    var token = utils.generateToken(data); // get basic user details

    var userObj = utils.getCleanUser(data); // return the token along with user details

    return res.json({
      user: userObj,
      access_token: token
    });
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving this user."
    });
  });
};

exports.isAuthenticated = function (req, res, next) {
  // check header or url parameters or post parameters for token
  // var token = req.body.token || req.query.token;
  var token = req.body.token;

  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  } // check token that was passed by decoding token using secret
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#


  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });
    User.findByPk(user.id).then(function (data) {
      // return 401 status if the userId does not match.
      if (!user.id) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      } // get basic user details


      next();
    })["catch"](function (err) {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
  });
};