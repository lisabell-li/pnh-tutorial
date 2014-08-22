// Modules
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Databases
var mongo = require('mongoskin');
//path of database
//var db = mongo.db("mongodb://localhost:27017/pnh", {native_parser:true});
var mongoUri = process.env.MONGOHQ_URL;
var db = mongo.db(mongoUri);

//routes
var routes = require('./routes/index');
var users = require('./routes/users');
var tutorial = require('./routes/tutorial');

// express variable
var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Middleware
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Make mongo db accessible to router
app.use(function(req, res, next){
 req.db = db;
 next();
});

//Routing
app.use('/', routes);
app.use('/users', users);
app.use('/tutorial', tutorial);

/// catch and send 404error to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
