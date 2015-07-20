var path     = require('path')
var express  = require('express')
var mongodb  = require('mongodb')
var bcrypt   = require('bcrypt-nodejs')
var ObjectId = require('mongodb').ObjectID

var router   = express.Router()
var dbUrl    = process.env.MONGOLAB_URI


router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views', 'index.html'))
})

router.get('/navbar', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'navbar.html'))
})

router.get('/searchForm', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'searchForm.html'))
})

router.get('/loginForm', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'loginForm.html'))
})

router.get('/historyForm', function(req, res) {
    if (req.session.loggedIn)
        res.sendFile(path.join(__dirname, '../views', 'historyForm.html'))
    else {
        var err = new Error();
        res.status(505)
    }
})


// TODO: check DB close on all mongo methods
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


router.post('/api/v1/updateSearch', function(req, res) {

	mongodb.MongoClient.connect(dbUrl, function(err, db) {
		
		var searches = db.collection('searches')
		searches.update(
			{ _id: ObjectId(req.body._id) },
			{ url: req.body.url,
			  seek: req.body.seek,
			  email: req.body.email, //TODO: email can not be updated! // maybe easiest solution would be an upsert
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


router.post('/api/v1/tryLogin', function(req, res) {

	mongodb.MongoClient.connect(dbUrl, function(err, db) {
		var users = db.collection('users')
		var data  = [{email: req.body.email, pwd: req.body.pwd}]
			
		users.findOne({ email : { $eq: data[0].email } }, function(err, doc) {
			
			if (err) throw err
			
			if (doc) {
				if (bcrypt.compareSync(data[0].pwd, doc.pwd)) {
					req.session.loggedIn = 'true'
					req.session.email    = data[0].email
					return res.json() // TODO: needed?
				}
				else console.log('password fail') // TODO: show user
			}
			else {
				data[0].pwd  = bcrypt.hashSync(data[0].pwd)
				users.insert(data, function(err, result) {
		
					if (err) throw err
					
					db.close()
				})
			}
		})
	})
})

module.exports = router