var express  = require('express')
var mongodb  = require('mongodb')
var bcrypt   = require('bcrypt-nodejs')

var router   = express.Router()
var dbUrl    = process.env.MONGOLAB_URI

router.post('/api/v1/registerUser', function(req, res) {
	mongodb.MongoClient.connect(dbUrl, function(err, db) {

		var users    = db.collection('users')
		var newUser  = [{email: req.body.email, pwd: req.body.pwd}]

		users.findOne({ email : { $eq: newUser[0].email } }, function(err, doc) {
			if (err) throw err

			if (doc) {
				res.status(401).end()
				db.close()
			}
			else {
				newUser[0].pwd  = bcrypt.hashSync(newUser[0].pwd)
				users.insert(newUser, function(err, result) {
					if (err) throw err
					req.session.loggedIn = 'true'
					req.session.email    = newUser[0].email
					res.status(201).end()
					db.close()
				})
			}
		})
	})
})

module.exports = router