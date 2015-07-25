var express  = require('express')
var mongodb  = require('mongodb')
var ObjectId = require('mongodb').ObjectID

var router   = express.Router()
var dbUrl    = process.env.MONGOLAB_URI

router.post('/api/v1/delete', function(req, res) {
	
	mongodb.MongoClient.connect(dbUrl, function(err, db) {
		var searches = db.collection('searches')
		searches.remove( { _id: ObjectId(req.body._id) }, function(err, result) {
			if(err) throw err
			return res.json()
		})
	})
})

module.exports = router