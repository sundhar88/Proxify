var express = require('express');
var bodyparser = require("body-parser");
var Proxify = require("./server/app.js");

var app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

Proxify(app);

var server = app.listen(app.get('port'), () => {
  console.log("Proxify Server is Up and Running on ", server.address().port);
});