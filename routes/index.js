var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL;


router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/navbar', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', 'navbar.html'));
});

router.post('/api/v1/todos', function(req, res) {

	// Grab data from http request
	var data = {url: req.body.url, seek: req.body.seek, email: req.body.email, interval: req.body.interval};
	
	// Get Postgres client from connection pool
	pg.connect(connectionString, function(error, client, done) {
		
		if (error){
			res.statusCode = 505;
			return res.json();
		}
		
		var insert = 'insert into wanted (url, seek, email, interval) values ($1, $2, $3, $4);'
		var query  = client.query(insert, [data.url, data.seek, data.email, data.interval]);
		
		query.on('end', function() {
			console.log("Inserted new search");
			client.end();
			return res.json();
		});
	});
});

module.exports = router;
