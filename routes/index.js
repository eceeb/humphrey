var path    = require('path')
var express = require('express')
var mongodb = require('mongodb')

var router  = express.Router()
var dbUrl   = process.env.MONGOLAB_URI

router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../views', 'index.html'))
})

router.get('/navbar', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', 'navbar.html'))
})

router.post('/api/v1/todos', function(req, res) {

	mongodb.MongoClient.connect(dbUrl, function(err, db) {

		// Grab data from http request
		var data = [{url: req.body.url, seek: req.body.seek, email: req.body.email, interval: req.body.interval}];
		var searches = db.collection('searches')
		
		searches.insert(data, function(err, result) {
			if(err) throw err
		})
		 
		 return res.json()
	})
})

module.exports = router
