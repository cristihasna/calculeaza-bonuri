const express = require('express');
const path = require('path');
var initRouter = require('./routes/init');

var app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../build')));

app.get('/.', (req, res) => {
  res.sendFile(path.join(__dirname+'../build/index.html'));
});

app.use('/api/init', initRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send();
});

module.exports = app;
