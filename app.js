var path         = require('path')
var logger       = require('morgan')
var express      = require('express')
var bodyParser   = require('body-parser')
var favicon      = require('serve-favicon')
var cookieParser = require('cookie-parser')
var session      = require('express-session')

var app    = express()
var routes = require('./routes/index')
var login  = require('./routes/login')
var remove = require('./routes/remove')


app.set('view engine', 'jade')

app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
    secret: '1234567890QWERTY', // TODO: use env var
    resave: false,
    saveUninitialized: true
}))

app.use(routes)
app.use(login)
app.use(remove)
app.use(express.static(path.join(__dirname, 'public')))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err    = new Error('Not Found')
    err.status = 404
    next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    })
})

module.exports = app