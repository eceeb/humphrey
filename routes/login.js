var express  = require('express')
var mongodb  = require('mongodb')
var bcrypt   = require('bcrypt-nodejs')

var router   = express.Router()
var dbUrl    = process.env.MONGOLAB_URI

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

router.post('/api/v1/isUserLoggedIn', function(req, res) {
    if (req.session.loggedIn)
        res.status(200).end()
    else
        res.status(401).end()
})

router.post('/api/v1/loggOut', function(req, res) {
	req.session.destroy()
	res.status(200).end()
})

module.exports = router