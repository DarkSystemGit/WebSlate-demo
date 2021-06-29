var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var system = require('./system');

var app = express();



// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../../')));

app.get(function(req, res) {
  res.send(fs.readFileSync(join(__dirname,'/../Client/render.html'),'utf-8'))
});
app.get('/', function (req, res) {
  res.send(assets.__render(system.__read()))
})
//The Page route
//This route displays data retutned by assets.render()
app.get('/Page', function(req, res){
  res.send(assets.__render(req.query.page))
});
// error handler
//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.status(404).send(fs.readFileSync(path.join(__dirname,'/../Client/render.html'),'utf-8'));
});

module.exports = app;
