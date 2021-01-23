"use strict";

module.exports = function (app) {
  var express = require("express");

  var _require = require("request"),
      post = _require.post;

  var router = express.Router();

  var request = require("request");

  router.get("/:user/:counter", function (req, res, next) {
    var data = {
      template: {
        shortid: "JujewK4ESi"
      },
      data: {
        "User": [{
          "username": req.params.user,
          "counter": req.params.counter
        }]
      }
    };
    var options = {
      uri: "http://localhost:5488/api/report",
      method: "POST",
      json: data
    };
    request(options).pipe(res);
  });
  app.use('/api/reports', router);
};