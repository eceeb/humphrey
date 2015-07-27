var express  = require('express')
var mongodb  = require('mongodb')
var ObjectId = require('mongodb').ObjectID

var router   = express.Router()
var dbUrl    = process.env.MONGOLAB_URI

// TODO: check DB close on all mongo methods
router.get('/api/v1/getSearches', function(req, res) {

	mongodb.MongoClient.connect(dbUrl, function(err, db) {
	
		var searches = db.collection('searches')

		searches.find({ email : { $eq: req.session.email }}).toArray(
			function(error, result) {
				db.close()
				return res.send(result)
			}) 
	})
})

router.post('/api/v1/addSearch', function(req, res) {

	mongodb.MongoClient.connect(dbUrl, function(err, db) {
	
		var data = [{url: req.body.url, seek: req.body.seek, email: req.body.email, interval: req.body.interval}];
		var searches = db.collection('searches')
		
		searches.insert(data, function(err, result) {
			if(err) throw err
			return res.json()
		})
	})
})

router.post('/api/v1/removeSearch', function(req, res) {
	
	mongodb.MongoClient.connect(dbUrl, function(err, db) {
		var searches = db.collection('searches')
		searches.remove( { _id: ObjectId(req.body._id) }, function(err, result) {
			if(err) throw err
			return res.json()
		})
	})
})

router.post('/api/v1/updateSearch', function(req, res) {

	mongodb.MongoClient.connect(dbUrl, function(err, db) {
		
		var searches = db.collection('searches')
		searches.update(
			{ _id: ObjectId(req.body._id) },
			{ url: req.body.url,
			  seek: req.body.seek,
			  email: req.session.email, //TODO: email MUST not be updated! // consider upsert
			  interval:  req.body.interval,
			  found: req.body.found
		    },
			function(err, result) {
				console.log(err)
				db.close()
				if(err) throw err
					return res.json()
		})
	})
})

module.exports = router