var express  = require('express')
var mongodb  = require('mongodb')
var bcrypt   = require('bcrypt-nodejs')

var router   = express.Router()
var dbUrl    = process.env.MONGOLAB_URI

router.post('/api/v1/login', function(req, res) {
	mongodb.MongoClient.connect(dbUrl, function(err, db) {

		var users = db.collection('users')
		var data  = [{email: req.body.email, pwd: req.body.pwd}]

		users.findOne({ email : { $eq: data[0].email } }, function(err, doc) {
			if (err) throw err

			if (doc) {
				if (bcrypt.compareSync(data[0].pwd, doc.pwd)) {
					req.session.loggedIn = 'true'
					req.session.email    = data[0].email
					res.status(200).end()
				}
				else {
					console.log('password fail')
					res.status(401).end() // TODO: show user
				}
			}
			db.close()
		})
	})
})

router.get('/api/v1/isUserLoggedIn', function(req, res) {
    req.session.loggedIn ? res.status(200).end() : res.status(401).end()
})

router.post('/api/v1/loggOut', function(req, res) {
	req.session.destroy()
	res.status(200).end()
})

module.exports = router
