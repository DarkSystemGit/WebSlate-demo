import WebSlate, { assets } from './__webassets';
import createError from 'http-errors';
import express, { json, urlencoded, static } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fs } from 'fs';
import { system } from './system';

var app = express();



// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(static(join(__dirname, '/../../')));

app.use(function(req, res, next) {
  res.send(fs.readFileSync(join(__dirname,'/../../pages/render.html'),'utf-8'))
});
app.get('/', function (req, res) {
  res.send(assets.__render(system.__read()))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send(fs.readFileSync(join(__dirname,'/../../pages/render.html'),'utf-8'))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

export default app;