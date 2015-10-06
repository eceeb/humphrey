var express  = require('express')
var mongodb  = require('mongodb')
var ObjectId = require('mongodb').ObjectID

var router   = express.Router()
var dbUrl    = process.env.MONGOLAB_URI

router.post('/api/v1/addSearch', function(req, res) {

	mongodb.MongoClient.connect(dbUrl, function(error, db) {
	
		var searches  = db.collection('searches')
		var newSearch = [ {url: req.body.url, seek: req.body.seek, email: req.body.email, interval: req.body.interval} ];
		
		searches.insert(newSearch, function(error) {
			error ? res.status(500).end() : res.status(201).end()
			db.close()
		})
	})
})

router.get('/api/v1/getSearches', function(req, res) {

	mongodb.MongoClient.connect(dbUrl, function(error, db) {

		var searches = db.collection('searches')

		searches.find({ email : { $eq: req.session.email }}).toArray(
			function(error, result) {
				error ? res.status(500).end() : res.send(result)
				db.close()
			}) 
	})
})

router.put('/api/v1/updateSearch', function(req, res) {

	mongodb.MongoClient.connect(dbUrl, function(error, db) {
		
		var searches = db.collection('searches')
		
		searches.update(
			{ _id: ObjectId(req.body._id) },
			{ url: req.body.url,
			  seek: req.body.seek,
			  email: req.session.email, // TODO: consider upsert
			  interval:  req.body.interval,
			  found: req.body.found
		    },
			function(error, result) {
				error ? res.status(500).end() : res.status(204).end()
				db.close()
		})
	})
})

router.delete('/api/v1/removeSearch/:search_id', function(req, res) {

	mongodb.MongoClient.connect(dbUrl, function(error, db) {

		var searches = db.collection('searches')
		searches.remove( { _id: ObjectId(req.params.search_id) }, function(error, result) {
			error ? res.status(500).end() : res.status(204).end()
			db.close()
		})
	})
})

module.exports = router