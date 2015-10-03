var path     = require('path')
var express  = require('express')

var router   = express()


router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views', 'index.html'))
})

router.get('/navbar', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'navbar.html'))
})

router.get('/searchForm', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'searchForm.html'))
})

router.get('/historyForm', function(req, res) {
    if (req.session.loggedIn)
        res.sendFile(path.join(__dirname, '../views', 'historyForm.html'))
    else 
        res.status(401).end()
})

router.get('/loginForm', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'loginForm.html'))
})

router.get('/registrationForm', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'registrationForm.html'))
})

router.get('/loginAdvice', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'loginAdvice.html'))
})

module.exports = router