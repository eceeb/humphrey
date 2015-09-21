var path         = require('path')
var logger       = require('morgan')
var express      = require('express')
var bodyParser   = require('body-parser')
var favicon      = require('serve-favicon')
var session      = require('express-session')
var RedisStore   = require('connect-redis')(session)
var client       = require('redis').createClient(process.env.REDIS_URL)

var app    = express()
var routes = require('./routes/index')
var login  = require('./routes/login')
var remove = require('./routes/search')


app.set('view engine', 'jade')

app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    store: new RedisStore({
        client: client
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.REDIS_SECRET,
    cookie: {}
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