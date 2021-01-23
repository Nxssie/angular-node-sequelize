"use strict";

var http = require('http');

var jsreport = require('jsreport');

http.createServer(function (req, res) {
  jsreport.render({
    template: {
      content: '<h1>Hello world</h1>',
      engine: 'handlebars',
      recipe: 'chrone-pdf'
    }
  }).then(function (out) {
    out.stream.pipe(res);
  })["catch"](function (e) {
    res.end(e.message);
  });
}).listen(1337, '127.0.0.1');